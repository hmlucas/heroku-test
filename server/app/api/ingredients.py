from flask import Blueprint, jsonify, request, abort
from ..repos.ingredient_repository import IngredientRepository

ingredients_bp = Blueprint('ingredients_bp', __name__)

def fetch_ingredients(search_terms):
    if not search_terms:
        return IngredientRepository.get_all_ingredients() # return all employees if there was no search
    return IngredientRepository.get_ingredient_search_or_404(search_terms)

@ingredients_bp.route('/', methods=['GET'])
def get_ingredients():
    #check if GET is requesting a search
    search_terms = request.args.get('search')
    ingredients = fetch_ingredients(search_terms)
    
    #no employees to return
    if len(ingredients) == 0:
        abort(404, description="Ingredients not found")
        
    return jsonify([ingredient.to_dict() for ingredient in ingredients]), 200

@ingredients_bp.route('/measure-list/', methods=['GET'])
def get_ingredient_measure():
    measures = IngredientRepository.get_ingredient_measure_types_or_404()
    if len(measures) == 0:
        abort(404, description="No measure types found")
    return jsonify(measures), 200

@ingredients_bp.route('/storage-methods/', methods=['GET'])
def get_storage_methods():
    storage_types = IngredientRepository.get_ingredient_storage_types_or_404()
    if len(storage_types) == 0:
        abort(404, description="No storage types found")
    return jsonify(storage_types), 200

@ingredients_bp.route('/new/', methods=['POST'])
def add_ingredient():
    data = request.get_json()
    ingredient = IngredientRepository.insert_ingredient(data)
    return jsonify(ingredient.to_dict()), 201
