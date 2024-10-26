from ..models.options import Options
from .search_repository import SearchUtils
from ..extensions import db
from sqlalchemy import select, update
from flask import abort

class OptionRepository:
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

    # get all of certain category
    @staticmethod
    def get_option_exact_search_or_404(search): 
        return SearchUtils.get_exact_search_or_404(db.session, Options, search, "category")