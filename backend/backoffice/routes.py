import flask

from backoffice import base

backoffice = flask.Blueprint("backoffice", __name__)


@backoffice.route("/health_check/")
def health_check():
    settings_set = all(
        key is not None
        for key in {
            "SECRET_KEY",
            "SQLALCHEMY_DATABASE_URI",
            "PUSHER_APP_ID",
            "PUSHER_KEY",
            "PUSHER_SECRET",
            "PUSHER_CLUSTER",
        }
    )

    return flask.jsonify(
        {
            "settings": ("Ok" if settings_set else "Not Ok"),
            "environment": flask.current_app.config["ENV"],
            "db": (
                "Ok"
                if [r for r in base.db.engine.execute("SELECT 1")][0][0]
                else "Not Ok"
            ),
        }
    )


@backoffice.route("/")
@backoffice.route("/<path:_>/")
def frontend(_=None):
    return flask.render_template("index.html")


def init_app(app):
    app.register_blueprint(backoffice, url_prefix="")
