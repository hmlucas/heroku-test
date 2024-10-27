
from app.extensions import db

# Define the join table between MenuItem and Options
class MenuItemOptionsJoin(db.Model):
    __tablename__ = 'menuitem_options_join'
    
    menuitem_option_id = db.Column(db.Integer, primary_key=True, nullable=False)
    menuitem_id = db.Column(db.Integer, db.ForeignKey('menu_items.menuitem_id'), nullable=False)
    option_id = db.Column(db.String(64), db.ForeignKey('options.option'), nullable=False)
    
    def __repr__(self):
        return f"<MenuItemOptionsJoin {self.menuitem_option_id}>"
    
    def to_dict(self):
        return {
            "menuitem_option_id": self.menuitem_option_id,
            "menuitem_id": self.menuitem_id,
            "option_id": self.option_id
        }