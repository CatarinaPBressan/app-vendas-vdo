from flask_httpauth import HTTPTokenAuth
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from pusher import Pusher

db = SQLAlchemy()
token_auth = HTTPTokenAuth("Bearer")


class PusherClient:
    def __init__(self):
        self.client = None

    def init_app(self, app):
        self.client = Pusher(
            app_id=app.config["PUSHER_APP_ID"],
            key=app.config["PUSHER_KEY"],
            secret=app.config["PUSHER_SECRET"],
            cluster=app.config["PUSHER_CLUSTER"],
        )

    def trigger(self, *args, **kwargs):
        self.client.trigger(*args, **kwargs)


pusher_client = PusherClient()


def init_app(app):
    db.init_app(app)
    Migrate(app, db)
    if app.config.get("PUSHER_APP_ID"):
        pusher_client.init_app(app)
