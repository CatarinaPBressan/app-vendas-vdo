"""Adiciona coluna arquivo_cotacao_url

Revision ID: 40bdbe307192
Revises: 49fcf427f0d4
Create Date: 2021-02-07 20:18:03.904041

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "40bdbe307192"
down_revision = "49fcf427f0d4"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "pedido", sa.Column("arquivo_cotacao_url", sa.String(), nullable=True)
    )


def downgrade():
    op.drop_column("pedido", "arquivo_cotacao_url")
