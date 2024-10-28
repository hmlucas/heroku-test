from ..extensions import db
from sqlalchemy import select
from ..models.active_order import ActiveOrder

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
    