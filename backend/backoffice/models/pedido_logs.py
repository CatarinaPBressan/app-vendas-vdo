import sqlalchemy

from backoffice import base
from backoffice.base import db


class PedidoLog(db.Model, base.BaseTable):
    mensagem = db.Column(db.Text)
    publico = db.Column(db.Boolean, default=False)

    pedido_id = db.Column(db.ForeignKey("pedido.id"))
    pedido = db.relationship(
        "Pedido",
        backref=sqlalchemy.orm.backref("logs", order_by="asc(PedidoLog.criado_em)"),
    )

    usuario_id = db.Column(db.ForeignKey("usuario.id"))
    usuario = db.relationship("Usuario")
