from ..models import Employee, Ingredient, MenuItem, Order
from ..extensions import db
from sqlalchemy import distinct, select, update, and_, or_
from sqlalchemy.orm import Session
from flask import abort

class SearchUtils:
    
    @staticmethod
    def get_search_or_404(session: Session, cls, search, id_field = None, *search_fields):
        #! This cannot search for other numbers other than ID but it shouldnt need to as we can use other fields for that. This is primarily for text fields
        """Search for records in a specified class based on given search terms.
        
        Args:
            session (Session): SQLAlchemy session for executing queries.
            cls (type): The class/model to search within.
            search (str): The search string full of terms.
            id_field (str): The attribute to filter by ID (e.g., 'employee_id' or 'order_id').
            *search_fields (str): Variable number of field names to search against.
        
        Returns:
            results: The list of matched objects.
        
        Raises:
            TypeError: If cls is not a valid SQLAlchemy model class.
            AttributeError: If id_field or any search_field is not an attribute of cls.
            404 error if no records match the search criteria.
        """
        # make sure that there are valid attirbutes and class
        if not hasattr(cls, '__table__'):
            raise TypeError(f"{cls} is not a valid SQLAlchemy model class.")
        if id_field and not hasattr(cls, id_field):
            raise AttributeError(f"{id_field} is not a valid attribute of {cls.__name__}.")
        for field in search_fields:
            if not hasattr(cls, field):
                raise AttributeError(f"{field} is not a valid attribute of {cls.__name__}.")
            
        # clean and split search terms of spaces #TODO Verify there is no problem or any field that might contain %20 for any reason
        search = search.replace("%20", " ")
        terms = search.strip().split()
        
        # build the query using each term
        stmt = select(cls)
        conditions = []
        
        for term in terms:
            
            term = str(term) # needed to search with other search fields
            
            if id_field is not None:
                try: #search by id
                    search_int = int(term)
                    conditions.append(getattr(cls, id_field) == search_int)
                    continue 
                except ValueError:
                    pass 
            
            field_conditions = [getattr(cls, field).ilike(f"%{term}%") for field in search_fields]
            conditions.append(or_(*field_conditions))
        
        # add conditions to the query
        if conditions:
            stmt = stmt.where(and_(*conditions))
        
        # execute the query
        results = session.execute(stmt).scalars().all()
        
        # nothing found
        if not results:
            abort(404, description=f"{cls.__name__} not found")
        
        return results
    
    @staticmethod
    def get_exact_search_or_404(session: Session, cls, search, field):
        """Search for a record in a specified class based on a given search term in a single field. Used for Dropdowns and the like
        
        Args:
            session (Session): SQLAlchemy session for executing queries.
            cls (type): The class/model to search within.
            search (str): The exact search term to match.
            field (str): The attribute to filter by (e.g., 'employee_id' or 'ingredient_name').
        
        Returns:
            results: The matched object.
        
        Raises:
            TypeError: If cls is not a valid SQLAlchemy model class.
            AttributeError: If field is not an attribute of cls.
            404 error if no record matches the search criteria.
        """
        # validation
        if not hasattr(cls, '__table__'):
            raise TypeError(f"{cls} is not a valid SQLAlchemy model class.")
        if not hasattr(cls, field):
            raise AttributeError(f"{field} is not a valid attribute of {cls.__name__}.")
        
        # make sure they match
        stmt = select(cls).where(getattr(cls, field) == search.strip())
        
        # execute
        results = session.execute(stmt).scalars().all()
        
        # nothing found
        if not results:
            abort(404, description=f"{cls.__name__} not found with {field} matching '{search}'.")
        
        return results
    
    @staticmethod
    def get_values_list(session: Session, cls, field):
        """Retrieve unique values for a specified attribute in a given class. Used to display options for dropdowns etc
        
        Args:
            session (Session): SQLAlchemy session for executing queries.
            cls (type): The class/model to search within.
            field (str): The attribute to find unique values for.
        
        Returns:
            values: A list of unique values for the specified attribute.
        
        Raises:
            TypeError: If cls is not a valid SQLAlchemy model class.
            AttributeError: If field is not an attribute of cls.
        """
        # validation
        if not hasattr(cls, '__table__'):
            raise TypeError(f"{cls} is not a valid SQLAlchemy model class.")
        if not hasattr(cls, field):
            raise AttributeError(f"{field} is not a valid attribute of {cls.__name__}.")
        
        # find all the unique vals
        stmt = select(distinct(getattr(cls, field)))
        
        # find all the values
        values = session.execute(stmt).scalars().all()
        
        # Return the unique values as a list
        return list(values)