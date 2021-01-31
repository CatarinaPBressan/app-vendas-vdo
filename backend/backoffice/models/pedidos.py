import enum
from os import path

import flask

import sqlalchemy
from transitions import Machine

from backoffice.base import db, BaseTable


class ESTADOS(str, enum.Enum):
    NOVO = "novo"
    CANCELADO = "cancelado"
    COMPLETO = "completo"
    ANALISE_CREDITO = "analise_credito"
    REPROVADO = "reprovado"
    EM_ANDAMENTO = "em_andamento"


class TRANSICOES(str, enum.Enum):
    INICIAR = "iniciar"
    APROVAR = "aprovar"
    COMPLETAR = "completar"
    REPROVAR = "reprovar"
    CANCELAR = "cancelar"


_transicoes = [
    {
        "trigger": TRANSICOES.INICIAR.value,
        "source": ESTADOS.NOVO.value,
        "dest": ESTADOS.ANALISE_CREDITO.value,
    },
    {
        "trigger": TRANSICOES.APROVAR.value,
        "source": ESTADOS.ANALISE_CREDITO.value,
        "dest": ESTADOS.EM_ANDAMENTO.value,
    },
    {
        "trigger": TRANSICOES.COMPLETAR.value,
        "source": ESTADOS.EM_ANDAMENTO.value,
        "dest": ESTADOS.COMPLETO.value,
    },
    {
        "trigger": TRANSICOES.REPROVAR.value,
        "source": ESTADOS.ANALISE_CREDITO.value,
        "dest": ESTADOS.REPROVADO.value,
    },
    {
        "trigger": TRANSICOES.CANCELAR.value,
        "source": "*",
        "dest": ESTADOS.CANCELADO.value,
    },
]


class Pedido(db.Model, BaseTable, Machine):
    @sqlalchemy.orm.reconstructor
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        Machine.__init__(
            self,
            states=[estado.value for estado in ESTADOS],
            transitions=_transicoes,
            initial=self.status or ESTADOS.NOVO.value,
            model_attribute="status",
        )

    usuario_id = db.Column(db.ForeignKey("usuario.id"))
    usuario = db.relationship("Usuario")
    produto = db.relationship("PedidoProduto", uselist=False, backref="pedido")
    produto_slug = db.Column(db.String(255))
    status = db.Column(db.String(255), default=ESTADOS.NOVO.value)
    # Dados do pedido compartilhados entre todos os produtos
    nome_completo = db.Column(db.String(255))
    cpf = db.Column(db.String(14))
    email = db.Column(db.String(255))
    telefone_celular = db.Column(db.String(14))
    observacoes = db.Column(db.Text)

    def get_diretorio_arquivo(self, produto_key: str) -> str:
        absolute_instance_path = path.abspath(flask.current_app.instance_path)
        return f"{absolute_instance_path}/pedidos/{self.eid}/{produto_key}"
