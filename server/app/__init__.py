from flask import Flask
from config import Config
from .extensions import db, cors
from .api import register_blueprints

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions with the app
    db.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # Register blueprints
    register_blueprints(app)

    return app