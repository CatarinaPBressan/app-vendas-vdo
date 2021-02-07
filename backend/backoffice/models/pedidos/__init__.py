from os import path, stat

import flask

import sqlalchemy
import transitions

from backoffice.base import db, BaseTable

from backoffice.models.pedidos import status
from backoffice.models import produtos


class Pedido(db.Model, BaseTable, transitions.Machine):
    @sqlalchemy.orm.reconstructor
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        produto_slug = self.produto_slug or kwargs.get("produto_slug")
        produto = produtos.PRODUTOS.get(produto_slug)
        transicoes = status.get_transicoes_produto(produto)
        estados = [estado.value for estado in status.get_estados_produto(produto)]

        transitions.Machine.__init__(
            self,
            states=estados,
            transitions=transicoes,
            initial=self.status or status.ESTADOS.NOVO.value,
            model_attribute="status",
        )

    usuario_id = db.Column(db.ForeignKey("usuario.id"))
    usuario = db.relationship("Usuario")
    produto = db.relationship("PedidoProduto", uselist=False, backref="pedido")
    produto_slug = db.Column(db.String(255))
    status = db.Column(db.String(255), default=status.ESTADOS.NOVO.value)
    # Dados do pedido compartilhados entre todos os produtos
    nome_completo = db.Column(db.String(255))
    cpf = db.Column(db.String(14))
    email = db.Column(db.String(255))
    telefone_celular = db.Column(db.String(14))
    observacoes = db.Column(db.Text)

    def get_diretorio_arquivo(self, produto_key: str) -> str:
        absolute_instance_path = path.abspath(flask.current_app.instance_path)
        return f"{absolute_instance_path}/pedidos/{self.eid}/{produto_key}"
