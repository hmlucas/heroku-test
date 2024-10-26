from ..models.ingredient import Ingredient
from .search_repository import SearchUtils
from ..extensions import db
from sqlalchemy import select, update
from flask import abort

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
    
    @staticmethod #TODO I put vendor and ingredient together since they might want to search that, but its more likely these be seperate queries
    def get_ingredient_search_or_404(search): 
        return SearchUtils.get_search_or_404(db.session, Ingredient, search, None, "ingredient", "vendor")
    
    # get all ingredients of specific measure ? probably useless
    @staticmethod
    def get_ingredient_measure_search_or_404(search): 
        return SearchUtils.get_exact_search_or_404(db.session, Ingredient, search, None, "ingredient_measure")
    
    # get the units of measurement for dropdown
    @staticmethod
    def get_ingredient_measure_types_or_404(): 
        return SearchUtils.get_values_list(db.session, Ingredient, "ingredient_measure")
    
    #get ingrdients by storage method ? might be useful to view incase of a super outbreak of zombies that attack the fridge
    @staticmethod
    def get_ingredient_storage_search_or_404(search): 
        return SearchUtils.get_exact_search_or_404(db.session, Ingredient, search, None, "storage_method")
    
    # get the storage methodoses for dropdown
    @staticmethod
    def get_ingredient_storage_types_or_404(): 
        return SearchUtils.get_values_list(db.session, Ingredient, "storage_method")
    
    
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