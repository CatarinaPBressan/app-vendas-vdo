from __future__ import annotations

import os
import functools
import subprocess

import flask


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


class ConfigTest(ConfigDev):
    SERVER_NAME = "test.backoffice"
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:@db/app_vendas_test"
    ENV = "test"
    PUSHER_APP_ID = "PUSHER_APP_ID"
    PUSHER_KEY = "PUSHER_KEY"
    PUSHER_SECRET = "PUSHER_SECRET"
    PUSHER_CLUSTER = "PUSHER_CLUSTER"


class ConfigStaging(ConfigBase):
    S3_STATIC_PATH = functools.partial(ConfigBase.S3_STATIC_PATH.format, env="staging")


def init_app(app: flask.Flask, extra_config: dict = None) -> None:
    if extra_config is None:
        extra_config = {}

    flask_env = extra_config.get("FLASK_ENV", os.environ.get("FLASK_ENV"))

    if flask_env is None:
        raise ValueError("FLASK_ENV not found in config.")

    config = {
        "development": ConfigDev,
        "staging": ConfigStaging,
        "test": ConfigTest,
    }.get(flask_env, ConfigBase)

    app.config.from_object(config)
    app.config.update(extra_config)

    configuracao_runtime = {"GIT_COMMIT": _obter_commit_atual()}
    app.config.update(configuracao_runtime)


def _obter_commit_atual() -> str:
    output = subprocess.run(["git", "rev-parse", "HEAD"], capture_output=True)
    return output.stdout.decode("utf-8")[:-1]
