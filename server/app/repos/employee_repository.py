from ..models.employee_model import Employee
from .search_repository import SearchUtils
from ..extensions import db
from sqlalchemy import select, update
from flask import abort

class EmployeeRepository:
    @staticmethod
    def get_all_employees():
        """Fetch all employees from the database."""
        stmt = select(Employee)
        try:
            result = db.session.execute(stmt).scalars().all()
            return result 
        except Exception as e:
            db.session.rollback()  # Rollback if there's an error
            abort(500, description=f"Error fetching employees: {str(e)}")

    @staticmethod
    def get_employee_or_404(employee_id):
        """Fetch an employee by ID or return a 404 error."""
        stmt = (
            select(Employee)
            .where(Employee.employee_id == employee_id)
        )
        employee = db.session.execute(stmt).scalar_one_or_none()
        if employee is None:
            abort(404, description="Employee not found")
        return employee
    
    @staticmethod
    def get_employee_search_or_404(search):
        """Fetch employees based on search terms or return a 404 error."""
        return SearchUtils.get_search_or_404(db.session, Employee, search, "employee_id", "first_name", "last_name")
    
    @staticmethod
    def insert_employee(data):
        """Insert a new employee into the database."""
        new_employee = Employee(
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            employee_role=data.get("employee_role"),
            birth_date=data.get("birth_date"),
            wage=data.get("wage"),
            hire_date=data.get("hire_date"),
            is_active=data.get("is_active"),
        )
        try:
            db.session.add(new_employee)
            db.session.commit()
            return new_employee 
        except Exception as e:
            db.session.rollback()  # Rollback the session in case of error
            abort(500, description=f"Error adding employee: {str(e)}")

    @staticmethod
    def delete_employee(employee):
        """Delete an employee from the database."""
        try:
            db.session.delete(employee)
            db.session.commit()
        except Exception as e:
            db.session.rollback()  # Rollback the session in case of error
            abort(500, description=f"Error deleting employee: {str(e)}")
        
    @staticmethod
    def update_employee(employee):
        """Update an existing employee in the database."""
        stmt = (
            update(Employee)
            .where(Employee.employee_id == employee.employee_id)
            .values(employee.to_dict())
        )
        try:
            db.session.execute(stmt)
            db.session.commit()
            return employee  # Return the updated employee object
        except Exception as e:
            db.session.rollback()  # Rollback the session in case of error
            abort(500, description=f"Error updating employee: {str(e)}")
