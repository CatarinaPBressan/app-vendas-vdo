"""altera cpf usuario

Revision ID: cb918354e8a6
Revises: 260b32b24ae0
Create Date: 2020-02-24 14:36:49.559314

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "cb918354e8a6"
down_revision = "260b32b24ae0"
branch_labels = None
depends_on = None


def upgrade():
    op.execute("ALTER TABLE usuario ALTER COLUMN cpf TYPE varchar(14)")


def downgrade():
    op.execute("ALTER TABLE usuario ALTER COLUMN cpf TYPE varchar(11)")
