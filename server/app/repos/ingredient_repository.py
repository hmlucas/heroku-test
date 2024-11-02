from ..models.ingredient import Ingredient
from .search_repository import SearchUtils
from ..extensions import db
from sqlalchemy import select, update
from flask import abort

class IngredientRepository:
    @staticmethod
    def get_all_ingredients():
        """Fetch all ingredients from the database."""
        stmt = select(Ingredient)
        result = (
            db.session.execute(stmt)
            .scalars()
            .all()
        )
        return result

    @staticmethod
    def get_ingredient_or_404(ingredient_name):
        """Fetch an ingredient by name or return a 404 error."""
        stmt = (
            select(Ingredient)
            .where(Ingredient.ingredient == ingredient_name)
        )
        ingredient = db.session.execute(stmt).scalar_one_or_none()
        if ingredient is None:
            abort(404, description="Ingredient not found")
        return ingredient
    
    @staticmethod
    def get_ingredient_search_or_404(search): 
        """Search for ingredients by name or vendor."""
        return SearchUtils.get_search_or_404(db.session, Ingredient, search, None, "ingredient", "vendor")
    
    @staticmethod
    def get_ingredient_measure_search_or_404(search): 
        """Search for ingredients by measure."""
        return SearchUtils.get_exact_search_or_404(db.session, Ingredient, search, None, "ingredient_measure")
    
    @staticmethod
    def get_ingredient_measure_types_or_404(): 
        """Get a list of all measurement types for ingredients."""
        return SearchUtils.get_values_list(db.session, Ingredient, "ingredient_measure")
    
    @staticmethod
    def get_ingredient_storage_search_or_404(search): 
        """Search for ingredients by storage method."""
        return SearchUtils.get_exact_search_or_404(db.session, Ingredient, search, None, "storage_method")
    
    @staticmethod
    def get_ingredient_storage_types_or_404(): 
        """Get a list of all storage methods for ingredients."""
        return SearchUtils.get_values_list(db.session, Ingredient, "storage_method")
    
    @staticmethod
    def insert_ingredient(data):
        """Insert a new ingredient into the database."""
        

        new_ingredient = Ingredient(
            ingredient=data.get("ingredient"),
            vendor=data.get("vendor"),
            ingredient_measure=data.get("ingredient_measure"),
            storage_method=data.get("storage_method"),
            quantity_in_stock=data.get("quantity_in_stock"),
            quantity_threshold=data.get("quantity_threshold"),
        )
        db.session.add(new_ingredient)
        try:
            db.session.commit()
            return new_ingredient
        except Exception as e:
            db.session.rollback()  
            abort(500, description=f"Error adding ingredient: {str(e)}")

    @staticmethod
    def delete_ingredient(ingredient):
        """Delete an ingredient from the database."""
        db.session.delete(ingredient)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()  # Rollback if there's an error
            abort(500, description=f"Error deleting ingredient: {str(e)}")
        
    @staticmethod
    def update_ingredient(ingredient):
        """Update an existing ingredient in the database."""
        stmt = (
            update(Ingredient)
            .where(Ingredient.ingredient == ingredient.ingredient)
            .values(ingredient.to_dict())
        )
        try:
            db.session.execute(stmt)
            db.session.commit()
        except Exception as e:
            db.session.rollback()  # Rollback if there's an error
            abort(500, description=f"Error updating ingredient: {str(e)}")
