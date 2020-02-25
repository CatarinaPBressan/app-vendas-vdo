from marshmallow import Schema, fields


class UsuarioSchema(Schema):
    eid = fields.String(dump_only=True)
    cpf = fields.String(dump_only=True)
    nome = fields.String(dump_only=True)
    token = fields.String(dump_only=True)


class PedidoProdutoSchema(Schema):
    cep = fields.String()
    uf = fields.String()
    cidade = fields.String()
    logradouro = fields.String()
    endereco_numero = fields.String()
    complemento = fields.String()
    nome_mae = fields.String()
    estado_civil = fields.String()
    ocupacao = fields.String()
    data_vencimento = fields.String()


class PedidoSchema(Schema):
    eid = fields.String(dump_only=True)
    produto_slug = fields.String(required=True)
    status = fields.String(dump_only=True)
    nome_completo = fields.String(required=True)
    cpf = fields.String(required=True)
    email = fields.String(required=True)
    telefone_celular = fields.String(required=True)
    observacoes = fields.String(required=True)
    produto = fields.Nested(PedidoProdutoSchema, required=True)
    created_at = fields.DateTime(format="iso", dump_only=True)
    updated_at = fields.DateTime(format="iso", dump_only=True)
    usuario = fields.Nested(UsuarioSchema, dump_only=True)


pedido_pusher_schema = PedidoSchema(exclude=["produto", "usuario.token"])
pedido_schema = PedidoSchema(exclude=["usuario.token"])
pedidos_schema = PedidoSchema(many=True, exclude=["usuario.token"])
usuario_schema = UsuarioSchema()
