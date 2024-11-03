from flask import Blueprint, jsonify, request
from ..models.menu_item_model import MenuItem
from ..repos.menu_item_repository import MenuItemRepository
from ..repos.order_repository import OrderRepository
from ..models.options_model import Options
menu_items_bp = Blueprint('menu_items_bp', __name__)

@menu_items_bp.route('/', methods=['GET'])
def get_menu_items():
    menu_items = MenuItemRepository.get_all_menu_items()
    return jsonify([menu_item.to_dict() for menu_item in menu_items]), 200
"""inserts menu_item"""
@menu_items_bp.route('/new/', methods=['POST'])
def add_menu_item(data):
    menu_item = MenuItemRepository.insert_menu_item(data)
    return jsonify(menu_item.to_dict()), 201
@menu_items_bp.route('/new/<int:menuitem_id>/', methods=['POST'])
def add_mi_options(menuitem_id):
    data = request.get_json()
    menu_item = MenuItemRepository.update_menu_item_options(data, menuitem_id)
    return jsonify(menu_item.to_dict()), 201
    
    
