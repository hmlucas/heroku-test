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
    def get_employee_search_or_404(search): #search through given terms for id, or names
        search = search.replace("%20", " ") #so it doesnt do weird things
        terms = search.strip().split() # currently splitting by spaces, if the system requests a different format we can do
        
        stmt = select(Employee)
        print(terms)
        
        conditions = []
        for searchTerm in terms: #all search terms
            try: #ints
                searchInt = int(searchTerm)
                conditions.append(Employee.employee_id == searchInt) #search via ID 
            except ValueError: #all other search terms
                conditions.append(
                    or_(
                        Employee.first_name.ilike(f"%{searchTerm}%"),# seach via name
                        Employee.last_name.ilike(f"%{searchTerm}%")
                    )
                )
            
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
        
    
