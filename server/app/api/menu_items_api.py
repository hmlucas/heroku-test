from flask import Blueprint, jsonify, request
from ..models.menu_item_model import MenuItem
from ..repos.menu_item_repository import MenuItemRepository
from ..repos.order_repository import OrderRepository
from ..models.options_model import Options
menu_items_bp = Blueprint('menu_items_bp', __name__)

@menu_items_bp.route('/', methods=['GET'])
def get_menu_items():
    print("you want all menu items.........too bad!!!!")
    menu_items = MenuItemRepository.get_all_menu_items()
    return jsonify([menu_item.to_dict() for menu_item in menu_items]), 200
"""inserts menu_item"""
@menu_items_bp.route('/new/', methods=['POST'])
def add_menu_item():
    data = request.get_json()
    print( data)
    try:
        menu_item = MenuItemRepository.create_menu_item(data)
        if menu_item is None:
            return jsonify({"error": "Failed to update menu item"}), 500
        
        return jsonify(menu_item.to_dict()), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
@menu_items_bp.route('/<int:menuitem_id>/', methods=['PUT'])
def update_menu_item(menuitem_id):
    data = request.get_json()
    try:
        menu_item = MenuItemRepository.update_menu_item(menuitem_id, data)
        if menu_item is None:
            return jsonify({"error": "Failed to update menu item"}), 500
        
        return jsonify(menu_item.to_dict()), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
