from flask import Blueprint, jsonify, request, abort
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

@employees_bp.route('/search/', methods=['GET'])
def get_employee_by_name():
    """Retrieve an employee by full name (first + last)."""
    full_name = request.args.get('name')   #/search/?name=John Doe

    if not full_name:
        abort(400, description="Name parameter is required")

    employees = EmployeeRepository.get_employee_name_or_404(full_name)
    if len(employees) == 0:
        abort(404, description="Employee not found")
    return jsonify([employee.to_dict() for employee in employees]), 200