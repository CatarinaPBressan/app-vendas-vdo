from marshmallow import Schema, fields


class UsuarioSchema(Schema):
    eid = fields.String(dump_only=True)
    cpf = fields.String(dump_only=True)
    nome = fields.String(dump_only=True)
    token = fields.String(dump_only=True)
    username = fields.String(load_only=True)
    password = fields.String(load_only=True)
    permissoes = fields.List(fields.String, dump_only=True)
    pusher_key = fields.String(dump_only=True)
    pusher_cluster = fields.String(dump_only=True)


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


_excluded_usuario_fields = [
    "usuario.token",
    "usuario.pusher_key",
    "usuario.pusher_cluster",
]

pedido_pusher_schema = PedidoSchema(exclude=["produto"] + _excluded_usuario_fields)
pedido_schema = PedidoSchema(exclude=_excluded_usuario_fields)
pedidos_schema = PedidoSchema(many=True, exclude=_excluded_usuario_fields)
usuario_schema = UsuarioSchema()
