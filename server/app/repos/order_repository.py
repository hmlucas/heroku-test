from ..models.order import Order
from ..models.menu_item import MenuItem
from ..models.options import Options
from ..models.active_order import ActiveOrder
from ..repos.active_order_repository import ActiveOrderRepository
from ..repos.menu_item_repository import MenuItemRepository
from ..models.join_tables import menuitem_options_join

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
        menu_items = MenuItemRepository.get_menu_item_by_order_id(order_id)
        return menu_items
    def get_active_orders():    
        active_orders = ActiveOrderRepository.get_all_active_orders()
        stmt = (
            select(Order)
            .where(Order.order_id.in_([order.order_id for order in active_orders]))
        )
        orders = db.session.execute(stmt).scalars().all() 
        return orders      
        