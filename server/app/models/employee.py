from app.extensions import db

class Employee(db.Model):
    __tablename__ = 'employees'

    employee_id = db.Column(db.Integer, primary_key=True,autoincrement=True, nullable=False)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    employee_role = db.Column(db.String(32), nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    wage = db.Column(db.Float, nullable=False)
    hire_date = db.Column(db.Date, nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f"<Employee {self.first_name} {self.last_name}>"

    def to_dict(self):
        return {
            "employee_id": self.employee_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "employee_role": self.employee_role,
            "birth_date": self.birth_date.isoformat(),
            "wage": self.wage,
            "hire_date": self.hire_date.isoformat(),
            "is_active": self.is_active
        }