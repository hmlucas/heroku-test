from app.extensions import db

class ActiveOrder(db.Model):
    __tablename__ = 'active_orders'
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'),primary_key=True, nullable=False)
    
    def __repr__(self):
        return f"<ActiveOrder {self.order_id}>"
    def to_dict(self):#lowkey a stupid function but keeping it for consistency
        return {
            "order_id": self.order_id
        }