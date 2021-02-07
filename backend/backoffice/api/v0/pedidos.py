import werkzeug
import flask
from flask import g, request, views

from marshmallow import ValidationError, Schema, fields, validate
from flask_restful import Resource, abort
from transitions import MachineError

from backoffice import utils, auth
from backoffice.auth import token_auth
from backoffice.models import db, Pedido, PedidoProduto, pedidos
from backoffice.models.pedidos import status
from backoffice.base import pusher_client
from backoffice.api.v0.schemas import (
    pedidos_schema,
    pedido_schema,
    pedido_pusher_schema,
)


class PedidosAPI(Resource):

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
            abort(400, errors=validation_errors.messages)

        dados_produto = parsed.pop("produto")
        pedido = Pedido(eid=utils.create_eid(), usuario_id=g.usuario.id, **parsed)
        PedidoProduto.from_api(pedido, dados_produto)

        db.session.add(pedido)
        db.session.commit()

        pusher_client.trigger(
            "pedidos", "novo-pedido", {"pedido": pedido_pusher_schema.dump(pedido)}
        )

        return {"pedido": pedido_schema.dump(pedido)}, 201


class PedidoAPI(Resource):
    decorators = [token_auth.login_required]

    def get(self, pedido_eid):
        usuario = g.usuario
        pedido = Pedido.query.filter_by(eid=pedido_eid).first()

        if not pedido:
            abort(404)

        if not usuario.has_permission("backoffice") and pedido.usuario_id != usuario.id:
            abort(403, message="Pedido de outro usuário")

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
            abort(403, message="Não permitido")

        pedido = Pedido.query.filter_by(eid=pedido_eid).first()

        if not pedido:
            abort(404)

        try:
            parsed = self.PatchPedidoSchema().load(request.json)
        except ValidationError as validation_errors:
            abort(400, message=validation_errors.messages)

        try:
            pedido.trigger(parsed["transicao"])
        except MachineError as machine_error:
            abort(400, message=str(machine_error))

        db.session.add(pedido)
        db.session.commit()

        return {"pedido": pedido_schema.dump(pedido)}


class ArquivoProdutoAPIMixin(views.MethodView):
    def _corsify_response(self, response):
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

        return response

    def options(self, *args, **kwargs):
        return self._corsify_response(flask.make_response())

    def _validar_rota(self, pedido_eid, produto_key, nome_arquivo) -> pedidos.Pedido:
        usuario = g.usuario
        pedido = Pedido.query.filter_by(eid=pedido_eid).first()

        if not pedido:
            abort(404)

        if not usuario.has_permission("backoffice") and pedido.usuario_id != usuario.id:
            abort(403, message="Pedido de outro usuário")

        if not pedido.produto.validar_dados_arquivo(produto_key, nome_arquivo):
            abort(400)

        return pedido


class UploadArquivoProdutoAPI(ArquivoProdutoAPIMixin):

    decorators = [token_auth.login_required]

    def post(self, pedido_eid, produto_key, nome_arquivo):
        pedido = self._validar_rota(pedido_eid, produto_key, nome_arquivo)

        file = request.files["file"]
        result = pedido.produto.save_file(produto_key, nome_arquivo, file)
        if not result:
            abort(409)
        return "Uploaded", 201


class DownloadArquivoProdutoAPI(ArquivoProdutoAPIMixin):
    def get(self, pedido_eid, produto_key, nome_arquivo):
        if not auth.verify_token(request.args["token"]):
            abort(401)

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
            abort(404, message="Arquivo não encontrado")
