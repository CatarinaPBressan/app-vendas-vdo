"""Migração inicial

Revision ID: 260b32b24ae0
Revises:
Create Date: 2020-02-21 21:15:48.639182

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "260b32b24ae0"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "usuario",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("eid", sa.String(length=26), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("username", sa.String(length=255), nullable=True),
        sa.Column("cpf", sa.String(length=11), nullable=True),
        sa.Column("password", sa.String(length=128), nullable=True),
        sa.Column("nome", sa.String(length=255), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("cpf"),
    )
    op.create_index(op.f("ix_usuario_eid"), "usuario", ["eid"], unique=True)
    op.create_index(op.f("ix_usuario_username"), "usuario", ["username"], unique=True)
    op.create_table(
        "pedido",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("eid", sa.String(length=26), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("usuario_id", sa.Integer(), nullable=True),
        sa.Column("produto_slug", sa.String(length=255), nullable=True),
        sa.Column("status", sa.String(length=255), nullable=True),
        sa.Column("nome_completo", sa.String(length=255), nullable=True),
        sa.Column("cpf", sa.String(length=14), nullable=True),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("telefone_celular", sa.String(length=14), nullable=True),
        sa.Column("observacoes", sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(["usuario_id"], ["usuario.id"],),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_pedido_eid"), "pedido", ["eid"], unique=True)
    op.create_table(
        "token",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("eid", sa.String(length=26), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("usuario_id", sa.Integer(), nullable=True),
        sa.Column("expires_on", sa.DateTime(), nullable=True),
        sa.Column("expired", sa.Boolean(), nullable=True),
        sa.ForeignKeyConstraint(["usuario_id"], ["usuario.id"],),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_token_eid"), "token", ["eid"], unique=True)
    op.create_table(
        "pedido_produto",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("eid", sa.String(length=26), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("pedido_id", sa.Integer(), nullable=True),
        sa.Column("cep", sa.String(length=9), nullable=True),
        sa.Column("uf", sa.String(length=2), nullable=True),
        sa.Column("cidade", sa.String(length=255), nullable=True),
        sa.Column("logradouro", sa.String(length=255), nullable=True),
        sa.Column("endereco_numero", sa.String(length=255), nullable=True),
        sa.Column("complemento", sa.String(length=255), nullable=True),
        sa.Column("nome_mae", sa.String(length=255), nullable=True),
        sa.Column(
            "estado_civil",
            sa.Enum("solteiro", "casado", "viuvo", "separado", name="estadocivil"),
            nullable=True,
        ),
        sa.Column(
            "ocupacao",
            sa.Enum(
                "assalariado",
                "empresario",
                "aposentado",
                "autonomo",
                "outros",
                name="ocupacao",
            ),
            nullable=True,
        ),
        sa.Column(
            "data_vencimento",
            sa.Enum(
                "dia_5", "dia_10", "dia_15", "dia_20", "dia_25", name="datavencimento"
            ),
            nullable=True,
        ),
        sa.ForeignKeyConstraint(["pedido_id"], ["pedido.id"],),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_pedido_produto_eid"), "pedido_produto", ["eid"], unique=True
    )


def downgrade():
    op.drop_index(op.f("ix_pedido_produto_eid"), table_name="pedido_produto")
    op.drop_table("pedido_produto")
    op.drop_index(op.f("ix_token_eid"), table_name="token")
    op.drop_table("token")
    op.drop_index(op.f("ix_pedido_eid"), table_name="pedido")
    op.drop_table("pedido")
    op.drop_index(op.f("ix_usuario_username"), table_name="usuario")
    op.drop_index(op.f("ix_usuario_eid"), table_name="usuario")
    op.drop_table("usuario")
    op.execute("DROP TYPE estadocivil")
    op.execute("DROP TYPE ocupacao")
    op.execute("DROP TYPE datavencimento")
