import flask

bp = flask.Blueprint("backoffice", __name__)


@bp.route("/health_check/")
def health_check():
    settings = {
        key: ("Set" if flask.current_app.config.get(key) is not None else "Not set")
        for key in {
            "SECRET_KEY",
            "SQLALCHEMY_DATABASE_URI",
            "PUSHER_APP_ID",
            "PUSHER_KEY",
            "PUSHER_SECRET",
            "PUSHER_CLUSTER",
        }
    }
    return flask.jsonify(
        {
            "status": (
                "OK"
                if all({value == "Set" for value in settings.values()})
                else "Not Ok"
            ),
            "environment": flask.current_app.config["ENV"],
            "settings": settings,
        }
    )


@bp.route("/")
@bp.route("/<path:_>/")
def frontend(_=None):
    return flask.render_template("index.html")


def init_app(app):
    app.register_blueprint(bp, url_prefix="")
