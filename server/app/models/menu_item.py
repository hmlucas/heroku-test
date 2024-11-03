from app.extensions import db
from sqlalchemy.orm import relationship
from ..models.join_tables import menuitem_options_join

class MenuItem(db.Model):
    __tablename__ = 'menu_items'
    menuitem_id = db.Column(db.Integer, primary_key=True, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'), nullable=False)
    menuitem_price = db.Column(db.Float, nullable=False)
    meal_type = db.Column(db.String(32), nullable=False)
    premium_multiplier = db.Column(db.Integer, nullable=False)
    total_menuitem_price = db.Column(db.Float, nullable=False)
    # Many-to-many relationship with Options through the join table
    options = db.relationship(
        'Options',
        secondary=menuitem_options_join,
        backref='menu_items'
    )
    order = db.relationship('Order', back_populates='menu_items')

    def __repr__(self):
        return f"<MenuItem {self.menuitem_id}>"

    def to_dict(self):
        return {
            "menuitem_id": self.menuitem_id,
            "order_id": self.order_id,
            "menuitem_price": self.menuitem_price,
            "meal_type": self.meal_type,
            "premium_multiplier": self.premium_multiplier,
            "total_menuitem_price": self.total_menuitem_price,
            "options": [option.to_dict() for option in self.options ]
        }
