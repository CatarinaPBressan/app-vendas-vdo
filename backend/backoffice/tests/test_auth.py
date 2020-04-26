import flask

from backoffice import auth


class TestTokenAuthVerifyToken:
    def test_verify_token(self, client, usuario):
        assert client, "Precisa do contexto da aplicação"

        token = usuario.generate_auth_token()
        assert auth.verify_token(token)

        assert flask.g.usuario
        assert flask.g.usuario.token == token

    def test_verify_token_failed(self, client):
        assert client, "Precisa do contexto da aplicação"

        assert auth.verify_token("xxxxx") is False


class TestLoginManagerUserLoader:
    def test_user_loader(self, client, usuario):
        assert client, "Precisa do contexto da aplicação"

        assert auth.user_loader(usuario.id) == usuario

    def test_user_loader_not_existing_id(self, client):
        assert client, "Precisa do contexto da aplicação"

        assert auth.user_loader(12345) is None
