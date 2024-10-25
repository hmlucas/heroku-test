from ..models.ingredient import Ingredient
from ..extensions import db
from sqlalchemy import select, update
#NOTE - I did NOT test this
class IngredientRepository:
    @staticmethod
    def get_all_ingredients():
        stmt = select(Ingredient)
        result = (
            db.session.execute(stmt)
            .scalars()
            .all()
        )
        return result

    @staticmethod
    def get_ingredient_or_404(ingredient):
        stmt = (
            select(Ingredient)
            .where(Ingredient.ingredient == ingredient)
        )
        ingredient = db.session.execute(stmt).scalar_one_or_none()
        if ingredient is None:
            abort(404, description="Ingredient not found")

        return ingredient

    @staticmethod
    def insert_ingredient(ingredient):
        db.session.add(ingredient)
        db.session.commit()

    @staticmethod
    def delete_ingredient(ingredient):
        db.session.delete(ingredient)
        db.session.commit()
        
    @staticmethod
    def update_ingredient(ingredient):
        stmt = (
            update(Ingredient)
            .where(Ingredient.ingredient == ingredient.ingredient)
            .values(ingredient.to_dict()) 
        )
        db.session.execute(stmt)
        db.session.commit()