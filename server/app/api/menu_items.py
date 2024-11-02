from flask import Blueprint, jsonify
from ..models.menu_item import MenuItem
from ..repos.menu_item_repository import MenuItemRepository
from ..repos.order_repository import OrderRepository
menu_items_bp = Blueprint('menu_items_bp', __name__)

@menu_items_bp.route('/', methods=['GET'])
def get_menu_items():
    menu_items = MenuItemRepository.get_all_menu_items()
    return jsonify([menu_item.to_dict() for menu_item in menu_items]), 200

