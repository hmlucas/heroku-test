from ..models.options_model import Options
from .search_repository import SearchUtils
from ..extensions import db
from sqlalchemy import select, update
from flask import abort, jsonify

class OptionRepository:
    """returns list of all options"""
    @staticmethod
    def get_all_options():
        # scalars() returns a list of the employee objects (w/o table metadata)
        stmt = select(Options)
        result = (
            db.session.execute(stmt)
            .scalars()
            .all()
            )
        return result 
    #for options table, "option" is the PK
    """retuns a single option matching provided option name"""
    @staticmethod
    def get_option_or_404(option):
        stmt = select(Options).where(Options.option == option)
        result = (
            db.session.execute(stmt)
            .scalar()
        )
        if result is None:
            abort(404, "Option not found")
        return result
    
    """get all options of a certain category"""
    @staticmethod
    def get_option_exact_search_or_404(search): 
        return SearchUtils.get_exact_search_or_404(db.session, Options, search, "category")
    
    """inserts option and returns it if successful"""
    @staticmethod
    def insert_option(data):
        option = Options(
            option = data.get("option"),
            additional_charge = data.get("additional_charge"),
            category = data.get("category"),
            is_seasonal = data.get("is_seasonal")
        )
        try:
            db.session.add(option)
            db.session.commit()
            return option
        except Exception as e:
            db.session.rollback()
            print(e)
            abort(500, description="Failed to add option")
    """helper method for adding menu items, takes list of option names and returns option object list"""
    @staticmethod
    def parse_options(options):
        opt_list = []
        for o in options:
            opt_list.append(OptionRepository.get_option_or_404(o))
        return opt_list