"""first migration speaker model

Revision ID: 458da3ce22a8
Revises: 
Create Date: 2024-02-01 10:17:22.081534

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '458da3ce22a8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('speakers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('bio', sa.Text(), nullable=False),
    sa.Column('photo', sa.String(length=100), nullable=True),
    sa.Column('contact_info', sa.String(length=100), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('speakers')
    # ### end Alembic commands ###
