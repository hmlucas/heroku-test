from app.extensions import db

class Order(db.Model):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True, nullable=False)
    payment_method = db.Column(db.String(32), nullable=False)
    order_date = db.Column(db.Date, nullable=False)
    price = db.Column(db.Float, nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.employee_id'), nullable=False)
    #TODO - ticket mgmt?

    def __repr__(self):
        return f"<Order {self.order_id}>"

    def to_dict(self):
        return {
            "order_id": self.order_id,
            "payment_method": self.payment_method,
            "order_date": self.order_date.isoformat(),
            "price": self.price,
            "employee_id": self.employee_id   
        }