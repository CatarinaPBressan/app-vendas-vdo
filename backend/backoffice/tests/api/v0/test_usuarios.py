import flask

from backoffice.tests.api import v0


class TestLoginAPIGet(v0.APIV0TestClient):

    endpoint = "loginapi"

    def test_get_usuario(self, client, usuario):
        response = self.get(client, usuario)

        assert response.status_code == 200
        assert response.json == {
            "usuario": {
                "eid": usuario.eid,
                "cpf": "111.111.111-01",
                "nome": "Fulano de Tal",
                "token": response.json["usuario"]["token"],  # ¯\_(ツ)_/¯
                "permissoes": ["backoffice", "admin"],
                "pusher_key": "PUSHER_KEY",
                "pusher_cluster": "PUSHER_CLUSTER",
            }
        }

    def test_get_usuario_token_errado(self, client, usuario):
        assert usuario

        url = flask.url_for(f"api_v0.{self.endpoint}", _external=True)

        response = client.get(url, headers=[("Authorization", f"Bearer xxx")])

        assert response.status_code == 401

    def test_get_usuario_authorization_header_nao_passado(self, client, usuario):
        assert usuario

        url = flask.url_for(f"api_v0.{self.endpoint}", _external=True)

        response = client.get(url)

        assert response.status_code == 401


class TestLoginAPIPost(v0.APIV0TestClient):

    endpoint = "loginapi"

    def test_login_usuario(self, client, usuario):
        response = self.post(
            client, usuario, json={"username": usuario.username, "password": "1234"},
        )

        assert response.status_code == 200
        assert response.json == {
            "usuario": {
                "eid": usuario.eid,
                "cpf": "111.111.111-01",
                "nome": "Fulano de Tal",
                "token": response.json["usuario"]["token"],  # ¯\_(ツ)_/¯
                "permissoes": ["backoffice", "admin"],
                "pusher_key": "PUSHER_KEY",
                "pusher_cluster": "PUSHER_CLUSTER",
            }
        }

    def test_login_usuario_username_errado(self, client, usuario):
        response = self.post(
            client, usuario, json={"username": "adadadadad", "password": "1234"},
        )

        assert response.status_code == 401

    def test_login_usuario_senha_errada(self, client, usuario):
        response = self.post(
            client, usuario, json={"username": usuario.username, "password": "xxx"},
        )

        assert response.status_code == 401
