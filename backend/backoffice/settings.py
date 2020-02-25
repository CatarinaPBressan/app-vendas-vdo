import os


class ConfigBase(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "super-secret"
    PROMOTORES_S3_STATIC_PATH = None
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///app_vendas.sqlite"
    SENTRY_DSN = os.environ.get("SENTRY_DSN")
    FLASK_ADMIN_SWATCH = "cerulean"
    PUSHER_APP_ID = os.environ.get("PUSHER_APP_ID")
    PUSHER_KEY = os.environ.get("PUSHER_KEY")
    PUSHER_SECRET = os.environ.get("PUSHER_SECRET")
    PUSHER_CLUSTER = os.environ.get("PUSHER_CLUSTER")


class ConfigDev(ConfigBase):
    SQLALCHEMY_DATABASE_URI = "postgres://db/app_vendas"
    SENTRY_DSN = None


def init_app(app, extra_config=None):
    config = {"development": ConfigDev}[os.environ["FLASK_ENV"]]
    app.config.from_object(config)

    if extra_config:
        app.config.update(extra_config)
