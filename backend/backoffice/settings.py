import os
import functools


class ConfigBase(object):
    SECRET_KEY = os.environ.get("SECRET_KEY")
    S3_STATIC_PATH = "https://vdo-app-vendas-static-assets.s3-sa-east-1.amazonaws.com/{env}/frontend/static/{filename}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI")
    SENTRY_DSN = "https://638596af405c446d8dc85769e2b30851@sentry.io/2716856"
    FLASK_ADMIN_SWATCH = "cerulean"
    PUSHER_APP_ID = os.environ.get("PUSHER_APP_ID")
    PUSHER_KEY = os.environ.get("PUSHER_KEY")
    PUSHER_SECRET = os.environ.get("PUSHER_SECRET")
    PUSHER_CLUSTER = os.environ.get("PUSHER_CLUSTER")


class ConfigDev(ConfigBase):
    SECRET_KEY = "super-secret"
    S3_STATIC_PATH = functools.partial(ConfigBase.S3_STATIC_PATH.format, env="staging")
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:@db/app_vendas"
    SENTRY_DSN = None


class ConfigStaging(ConfigBase):
    S3_STATIC_PATH = functools.partial(ConfigBase.S3_STATIC_PATH.format, env="staging")


def init_app(app, extra_config=None):
    config = {"development": ConfigDev, "staging": ConfigStaging}.get(
        os.environ.get("FLASK_ENV"), ConfigBase
    )
    app.config.from_object(config)

    if extra_config:
        app.config.update(extra_config)
