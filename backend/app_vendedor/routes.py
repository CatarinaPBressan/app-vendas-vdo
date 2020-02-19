from flask import Blueprint, render_template

bp = Blueprint('app_vendedor', __name__)


@bp.route('/promotores/<path:_>')
def promotores(_=None):
    return render_template('index_promotores.html')


@bp.route('/hello_world/')
def hello_world():
    return 'Hello World!'


def init_app(app):
    app.register_blueprint(bp, url_prefix='')
