import werkzeug
import flask
from flask import g, request, views

import flask_restful
from marshmallow import ValidationError, Schema, fields, validate
from transitions import MachineError

from backoffice import utils, auth
from backoffice.auth import token_auth
from backoffice.models import Usuario, db, Pedido, PedidoProduto
from backoffice.models.pedidos import status
from backoffice.base import pusher_client
from backoffice.api.v0 import schemas
from backoffice.api.v0.schemas import (
    pedidos_schema,
    pedido_schema,
    pedido_pusher_schema,
)


class PedidosAPI(views.MethodView):

    decorators = [token_auth.login_required]

    def get(self):
        usuario = g.usuario
        pedidos_q = Pedido.query

        if not usuario.has_permission("backoffice"):
            pedidos_q = pedidos_q.filter_by(usuario_id=g.usuario.id)

        return {"pedidos": pedidos_schema.dump(pedidos_q.all())}

    def post(self):
        try:
            parsed = pedido_schema.load(request.json)
        except ValidationError as validation_errors:
            flask_restful.abort(400, errors=validation_errors.messages)

        dados_produto = parsed.pop("produto")
        pedido = Pedido(eid=utils.create_eid(), usuario_id=g.usuario.id, **parsed)
        PedidoProduto.from_api(pedido, dados_produto)

        db.session.add(pedido)
        db.session.commit()

        pusher_client.trigger(
            "pedidos", "novo-pedido", {"pedido": pedido_pusher_schema.dump(pedido)}
        )

        return {"pedido": pedido_schema.dump(pedido)}, 201


class PedidoAPI(views.MethodView):
    decorators = [token_auth.login_required]

    def get(self, pedido_eid):
        usuario = g.usuario
        pedido = Pedido.query.filter_by(eid=pedido_eid).first()

        if not pedido:
            flask_restful.abort(404)

        if not usuario.has_permission("backoffice") and pedido.usuario_id != usuario.id:
            flask_restful.abort(403, message="Pedido de outro usuário")

        return {"pedido": pedido_schema.dump(pedido)}

    class PatchPedidoSchema(Schema):
        transicao = fields.String(
            validate=validate.OneOf(
                [transicao.value for transicao in status.TRANSICOES]
            )
        )

    def patch(self, pedido_eid):
        usuario = g.usuario
        if not usuario.has_permission("backoffice"):
            flask_restful.abort(403, message="Não permitido")

        pedido = Pedido.query.filter_by(eid=pedido_eid).first()

        if not pedido:
            flask_restful.abort(404)

        try:
            parsed = self.PatchPedidoSchema().load(request.json)
        except ValidationError as validation_errors:
            flask_restful.abort(400, message=validation_errors.messages)

        try:
            pedido.trigger(parsed["transicao"])
        except (MachineError, AttributeError) as machine_error:
            flask_restful.abort(400, message=str(machine_error))

        db.session.add(pedido)
        db.session.commit()

        # TODO: Trigger pusher aqui com o pedido atualizado...

        return {"pedido": pedido_schema.dump(pedido)}


class PedidoLogAPI(views.MethodView):
    decorators = [token_auth.login_required]

    def post(self, pedido_eid):
        usuario: Usuario = flask.g.usuario
        pedido: Pedido = Pedido.query.filter_by(eid=pedido_eid).first()

        if not pedido:
            flask_restful.abort(404)

        if not usuario.has_permission("backoffice") and pedido.usuario_id != usuario.id:
            flask_restful.abort(403, message="Pedido de outro usuário")

        try:
            parsed = schemas.pedido_log_schema.load(request.json)
        except ValidationError as validation_errors:
            flask_restful.abort(400, message=validation_errors.messages)

        if not usuario.has_permission("backoffice") and parsed["publico"] is False:
            flask_restful.abort(400)

        pedido_log = pedido.log(usuario, parsed["mensagem"], parsed["publico"])

        # TODO: Trigger pusher aqui com o pedido atualizado...

        return {"pedido_log": schemas.pedido_log_schema.dump(pedido_log)}, 201


class ArquivoProdutoAPIMixin(views.MethodView):
    def _corsify_response(self, response):
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

        return response

    def options(self, *args, **kwargs):
        return self._corsify_response(flask.make_response())

    def _validar_rota(self, pedido_eid, produto_key, nome_arquivo) -> Pedido:
        usuario = g.usuario
        pedido: Pedido = Pedido.query.filter_by(eid=pedido_eid).first()

        if not pedido:
            flask_restful.abort(404)

        if not usuario.has_permission("backoffice") and pedido.usuario_id != usuario.id:
            flask_restful.abort(403, message="Pedido de outro usuário")

        pedido_produto: PedidoProduto = pedido.produto
        if pedido.validar_dados_cotacao(
            produto_key
        ) or pedido_produto.validar_dados_arquivo(produto_key, nome_arquivo):
            return pedido

        flask_restful.abort(400)


class UploadArquivoProdutoAPI(ArquivoProdutoAPIMixin):

    decorators = [token_auth.login_required]

    def post(self, pedido_eid, produto_key, nome_arquivo):
        pedido = self._validar_rota(pedido_eid, produto_key, nome_arquivo)

        file = request.files["file"]

        if pedido.validar_dados_cotacao(produto_key):
            url_arquivo = pedido.salvar_cotacao(file)
            if not url_arquivo:
                flask_restful.abort(409)
        else:
            url_arquivo = pedido.produto.save_file(produto_key, nome_arquivo, file)
            if not url_arquivo:
                flask_restful.abort(409)

        # TODO: Trigger pusher aqui com o pedido atualizado...

        return {"pedido": pedido_schema.dump(pedido)}, 201


class DownloadArquivoProdutoAPI(ArquivoProdutoAPIMixin):
    def get(self, pedido_eid, produto_key, nome_arquivo):
        if not auth.verify_token(request.args["token"]):
            flask_restful.abort(401)

        pedido = self._validar_rota(pedido_eid, produto_key, nome_arquivo)

        try:
            return flask.make_response(
                flask.send_from_directory(
                    pedido.get_diretorio_arquivo(produto_key),
                    nome_arquivo,
                    as_attachment=True,
                )
            )
        except werkzeug.exceptions.NotFound:
            flask_restful.abort(404, message="Arquivo não encontrado")
