import werkzeug
import flask
from flask import g, request

from marshmallow import ValidationError, Schema, fields, validate
from flask_restful import Resource, abort
from transitions import MachineError

from backoffice import utils
from backoffice.auth import token_auth
from backoffice.models import db, Pedido, PedidoProduto, pedidos
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


class PatchPedidoSchema(Schema):
    transicao = fields.String(
        validate=validate.OneOf([transicao.value for transicao in pedidos.TRANSICOES])
    )


_patch_pedido_schema = PatchPedidoSchema()


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

    def patch(self, pedido_eid):
        usuario = g.usuario
        if not usuario.has_permission("backoffice"):
            abort(403, message="Não permitido")

        pedido = Pedido.query.filter_by(eid=pedido_eid).first()

        if not pedido:
            abort(404)

        try:
            parsed = _patch_pedido_schema.load(request.json)
        except ValidationError as validation_errors:
            abort(400, message=validation_errors.messages)

        try:
            pedido.trigger(parsed["transicao"])
        except MachineError as machine_error:
            abort(400, message=str(machine_error))

        db.session.add(pedido)
        db.session.commit()

        return {"pedido": pedido_schema.dump(pedido)}


class ArquivoProdutoAPI(Resource):

    decorators = [token_auth.login_required]

    def _corsify_response(self, response):
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

        return response

    def options(self, *args, **kwargs):
        return self._corsify_response(flask.make_response())

    def get(self, pedido_eid, produto_key, nome_arquivo):
        pedido = self._validar_rota(pedido_eid, produto_key, nome_arquivo)

        try:
            return self._corsify_response(
                flask.make_response(
                    flask.send_from_directory(
                        f"{flask.current_app.instance_path}/pedidos/{pedido.eid}/{produto_key}",
                        nome_arquivo,
                        as_attachment=True,
                    )
                )
            )
        except werkzeug.exceptions.NotFound:
            abort(404, message="Arquivo não encontrado")

    def post(self, pedido_eid, produto_key, nome_arquivo):
        pedido = self._validar_rota(pedido_eid, produto_key, nome_arquivo)

        file = request.files["file"]
        result = pedido.produto.save_file(produto_key, nome_arquivo, file)
        if not result:
            abort(409)
        return "Uploaded", 201

    def _validar_rota(self, pedido_eid, produto_key, nome_arquivo):
        usuario = g.usuario
        pedido = Pedido.query.filter_by(eid=pedido_eid).first()

        if not pedido:
            abort(404)

        if not usuario.has_permission("backoffice") and pedido.usuario_id != usuario.id:
            abort(403, message="Pedido de outro usuário")

        if not pedido.produto.validar_dados_arquivo(produto_key, nome_arquivo):
            abort(400)

        return pedido
