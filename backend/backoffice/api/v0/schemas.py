import marshmallow
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
    class Meta:
        unknown = marshmallow.INCLUDE

    dados_produto = fields.Dict()

    @marshmallow.post_dump(pass_many=False)
    def _flatten(self, dumped, **_):
        return dumped["dados_produto"]


class PedidoLogSchema(Schema):
    eid = fields.String(dump_only=True)

    mensagem = fields.String(required=True)
    publico = fields.Boolean(required=True)

    usuario = fields.Nested(UsuarioSchema, dump_only=True)
    criado_em = fields.DateTime(format="iso", dump_only=True)


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
    criado_em = fields.DateTime(format="iso", dump_only=True)
    atualizado_em = fields.DateTime(format="iso", dump_only=True)
    usuario = fields.Nested(UsuarioSchema, dump_only=True)
    arquivo_cotacao_url = fields.String(dump_only=True)
    logs = fields.Nested(PedidoLogSchema, dump_only=True, many=True)


_excluded_usuario_fields = [
    "usuario.token",
    "usuario.pusher_key",
    "usuario.pusher_cluster",
]

_excluded_logs_usuario_fields = [
    "logs.usuario.token",
    "logs.usuario.pusher_key",
    "logs.usuario.pusher_cluster",
]

pedido_pusher_schema = PedidoSchema(
    exclude=["produto", "logs"] + _excluded_usuario_fields
)
pedido_schema = PedidoSchema(
    exclude=_excluded_usuario_fields + _excluded_logs_usuario_fields
)
pedidos_schema = PedidoSchema(
    many=True, exclude=_excluded_usuario_fields + _excluded_logs_usuario_fields
)
usuario_schema = UsuarioSchema()
pedido_log_schema = PedidoLogSchema(exclude=_excluded_usuario_fields)
