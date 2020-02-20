from flask import g
from flask_restful import Resource, fields, marshal_with, abort

from backoffice.auth import token_auth
from backoffice.models import Pedido

short_pedido_fields = {
    "eid": fields.String,
    "created_at": fields.DateTime("iso8601"),
    "updated_at": fields.DateTime("iso8601"),
    "produto_slug": fields.String,
    "nome_completo": fields.String,
    "cpf": fields.String,
    "email": fields.String,
    "telefone_celular": fields.String,
    "observacoes": fields.String,
}

produto_fields = {
    "cep": fields.String,
    "uf": fields.String,
    "cidade": fields.String,
    "logradouro": fields.String,
    "endereco_numero": fields.String,
    "complemento": fields.String,
    "nome_mae": fields.String,
    "estado_civil": fields.String,
    "ocupacao": fields.String,
    "data_vencimento": fields.String,
}

pedido_with_produto_fields = {
    **short_pedido_fields,
    "produto": fields.Nested(produto_fields),
}


class PedidosAPI(Resource):

    decorators = [token_auth.login_required]

    @marshal_with(short_pedido_fields, envelope="pedidos")
    def get(self):
        usuario = g.usuario
        return Pedido.query.filter_by(usuario_id=usuario.id).all()


class PedidoAPI(Resource):
    decorators = [token_auth.login_required]

    @marshal_with(pedido_with_produto_fields, envelope="pedido")
    def get(self, pedido_eid):
        usuario = g.usuario
        pedido = Pedido.query.filter_by(eid=pedido_eid).one()
        if pedido.usuario_id != usuario.id:
            abort(403, message="Pedido de outro usuário")
        return pedido
