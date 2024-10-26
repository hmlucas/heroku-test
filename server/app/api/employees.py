from flask import Blueprint, jsonify, request, abort
from ..repos.employee_repository import EmployeeRepository

employees_bp = Blueprint('employees_bp', __name__)

def fetch_employees(search_terms):
    if not search_terms:
        return EmployeeRepository.get_all_employees() # return all employees if there was no search
    return EmployeeRepository.get_employee_search_or_404(search_terms)

@employees_bp.route('/', methods=['GET'])
def get_employees():
    #check if GET is requesting a search
    search_terms = request.args.get('search')
    employees = fetch_employees(search_terms)
    
    #no employees to return
    if len(employees) == 0:
        abort(404, description="Employee not found")
        
    return jsonify([employee.to_dict() for employee in employees]), 200

@employees_bp.route('/<int:employee_id>/', methods=['GET'])
def get_employee(employee_id):
    employee = EmployeeRepository.get_employee_or_404(employee_id)
    return jsonify(employee.to_dict()), 200