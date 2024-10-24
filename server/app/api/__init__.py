from .employees import employees_bp

def register_blueprints(app):
    app.register_blueprint(employees_bp, url_prefix='/api/employees')