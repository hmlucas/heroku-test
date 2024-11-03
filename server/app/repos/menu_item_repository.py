from ..models.menu_item_model import MenuItem
from ..repos.option_repository import OptionRepository
from ..models.options_model import Options
from ..extensions import db
from sqlalchemy import select,update
from flask import abort
class MenuItemRepository:
    @staticmethod
    def get_all_menu_items():
        stmt = select(MenuItem).limit(100)#i totally fix (add pagination) this later trust
        try:
            result = (
                db.session.execute(stmt)
                .scalars()
                .all()
            )
        except Exception as e:
            print(e)
            err = "failed to get all menu items"
            abort(404, description=err)
        return result

    @staticmethod
    def get_menu_item_by_order_id(order_id):
        stmt = select(MenuItem).where(MenuItem.order_id == order_id)
        try:
            result = (
                db.session.execute(stmt)
                .scalars()
                .all()
            )
        except Exception as e:
            print(e)
            err = f"failed to find menu_item (order_id:{order_id})"
            abort(404, description=err)
        return result
    
        
    """returns single menu item with given id"""
    @staticmethod
    def get_menu_item_by_id(menuitem_id):
        stmt = select(MenuItem).where(MenuItem.menuitem_id == menuitem_id)
        try:
            result = (
                db.session.execute(stmt)
                .scalar()
            )
            return result
        except Exception as e:
            print(e)
            err = f"menu_item (id:{menuitem_id}) does not exist!"
            abort(404, description=err)
    @staticmethod
    def create_menu_item(data):
        """creates new menu item"""
        options_list = OptionRepository.parse_options(data.get("options", []))  
        menu_item = MenuItem(
            order_id=data.get("order_id"),
            menuitem_price=data.get("menuitem_price"),
            meal_type=data.get("meal_type"),
            premium_multiplier=data.get("premium_multiplier"),
            total_menuitem_price=data.get("total_menuitem_price"),
            options=options_list
        )
        
        try:
            db.session.add(menu_item)
            db.session.commit()
            return menu_item
        except Exception as e:
            print(e)
            db.session.rollback() 
            return None

    @staticmethod
    def update_menu_item(menuitem_id, data):
        """updates existing menu_item with menu_item.id = menuitem_id."""
        menu_item = MenuItemRepository.get_menu_item_by_id(menuitem_id)        
        menu_item.menuitem_price = data.get("menuitem_price", menu_item.menuitem_price)
        menu_item.meal_type = data.get("meal_type", menu_item.meal_type)
        menu_item.premium_multiplier = data.get("premium_multiplier", menu_item.premium_multiplier)
        menu_item.total_menuitem_price = data.get("total_menuitem_price", menu_item.total_menuitem_price)

        options_list = OptionRepository.parse_options(data.get("options", []))
        menu_item.options = options_list  
        try:
            db.session.commit()  
            return menu_item
        except Exception as e:
            print(e)
            db.session.rollback() 
            return None
    """return list of menu item objects"""
    @staticmethod
    def parse_menu_items(menu_items):
        mi_list = []
        for mi in menu_items:
            opt_list = []
            for o in mi.get("options", []):
                opt_list.append(o["option"])
            mi_list.append(MenuItem(
                order_id=mi.get("order_id"),
                menuitem_price=mi.get("menuitem_price"),
                meal_type=mi.get("meal_type"),
                premium_multiplier=mi.get("premium_multiplier"),
                total_menuitem_price=mi.get("total_menuitem_price"),
                options=OptionRepository.parse_options(opt_list)
            ))
        return mi_list
                
            
