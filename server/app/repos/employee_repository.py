from ..models.employee import Employee
from ..extensions import db
from sqlalchemy import select, update, and_, or_
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
    def get_employee_name_or_404(employee_full_name):
        # search first + last name, or first name / last name only
        name_parts = employee_full_name.strip().split()
        first_name = None
        last_name = None
        
        if len(name_parts) > 0: 
            first_name = name_parts[0]
        if len(name_parts) > 1: 
            last_name = name_parts[1]
        
        stmt = select(Employee)
        
        conditions = []
        if first_name is not None:
            conditions.append(or_(
                Employee.first_name.ilike(f"%{first_name}%"),
                Employee.last_name.ilike(f"%{first_name}%")
            ))
        if last_name is not None:
            conditions.append(or_(
                Employee.first_name.ilike(f"%{last_name}%"),
                Employee.last_name.ilike(f"%{last_name}%")
            ))
            
        if conditions:
            stmt = stmt.where(and_(*conditions))
            
        employee = db.session.execute(stmt).scalars().all()
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
        
    
