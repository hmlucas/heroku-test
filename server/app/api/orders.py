from flask import Blueprint, jsonify
from ..repos.order_repository import OrderRepository

orders_bp = Blueprint('orders_bp', __name__)

@orders_bp.route('/', methods=['GET'])  
def get_orders():
    orders = OrderRepository.get_all_orders()
    return jsonify([order.to_dict() for order in orders]), 200
@orders_bp.route('/<int:order_id>/', methods=['GET'])   
def get_order(order_id):
    order = OrderRepository.get_order_or_404(order_id)
    return jsonify(order.to_dict()), 200