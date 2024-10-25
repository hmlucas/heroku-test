from ..models.employee import Employee
from ..extensions import db
from sqlalchemy import select, update
from flask import abort

class EmployeeRepository:
    @staticmethod
    def get_all_employees():
        # scalars() returns a list of the employee objects (w/o table metadata)
        stmt = select(Employee)
        result = (
            db.session.execute(stmt)
            .scalars()
            .all()
            )
        return result 

    @staticmethod
    def get_employee_or_404(employee_id):
        stmt = (
            select(Employee)
            .where(Employee.employee_id == employee_id)
        )
        employee = db.session.execute(stmt).scalar_one_or_none()
        #raises 404 error if employee is None
        if employee is None:
            abort(404, description="Employee not found")

        return employee

    
    @staticmethod
    def insert_employee(employee):
        db.session.add(employee)
        db.session.commit()

    @staticmethod
    def delete_employee(employee):
        db.session.delete(employee)
        db.session.commit()
        
    @staticmethod
    def update_employee(employee):
        stmt = (
            update(Employee)
            .where(Employee.employee_id == employee.employee_id)
            .values(employee.to_dict()) 
        )
        db.session.execute(stmt)
        db.session.commit()
        
    
