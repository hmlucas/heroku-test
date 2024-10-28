from sqlalchemy import Table, Column, Integer, String, ForeignKey
from app.extensions import db

menuitem_options_join = Table(
    'menuitem_options_join',
    db.Model.metadata,
    Column('menuitem_option_id', Integer, primary_key=True),
    Column('menuitem_id', Integer, ForeignKey('menu_items.menuitem_id'), nullable=False),
    Column('option', String(64), ForeignKey('options.option'), nullable=False)
)
