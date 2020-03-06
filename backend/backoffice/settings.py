import os


class ConfigBase(object):
    SECRET_KEY = os.environ.get("SECRET_KEY")
    S3_STATIC_PATH = "https://app-vendedor-static-assets.s3-sa-east-1.amazonaws.com/staging/frontend/static/{filename}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = (
        os.environ.get("DATABASE_URI") or "sqlite:///backoffice.sqlite"
    )
    SENTRY_DSN = os.environ.get("SENTRY_DSN")
    FLASK_ADMIN_SWATCH = "cerulean"
    PUSHER_APP_ID = os.environ.get("PUSHER_APP_ID")
    PUSHER_KEY = os.environ.get("PUSHER_KEY")
    PUSHER_SECRET = os.environ.get("PUSHER_SECRET")
    PUSHER_CLUSTER = os.environ.get("PUSHER_CLUSTER")


class ConfigDev(ConfigBase):
    SECRET_KEY = "super-secret"
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:@db/app_vendas"
    SENTRY_DSN = None


def init_app(app, extra_config=None):
    config = {"development": ConfigDev}.get(os.environ.get("FLASK_ENV"), ConfigBase)
    app.config.from_object(config)

    if extra_config:
        app.config.update(extra_config)
