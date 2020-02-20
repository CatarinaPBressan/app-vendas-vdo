from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth("Bearer")


def init_app(app):
    db.init_app(app)
    Migrate(app, db)
