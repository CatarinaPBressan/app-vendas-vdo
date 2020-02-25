from flask import g, request

from marshmallow import ValidationError
from flask_restful import Resource, abort

from backoffice.auth import token_auth
from backoffice.models import db, Pedido, PedidoProduto
from backoffice.base import pusher_client
from backoffice.api.v0.schemas import (
    pedidos_schema,
    pedido_schema,
    pedido_pusher_schema,
)


class PedidosAPI(Resource):

    decorators = [token_auth.login_required]

    def get(self):
        pedidos_q = Pedido.query
        if not request.args.get("lista_pedidos"):
            pedidos_q = pedidos_q.filter_by(usuario_id=g.usuario.id)
        return {"pedidos": pedidos_schema.dump(pedidos_q.all())}

    def post(self):
        try:
            parsed = pedido_schema.load(request.json)
        except ValidationError as validation_errors:
            abort(400, errors=validation_errors.messages)
        produto = PedidoProduto(**parsed.pop("produto"))
        pedido = Pedido(usuario_id=g.usuario.id, produto=produto, **parsed)
        db.session.add(pedido)
        db.session.commit()

        pusher_client.trigger(
            "pedidos", "novo-pedido", {"pedido": pedido_pusher_schema.dump(pedido)}
        )
        return {"pedido": pedido_schema.dump(pedido)}


class PedidoAPI(Resource):
    decorators = [token_auth.login_required]

    def get(self, pedido_eid):
        usuario = g.usuario
        pedido = Pedido.query.filter_by(eid=pedido_eid).one()
        if not request.args.get("lista_pedidos") and pedido.usuario_id != usuario.id:
            abort(403, message="Pedido de outro usuário")
        return {"pedido": pedido_schema.dump(pedido)}
