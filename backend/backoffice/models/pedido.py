from backoffice import base
from backoffice.base import db


class Pedido(db.Model, base.BaseTable):
    usuario_id = db.Column(db.ForeignKey("usuario.id"))
    usuario = db.relationship("Usuario")
    produto = db.relationship("PedidoProduto", uselist=False, backref="pedido")
    produto_slug = db.Column(db.String(255))
    status = db.Column(db.String(255), default="NOVO")
    # Dados do pedido compartilhados entre todos os produtos
    nome_completo = db.Column(db.String(255))
    cpf = db.Column(db.String(14))
    email = db.Column(db.String(255))
    telefone_celular = db.Column(db.String(14))
    observacoes = db.Column(db.Text)
