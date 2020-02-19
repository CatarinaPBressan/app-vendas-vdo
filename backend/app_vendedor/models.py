from datetime import timedelta

from sqlalchemy.orm import relationship

from app_vendedor.base import db
from app_vendedor import utils
from app_vendedor.enums import EstadoCivil, Ocupacao, DataVencimento


class _BaseTable(object):
    id = db.Column(db.Integer, primary_key=True)
    eid = db.Column(db.String(26), index=True, unique=True, default=utils.create_eid)

    created_at = db.Column(db.DateTime, default=utils.datetime_now)
    updated_at = db.Column(
        db.DateTime, default=utils.datetime_now, onupdate=utils.datetime_now
    )


class Usuario(db.Model, _BaseTable):
    username = db.Column(db.String(255), index=True, unique=True)
    cpf = db.Column(db.String(11), unique=True)
    password = db.Column(db.String(128))


def _generate_expires_on(context):
    created_at = context.get_current_parameters()["created_at"]
    return created_at + timedelta(days=1)


class Token(db.Model, _BaseTable):
    usuario_id = db.Column(db.ForeignKey("usuario.id"))
    expires_on = db.Column(db.DateTime, default=_generate_expires_on)
    expired = db.Column(db.Boolean, default=False)


class Pedido(db.Model, _BaseTable):
    usuario_id = db.Column(db.ForeignKey("usuario.id"))
    produto = relationship("PedidoProduto", uselist=False)
    produto_slug = db.Column(db.String(255))
    # Dados do pedido compartilhado entre todos os produtos
    nome_completo = db.Column(db.String(255))
    cpf = db.Column(db.String(11))
    email = db.Column(db.String(255))
    telefone_celular = db.Column(db.String(14))
    observacoes = db.Column(db.Text)


class PedidoProduto(db.Model, _BaseTable):
    """
    Tabela que segura os dados dos pedidos.
    As colunas são compartilhados entre produtos.
    Idealmente os produtos que não utilizarem alguma coluna não devem mostrar
    essa coluna no JSON.
    """

    pedido_id = db.Column(db.ForeignKey("pedido.id"))
    cep = db.Column(db.String(9))
    uf = db.Column(db.String(2))
    cidade = db.Column(db.String(255))
    logradouro = db.Column(db.String(255))
    endereco_numero = db.Column(db.String(255))
    complemento = db.Column(db.String(255))
    nome_mae = db.Column(db.String(255))
    estado_civil = db.Column(db.Enum(EstadoCivil))
    ocupacao = db.Column(db.Enum(Ocupacao))
    data_vencimento = db.Column(db.Enum(DataVencimento))


def init_app(app):
    pass
