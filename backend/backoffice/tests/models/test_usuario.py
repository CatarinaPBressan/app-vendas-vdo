from backoffice import models


def test_criacao_usuario_seta_senha():
    usuario = models.Usuario(password="123")
    assert usuario.password.startswith("pbkdf2:sha256:")


def test_verify_password():
    usuario = models.Usuario(password="123")
    assert usuario.verify_password("123") is True
    assert usuario.verify_password("XYZ") is False
    assert usuario.verify_password(usuario.password) is False


def test_generate_auth_token(app):
    assert app

    assert isinstance(models.Usuario().generate_auth_token(), str)


def test_get_user_via_token(app):
    assert app

    usuario = models.Usuario()
    models.db.session.add(usuario)
    models.db.session.commit()

    assert models.Usuario.get_user_via_token(usuario.generate_auth_token()) == usuario
    assert models.Usuario.get_user_via_token("xxx") is None, "Bad Signature"
    assert (
        models.Usuario.get_user_via_token(usuario.generate_auth_token(-1)) is None
    ), "Signature Expired"


def test_is_admin():
    admin = models.Usuario(permissoes=[models.Permissao("admin")])
    assert admin.is_admin is True

    not_admin = models.Usuario(permissoes=[])
    assert not_admin.is_admin is False


def test_has_permission():
    usuario = models.Usuario(
        permissoes=[models.Permissao("backoffice"), models.Permissao("admin")]
    )
    assert usuario.has_permission("admin") is True
    assert usuario.has_permission("backoffice") is True
    assert usuario.has_permission("xxxx") is False


def test_pusher_key_cluster(app):
    usuario = models.Usuario()

    assert usuario.pusher_key == app.config["PUSHER_KEY"]
    assert usuario.pusher_cluster == app.config["PUSHER_CLUSTER"]
