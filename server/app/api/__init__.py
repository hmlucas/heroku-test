from .employees import employees_bp
from .options import options_bp
from .orders import orders_bp
from .menu_items import menu_items_bp
from .ingredients import ingredients_bp

def register_blueprints(app):
    app.register_blueprint(employees_bp, url_prefix='/api/employees')
    app.register_blueprint(orders_bp, url_prefix='/api/orders') 
    app.register_blueprint(options_bp, url_prefix='/api/options') 
    app.register_blueprint(menu_items_bp, url_prefix='/api/menu_items') 
    app.register_blueprint(ingredients_bp, url_prefix='/api/ingredients') 