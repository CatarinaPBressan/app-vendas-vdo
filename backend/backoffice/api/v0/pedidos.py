from flask import g, request

from marshmallow import ValidationError
from flask_restful import Resource, abort

from backoffice.auth import token_auth
from backoffice.models import db, Pedido, PedidoProduto
from backoffice.api.v0.schemas import pedidos_schema, pedido_schema


class PedidosAPI(Resource):

    decorators = [token_auth.login_required]

    def get(self):
        usuario = g.usuario
        pedidos = Pedido.query.filter_by(usuario_id=usuario.id).all()
        return {"pedidos": pedidos_schema.dump(pedidos)}

    def post(self):
        try:
            parsed = pedido_schema.load(request.json)
        except ValidationError as validation_errors:
            abort(400, errors=validation_errors.messages)
        produto = PedidoProduto(**parsed.pop("produto"))
        pedido = Pedido(usuario_id=g.usuario.id, produto=produto, **parsed)
        db.session.add(pedido)
        db.session.commit()
        return {"pedido": pedido_schema.dump(pedido)}


class PedidoAPI(Resource):
    decorators = [token_auth.login_required]

    def get(self, pedido_eid):
        usuario = g.usuario
        pedido = Pedido.query.filter_by(eid=pedido_eid).one()
        if pedido.usuario_id != usuario.id:
            abort(403, message="Pedido de outro usuário")
        return {"pedido": pedido_schema.dump(pedido)}
