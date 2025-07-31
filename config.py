import os
from pathlib import Path

# Get absolute path to this file
basedir = Path(__file__).parent.absolute()

class Config:
    # SQLite configuration (using pathlib for cross-platform paths)
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{basedir / 'ecommerce.db'}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True  # Log SQL queries (helpful for debugging)