from ..models.order import Order
from ..extensions import db
from sqlalchemy import select, update
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