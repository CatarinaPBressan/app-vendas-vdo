"""Usuario PedidoLog

Revision ID: 243188c619df
Revises: fca3beb44f80
Create Date: 2021-02-27 18:43:57.330742

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "243188c619df"
down_revision = "fca3beb44f80"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("pedido_log", sa.Column("usuario_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_pedido_log_usuario_usuario_id_id",
        "pedido_log",
        "usuario",
        ["usuario_id"],
        ["id"],
    )


def downgrade():
    op.drop_constraint(
        "fk_pedido_log_usuario_usuario_id_id", "pedido_log", type_="foreignkey"
    )
    op.drop_column("pedido_log", "usuario_id")
