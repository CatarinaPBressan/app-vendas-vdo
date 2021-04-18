"""dados_adicionais_vendedor

Revision ID: 122ff1ed8cb2
Revises: 243188c619df
Create Date: 2021-04-18 18:43:03.363892

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "122ff1ed8cb2"
down_revision = "243188c619df"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("usuario", sa.Column("cidade", sa.String(), nullable=True))
    op.add_column("usuario", sa.Column("email", sa.String(), nullable=True))
    op.add_column("usuario", sa.Column("estado", sa.String(length=2), nullable=True))
    op.add_column("usuario", sa.Column("telefone", sa.String(length=15), nullable=True))


def downgrade():
    op.drop_column("usuario", "telefone")
    op.drop_column("usuario", "estado")
    op.drop_column("usuario", "email")
    op.drop_column("usuario", "cidade")
