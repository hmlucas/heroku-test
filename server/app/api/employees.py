from flask import Blueprint, jsonify
from ..repos.employee_repository import EmployeeRepository

employees_bp = Blueprint('employees_bp', __name__)

@employees_bp.route('/', methods=['GET'])
def get_employees():
    employees = EmployeeRepository.get_all_employees()
    return jsonify([employee.to_dict() for employee in employees]), 200

@employees_bp.route('/<int:employee_id>/', methods=['GET'])
def get_employee(employee_id):
    employee = EmployeeRepository.get_employee_or_404(employee_id)
    return jsonify(employee.to_dict()), 200