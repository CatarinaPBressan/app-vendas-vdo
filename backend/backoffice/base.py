from flask_httpauth import HTTPTokenAuth
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from pusher import Pusher

from backoffice import utils

db = SQLAlchemy()
token_auth = HTTPTokenAuth("Bearer")
login_manager = LoginManager()


class PusherClient:
    class MockClient:
        def trigger(self, *args, **kwargs):
            pass

    def __init__(self):
        self.client = None

    def init_app(self, app):
        if app.config["ENV"] == "test":
            self.client = PusherClient.MockClient()
            return

        self.client = Pusher(
            app_id=app.config["PUSHER_APP_ID"],
            key=app.config["PUSHER_KEY"],
            secret=app.config["PUSHER_SECRET"],
            cluster=app.config["PUSHER_CLUSTER"],
        )

    def trigger(self, *args, **kwargs):
        self.client.trigger(*args, **kwargs)


pusher_client = PusherClient()


class BaseTable(object):
    id = db.Column(db.Integer, primary_key=True)
    eid = db.Column(
        db.String(26), index=True, unique=True, default=utils.create_eid, nullable=False
    )

    created_at = db.Column(db.DateTime, default=utils.datetime_now, nullable=False)
    updated_at = db.Column(
        db.DateTime,
        default=utils.datetime_now,
        onupdate=utils.datetime_now,
        nullable=False,
    )

    def __str__(self):
        return f"<{self.__class__.__name__} - {self.eid}>"


def init_app(app):
    db.init_app(app)
    Migrate(app, db)
    login_manager.init_app(app)
    pusher_client.init_app(app)
