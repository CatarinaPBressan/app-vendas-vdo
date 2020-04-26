import pytest

from backoffice import create_app, models, base


@pytest.fixture()
def app():
    _app = create_app({"FLASK_ENV": "test"})
    with _app.app_context():
        base.db.create_all()

    yield _app

    with _app.app_context():
        base.db.session.remove()
        base.db.drop_all()


@pytest.fixture()
def usuario():
    _usuario = models.Usuario(
        username="fulano.tal",
        cpf="111.111.111-01",
        password="1234",
        nome="Fulano de Tal",
        permissoes=[models.Permissao("backoffice"), models.Permissao("admin")],
    )
    models.db.session.add(_usuario)
    models.db.session.commit()

    return _usuario
