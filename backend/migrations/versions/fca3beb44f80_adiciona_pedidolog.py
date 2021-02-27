"""Adiciona PedidoLog

Revision ID: fca3beb44f80
Revises: 8a06e8c99c84
Create Date: 2021-02-27 14:51:24.441514

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "fca3beb44f80"
down_revision = "8a06e8c99c84"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "pedido_log",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("eid", sa.String(length=26), nullable=False),
        sa.Column("criado_em", sa.DateTime(), nullable=False),
        sa.Column("atualizado_em", sa.DateTime(), nullable=False),
        sa.Column("mensagem", sa.Text(), nullable=True),
        sa.Column("publico", sa.Boolean(), nullable=True),
        sa.Column("pedido_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(["pedido_id"], ["pedido.id"],),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_pedido_log_eid"), "pedido_log", ["eid"], unique=True)


def downgrade():
    op.drop_index(op.f("ix_pedido_log_eid"), table_name="pedido_log")
    op.drop_table("pedido_log")
