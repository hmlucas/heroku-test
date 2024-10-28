from flask import Blueprint, jsonify, request, abort
from ..repos.option_repository import OptionRepository

options_bp = Blueprint('options_bp', __name__)

def fetch_options(search_terms):
    if not search_terms:
        return OptionRepository.get_all_options() # return all options if there was no category
    return OptionRepository.get_option_exact_search_or_404(search_terms)

@options_bp.route('/', methods=['GET'])
def get_options():
    #check if GET is requesting a search
    search_terms = request.args.get('category')
    options = fetch_options(search_terms)
    
    #no options to return
    if len(options) == 0:
        abort(404, description="Options not found")
        
    return jsonify([option.to_dict() for option in options]), 200