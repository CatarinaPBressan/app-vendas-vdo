"""Renomeia created updated -> criado atualizado

Revision ID: 8a06e8c99c84
Revises: 40bdbe307192
Create Date: 2021-02-27 13:31:52.885433

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "8a06e8c99c84"
down_revision = "40bdbe307192"
branch_labels = None
depends_on = None


def upgrade():
    for tabela in ["usuario", "permissao", "pedido_produto", "pedido", "franquia"]:
        for nome_antigo, nome_novo in [
            ("created_at", "criado_em",),
            ("updated_at", "atualizado_em"),
        ]:
            op.alter_column(tabela, nome_antigo, new_column_name=nome_novo)


def downgrade():
    for tabela in ["usuario", "permissao", "pedido_produto", "pedido", "franquia"]:
        for nome_antigo, nome_novo in [
            ("criado_em", "created_at"),
            ("atualizado_em", "updated_at"),
        ]:
            op.alter_column(tabela, nome_antigo, new_column_name=nome_novo)
