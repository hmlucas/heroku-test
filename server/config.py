"""
Loads environment variables to be used my SQLAlchemy.
"""

import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Creates a connection string using environment variables
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql+pg8000://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False