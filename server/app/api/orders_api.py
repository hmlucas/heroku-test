from flask import Blueprint, jsonify, request
from ..models.order_model import Order
from ..repos.order_repository import OrderRepository
from ..repos.menu_item_repository import MenuItemRepository

orders_bp = Blueprint('orders_bp', __name__)

@orders_bp.route('/', methods=['GET'])  
def get_orders():
    orders = OrderRepository.get_all_orders()
    return jsonify([order.to_dict() for order in orders]), 200
@orders_bp.route('/<int:order_id>/', methods=['GET'])   
def get_order(order_id):
    order = OrderRepository.get_order_or_404(order_id)
    return jsonify(order.to_dict()), 200
@orders_bp.route('/<int:order_id>/mi', methods=['GET'])
def get_order_menu_items(order_id):
    menu_items = OrderRepository.get_order_menu_items(order_id)
    menu_item_options = [
        {
            "menu_item_id": menu_item.menuitem_id,
            "options": [option.option for option in menu_item.options] 
        }
        for menu_item in menu_items
    ]
    return jsonify(menu_item_options), 200
@orders_bp.route('/new', methods=['POST'])
def add_order():
    data = request.get_json()
    try:
        new_order = OrderRepository.insert_order(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(new_order.to_dict()), 201

@orders_bp.route('/active', methods=['GET'])
def get_active_orders():
    active_orders = OrderRepository.get_active_orders()
    return jsonify([order.to_dict() for order in active_orders]), 200
