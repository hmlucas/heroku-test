from ..models.menu_item_model import MenuItem
from ..repos.option_repository import OptionRepository
from ..models.options_model import Options
from ..extensions import db
from sqlalchemy import select,update
from flask import jsonify
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
            .all()
        )
        return result
    
    """inserts single menu item from menu_item json (data)"""
    @staticmethod
    def insert_menu_item(data):
        menu_item = MenuItem(
            menuitem_id = data.get("menuitem_id"),
            order_id = data.get("order_id"),
            menuitem_price = data.get("menuitem_price"),
            meal_type = data.get("meal_type"),
            premium_multiplier = data.get("premium_multiplier"),
            total_menuitem_price = data.get("total_menuitem_price")
        )
        try:
            db.session.add(menu_item)
            db.session.commit()
        except Exception as e:
            print(e)
            return jsonify({"error": "failed to add menu_item"}), 500
        
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
            return jsonify({"error": f"failed to find menu_item (id:{menuitem_id})"}), 500
        
    """adds provided options list to menu_item w/ given id"""
    @staticmethod
    def update_menu_item_options(options, menuitem_id):
        menu_item = MenuItemRepository.get_menu_item_by_id(menuitem_id)
        opt_list = []

        for opt in options:
            existing_option = OptionRepository.get_option_or_404(opt.get("option"))
            if existing_option:
                opt_list.append(existing_option)
            else:
                new_option = Options(
                    option=opt.get("option"),
                    additional_charge=opt.get("additional_charge"),
                    category=opt.get("category"),
                    is_seasonal=opt.get("is_seasonal")
                )
                db.session.add(new_option)
                opt_list.append(new_option)

        menu_item.options = opt_list
        db.session.commit()
        return menu_item


                
            
            
            
        
