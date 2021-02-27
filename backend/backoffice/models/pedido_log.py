from backoffice import base
from backoffice.base import db


class PedidoLog(db.Model, base.BaseTable):
    mensagem = db.Column(db.Text)
    publico = db.Column(db.Boolean, default=False)

    pedido_id = db.Column(db.ForeignKey("pedido.id"))
    pedido = db.relationship("Pedido", backref="logs")
