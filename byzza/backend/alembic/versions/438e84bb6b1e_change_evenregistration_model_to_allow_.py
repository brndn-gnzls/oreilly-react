"""change EvenRegistration model to allow nullable and non-unique fields.

Revision ID: 438e84bb6b1e
Revises: 
Create Date: 2024-02-07 08:36:11.177464

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '438e84bb6b1e'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.drop_constraint(constraint_name='UNIQUE', table_name='attendees')


def downgrade() -> None:
    pass
