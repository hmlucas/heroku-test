from app.extensions import db

class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    ingredient = db.Column(db.String(40), primary_key=True, nullable=False)
    vendor = db.Column(db.String(40), nullable=False)
    ingredient_measure = db.Column(db.String(40), nullable=False)
    storage_method = db.Column(db.String(40), nullable=False)
    quantity_in_stock = db.Column(db.Float, nullable=False)
    quantity_threshold = db.Column(db.Float, nullable=False)
    
    def __repr__(self):
        return f"<Ingredient {self.ingredient}>"

    def to_dict(self):
        return {
            "ingredient": self.ingredient,
            "vendor": self.vendor,
            "ingredient_measure": self.ingredient_measure,
            "storage_method": self.storage_method,
            "quantity_in_stock": self.quantity_in_stock,
            "quantity_threshold": self.quantity_threshold
        }
        
    def get_ingredients_by_option(option):
        pass
    #NOTE - create option ingred joint tbl
    
    def get_all_ingredients():
        pass
    
    def insert_ingredient(ingredient):
        pass
    
    def delete_ingredient(ingredient):
        pass
    
    def edit_ingredient(ingredient):
        pass