from ..models.menu_item import MenuItem
from ..extensions import db
from sqlalchemy import select

class MenuItemRepository:
    @staticmethod
    def get_all_menu_items():
        stmt = select(MenuItem)
        result = (
            db.session.execute(stmt)
            .scalars()
            .all()
        )
        return result

    @staticmethod
    def get_menu_item_by_order_id(order_id):
        stmt = select(MenuItem).where(MenuItem.order_id == order_id)
        result = (
            db.session.execute(stmt)
            .scalars()
            .first()
        )
        return result
    
