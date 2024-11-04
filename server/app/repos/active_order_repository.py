from ..extensions import db
from sqlalchemy import select
from ..models.active_order_model import ActiveOrder
from flask import abort

class ActiveOrderRepository:
    @staticmethod
    def get_all_active_orders():
        stmt = select(ActiveOrder)
        result = (
            db.session.execute(stmt)
            .scalars()
            .all()
            )
        return result
    def get_active_order_or_404(order_id):
        stmt = (
            select(ActiveOrder)
            .where(ActiveOrder.order_id == order_id)
        )
        order = db.session.execute(stmt).scalar_one_or_none()
        if order is None:
            abort(404, description="Order not found")
        return order
    @staticmethod
    def insert_active_order(order_id):
        try:
            new_active_order = ActiveOrder(order_id=order_id)
            db.session.add(new_active_order)
            db.session.commit()
            return new_active_order
        except Exception as e:
            print(e)
            db.session.rollback()
            abort(500, description="Failed to add active order")