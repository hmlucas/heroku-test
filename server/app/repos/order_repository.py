from ..models.order import Order
from ..models.menu_item import MenuItem
from ..models.options import Options
from ..extensions import db
from sqlalchemy import select, update, Table, Column, Integer, ForeignKey, String
from flask import abort

class OrderRepository:
    @staticmethod
    def get_all_orders():
        stmt = select(Order)
        result = (
            db.session.execute(stmt)
            .scalars()
            .all()
            )
        return result 

    @staticmethod
    def get_order_or_404(order_id):
        stmt = (
            select(Order)
            .where(Order.order_id == order_id)
        )
        order = db.session.execute(stmt).scalar_one_or_none()
        if order is None:
            abort(404, description="Order not found")

        return order

    @staticmethod
    def insert_order(order):
        db.session.add(order)
        db.session.commit()

    @staticmethod
    def delete_order(order):
        db.session.delete(order)
        db.session.commit()
        
    @staticmethod
    def update_order(order):
        stmt = (
            update(Order)
            .where(Order.order_id == order.order_id)
            .values(order.to_dict()) 
        )
        db.session.execute(stmt)
        db.session.commit()
        
    def send_order(order):
        Order.insert_order(order)
        #TODO
        
    def insert_order(order):
        db.session.add(order)
        db.session.commit()
        
    def get_order_menu_items(order_id):
        menuitem_options_join = Table(
            'menuitem_options_join',
            db.Model.metadata,
            Column('menuitem_option_id', Integer, primary_key=True),
            Column('menuitem_id', Integer, ForeignKey('menu_items.menuitem_id')),
            Column('option', String(64), ForeignKey('options.option')),
            extend_existing=True
        )
        menu_items = (
            db.session.query(MenuItem)
            .join(menuitem_options_join, MenuItem.menuitem_id == menuitem_options_join.c.menuitem_id)
            .join(Options, Options.option == menuitem_options_join.c.option)
            .filter(MenuItem.order_id == order_id)
            .all()
        )
        return menu_items
        