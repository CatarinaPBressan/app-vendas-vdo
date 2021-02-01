from unittest import mock

import pytest

import werkzeug
from flask import url_for

from backoffice.models import (
    db,
    Usuario,
    Pedido,
    PedidoProduto,
    Permissao,
)
from backoffice.models.pedidos import ESTADOS, TRANSICOES

from backoffice.tests.api.v0 import APIV0TestClient


def _create_pedido(
    usuario: Usuario = None, status: ESTADOS = ESTADOS.NOVO, dados_produto: dict = None
):
    if not usuario:
        usuario = Usuario(cpf="789.123.456-79", nome="Fulano de Tal")

    default_produto = {
        "cep": "12240-310",
        "uf": "SP",
        "cidade": "SJC",
        "logradouro": "Rua Presidente Epitácio",
        "endereco_numero": "97",
        "complemento": "casa",
        "nome_mae": "Nome mae",
        "estado_civil": "solteiro",
        "ocupacao": "assalariado",
        "data_vencimento": "dia_10",
    }

    if not dados_produto:
        dados_produto = default_produto

    pedido_produto = PedidoProduto(dados_produto=dados_produto)
    pedido = Pedido(
        usuario=usuario,
        produto=pedido_produto,
        produto_slug="cartao-de-credito",
        nome_completo="Arthur Bressan",
        cpf="123.567.890-10",
        email="eu@arthurbressan.org",
        telefone_celular="(12)99123-2413",
        observacoes="Obs.",
        status=status.value,
    )
    db.session.add(pedido)
    db.session.commit()

    return pedido


class TestPedidosAPIGet(APIV0TestClient):
    endpoint = "pedidosapi"

    def test_pedidos_do_usuario(self, client):
        usuario = Usuario()
        for _ in range(5):
            _create_pedido(usuario)

        response = self.get(client, usuario)

        assert response.status_code == 200
        assert "pedidos" in response.json
        pedidos = response.json["pedidos"]
        assert len(pedidos) == 5
        for pedido in pedidos:
            assert (
                pedido["usuario"]["eid"] == usuario.eid
            ), "Deve mostrar todos os pedidos do usuário"

    def test_pedidos_de_outros_usuarios(self, client):
        u1 = Usuario()
        u2 = Usuario()
        for _ in range(5):
            _create_pedido(u1)
        for _ in range(5):
            _create_pedido(u2)

        response = self.get(client, u1)

        assert response.status_code == 200
        assert "pedidos" in response.json
        pedidos = response.json["pedidos"]
        assert len(pedidos) == 5
        for pedido in pedidos:
            assert (
                pedido["usuario"]["eid"] == u1.eid
            ), "Deve mostrar somente pedidos do usuário"

    def test_pedidos_usuario_backoffice(self, client):
        u1 = Usuario()
        u2 = Usuario()
        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        for _ in range(5):
            _create_pedido(u1)
        for _ in range(5):
            _create_pedido(u2)
        for _ in range(5):
            _create_pedido(backoffice)

        response = self.get(client, backoffice)

        assert response.status_code == 200
        assert "pedidos" in response.json
        pedidos = response.json["pedidos"]
        assert len(pedidos) == 15
        usuarios_eids = {pedido["usuario"]["eid"] for pedido in pedidos}
        assert len(usuarios_eids) == 3
        assert u1.eid in usuarios_eids
        assert u2.eid in usuarios_eids
        assert backoffice.eid in usuarios_eids


class TestPedidosAPIPost(APIV0TestClient):
    endpoint = "pedidosapi"

    def test_create_pedido(self, client):
        pedido = {
            "produto": {
                "cep": "12240-310",
                "uf": "SP",
                "cidade": "SJC",
                "logradouro": "Rua Presidente Epitácio",
                "endereco_numero": "97",
                "complemento": "casa",
                "nome_mae": "Nome mae",
                "estado_civil": "solteiro",
                "ocupacao": "assalariado",
                "data_vencimento": "dia_10",
            },
            "produto_slug": "cartao-de-credito",
            "nome_completo": "Arthur Bressan",
            "cpf": "123.567.890-10",
            "email": "eu@arthurbressan.org",
            "telefone_celular": "(12)99123-2413",
            "observacoes": "Obs.",
        }

        usuario = Usuario()
        db.session.add(usuario)
        db.session.commit()

        with mock.patch(
            "backoffice.api.v0.pedidos.pusher_client.trigger"
        ) as trigger_mock:
            response = self.post(client, usuario, json=pedido)

            assert response.status_code == 201
            pedido = Pedido.query.first()
            assert pedido.usuario == usuario
            assert response.json == {
                "pedido": {
                    "eid": pedido.eid,
                    "produto_slug": "cartao-de-credito",
                    "status": "novo",
                    "nome_completo": "Arthur Bressan",
                    "cpf": "123.567.890-10",
                    "email": "eu@arthurbressan.org",
                    "telefone_celular": "(12)99123-2413",
                    "observacoes": "Obs.",
                    "produto": {
                        "cep": "12240-310",
                        "uf": "SP",
                        "cidade": "SJC",
                        "logradouro": "Rua Presidente Epitácio",
                        "endereco_numero": "97",
                        "complemento": "casa",
                        "nome_mae": "Nome mae",
                        "estado_civil": "solteiro",
                        "ocupacao": "assalariado",
                        "data_vencimento": "dia_10",
                    },
                    "created_at": pedido.created_at.isoformat(),
                    "updated_at": pedido.updated_at.isoformat(),
                    "usuario": {
                        "eid": usuario.eid,
                        "cpf": None,
                        "nome": None,
                        "permissoes": [],
                    },
                }
            }

            trigger_mock.assert_called_once_with(
                "pedidos",
                "novo-pedido",
                {
                    "pedido": {
                        "eid": pedido.eid,
                        "produto_slug": "cartao-de-credito",
                        "status": "novo",
                        "nome_completo": "Arthur Bressan",
                        "cpf": "123.567.890-10",
                        "email": "eu@arthurbressan.org",
                        "telefone_celular": "(12)99123-2413",
                        "observacoes": "Obs.",
                        "created_at": pedido.created_at.isoformat(),
                        "updated_at": pedido.updated_at.isoformat(),
                        "usuario": {
                            "eid": usuario.eid,
                            "cpf": None,
                            "nome": None,
                            "permissoes": [],
                        },
                    }
                },
            )

    def test_create_pedido_com_arquivo(self, client, app):
        pedido = {
            "produto": {
                "data": "XYZ",
                "arquivo__file__": {"nome_arquivo": "nome_arquivo.txt",},
            },
            "produto_slug": "cartao-de-credito",
            "nome_completo": "Arthur Bressan",
            "cpf": "123.567.890-10",
            "email": "eu@arthurbressan.org",
            "telefone_celular": "(12)99123-2413",
            "observacoes": "Obs.",
        }

        usuario = Usuario()
        db.session.add(usuario)
        db.session.commit()

        response = self.post(client, usuario, json=pedido)

        assert response.status_code == 201
        pedido = Pedido.query.first()
        assert pedido.usuario == usuario
        assert response.json == {
            "pedido": {
                "eid": pedido.eid,
                "produto_slug": "cartao-de-credito",
                "status": "novo",
                "nome_completo": "Arthur Bressan",
                "cpf": "123.567.890-10",
                "email": "eu@arthurbressan.org",
                "telefone_celular": "(12)99123-2413",
                "observacoes": "Obs.",
                "produto": {
                    "data": "XYZ",
                    "arquivo": {
                        "nome_arquivo": "nome_arquivo.txt",
                        "url": url_for(
                            "api_v0.uploadarquivoprodutoapi",
                            pedido_eid=pedido.eid,
                            produto_key="arquivo",
                            nome_arquivo="nome_arquivo.txt",
                            _external=True,
                        ),
                    },
                },
                "created_at": pedido.created_at.isoformat(),
                "updated_at": pedido.updated_at.isoformat(),
                "usuario": {
                    "eid": usuario.eid,
                    "cpf": None,
                    "nome": None,
                    "permissoes": [],
                },
            }
        }

        db.session.refresh(pedido)
        assert pedido.produto.dados_produto == {
            "data": "XYZ",
            "arquivo": {
                "nome_arquivo": "nome_arquivo.txt",
                "url": url_for(
                    "api_v0.uploadarquivoprodutoapi",
                    pedido_eid=pedido.eid,
                    produto_key="arquivo",
                    nome_arquivo="nome_arquivo.txt",
                    _external=True,
                ),
            },
        }


class TestPedidoAPIGet(APIV0TestClient):
    endpoint = "pedidoapi"

    def test_get_pedido(self, client):
        pedido = _create_pedido()
        usuario = pedido.usuario

        response = self.get(client, usuario, pedido_eid=pedido.eid)
        assert response.status_code == 200
        assert response.json == {
            "pedido": {
                "eid": pedido.eid,
                "produto_slug": "cartao-de-credito",
                "nome_completo": "Arthur Bressan",
                "cpf": "123.567.890-10",
                "email": "eu@arthurbressan.org",
                "telefone_celular": "(12)99123-2413",
                "observacoes": "Obs.",
                "produto": {
                    "cep": "12240-310",
                    "uf": "SP",
                    "cidade": "SJC",
                    "logradouro": "Rua Presidente Epitácio",
                    "endereco_numero": "97",
                    "complemento": "casa",
                    "nome_mae": "Nome mae",
                    "estado_civil": "solteiro",
                    "ocupacao": "assalariado",
                    "data_vencimento": "dia_10",
                },
                "created_at": pedido.created_at.isoformat(),
                "updated_at": pedido.updated_at.isoformat(),
                "status": "novo",
                "usuario": {
                    "eid": usuario.eid,
                    "cpf": "789.123.456-79",
                    "nome": "Fulano de Tal",
                    "permissoes": [],
                },
            }
        }

    def test_get_pedido_outro_usuario(self, client):
        pedido = _create_pedido()

        outro_usuario = Usuario()
        db.session.add(outro_usuario)
        db.session.commit()

        response = self.get(client, outro_usuario, pedido_eid=pedido.eid)

        assert response.status_code == 403
        assert response.json == {"message": "Pedido de outro usuário"}

    def test_get_pedido_usuario_backoffice(self, client):
        pedido = _create_pedido()

        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        response = self.get(client, backoffice, pedido_eid=pedido.eid)

        assert response.status_code == 200
        assert pedido.eid == response.json["pedido"]["eid"]
        assert pedido.usuario.eid == response.json["pedido"]["usuario"]["eid"]

    def test_get_pedido_nao_existe(self, client):
        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        response = self.get(client, backoffice, pedido_eid="zzz")

        assert response.status_code == 404


class TestPedidoAPIPatch(APIV0TestClient):
    endpoint = "pedidoapi"

    @pytest.mark.parametrize(
        "transicao,status_inicial,status_final",
        [
            (TRANSICOES.INICIAR, ESTADOS.NOVO, ESTADOS.ANALISE_CREDITO,),
            (TRANSICOES.APROVAR, ESTADOS.ANALISE_CREDITO, ESTADOS.EM_ANDAMENTO,),
            (TRANSICOES.COMPLETAR, ESTADOS.EM_ANDAMENTO, ESTADOS.COMPLETO,),
            (TRANSICOES.REPROVAR, ESTADOS.ANALISE_CREDITO, ESTADOS.REPROVADO,),
        ],
    )
    def test_patch_pedidos_transicoes(
        self, client, transicao, status_inicial, status_final
    ):
        pedido = _create_pedido(status=status_inicial)

        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        response = self.patch(
            client, backoffice, pedido_eid=pedido.eid, json={"transicao": transicao}
        )

        assert response.status_code == 200
        assert response.json == {
            "pedido": {
                "eid": pedido.eid,
                "produto_slug": "cartao-de-credito",
                "nome_completo": "Arthur Bressan",
                "cpf": "123.567.890-10",
                "email": "eu@arthurbressan.org",
                "telefone_celular": "(12)99123-2413",
                "observacoes": "Obs.",
                "produto": {
                    "cep": "12240-310",
                    "uf": "SP",
                    "cidade": "SJC",
                    "logradouro": "Rua Presidente Epitácio",
                    "endereco_numero": "97",
                    "complemento": "casa",
                    "nome_mae": "Nome mae",
                    "estado_civil": "solteiro",
                    "ocupacao": "assalariado",
                    "data_vencimento": "dia_10",
                },
                "created_at": pedido.created_at.isoformat(),
                "updated_at": pedido.updated_at.isoformat(),
                "status": status_final.value,
                "usuario": {
                    "eid": pedido.usuario.eid,
                    "cpf": "789.123.456-79",
                    "nome": "Fulano de Tal",
                    "permissoes": [],
                },
            }
        }

    def test_patch_pedidos_transicoes_nao_permitidas(self, client):
        pedido = _create_pedido()

        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        response = self.patch(
            client, backoffice, pedido_eid=pedido.eid, json={"transicao": "blah"}
        )

        assert response.status_code == 400
        assert "message" in response.json
        assert "transicao" in response.json["message"]
        message = response.json["message"]["transicao"][0]
        for transicao in TRANSICOES:
            assert transicao.value in message

    def test_patch_pedidos_usuario_nao_permitido(self, client):
        pedido = _create_pedido()
        usuario = pedido.usuario

        response = self.patch(
            client, usuario, pedido_eid=pedido.eid, json={"transicao": "iniciar"}
        )

        assert response.status_code == 403

    def test_patch_pedidos_transicao_errada(self, client):
        pedido = _create_pedido()

        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        response = self.patch(
            client, backoffice, pedido_eid=pedido.eid, json={"transicao": "completar"}
        )

        assert response.status_code == 400

    @pytest.mark.parametrize(
        "status_inicial",
        [
            ESTADOS.NOVO,
            ESTADOS.CANCELADO,
            ESTADOS.COMPLETO,
            ESTADOS.ANALISE_CREDITO,
            ESTADOS.REPROVADO,
            ESTADOS.EM_ANDAMENTO,
        ],
    )
    def test_patch_pedidos_cancelamento(self, client, status_inicial):
        pedido = _create_pedido(status=status_inicial)

        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        response = self.patch(
            client, backoffice, pedido_eid=pedido.eid, json={"transicao": "cancelar"}
        )

        assert response.status_code == 200
        assert response.json == {
            "pedido": {
                "eid": pedido.eid,
                "produto_slug": "cartao-de-credito",
                "nome_completo": "Arthur Bressan",
                "cpf": "123.567.890-10",
                "email": "eu@arthurbressan.org",
                "telefone_celular": "(12)99123-2413",
                "observacoes": "Obs.",
                "produto": {
                    "cep": "12240-310",
                    "uf": "SP",
                    "cidade": "SJC",
                    "logradouro": "Rua Presidente Epitácio",
                    "endereco_numero": "97",
                    "complemento": "casa",
                    "nome_mae": "Nome mae",
                    "estado_civil": "solteiro",
                    "ocupacao": "assalariado",
                    "data_vencimento": "dia_10",
                },
                "created_at": pedido.created_at.isoformat(),
                "updated_at": pedido.updated_at.isoformat(),
                "status": ESTADOS.CANCELADO.value,
                "usuario": {
                    "eid": pedido.usuario.eid,
                    "cpf": "789.123.456-79",
                    "nome": "Fulano de Tal",
                    "permissoes": [],
                },
            }
        }

    def test_patch_pedido_nao_existe(self, client):
        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        response = self.patch(
            client, backoffice, pedido_eid="zzz", json={"transicao": "completar"}
        )

        assert response.status_code == 404


class TestArquivoProdutoAPIGet(APIV0TestClient):
    endpoint = "downloadarquivoprodutoapi"

    nome_arquivo = "nome_arquivo.txt"
    produto_key = "produto_key"

    def _create_pedido(self):
        return _create_pedido(
            dados_produto={self.produto_key: {"nome_arquivo": self.nome_arquivo}}
        )

    def get(self, client, usuario: Usuario, **kwargs):
        return client.get(
            url_for(
                f"api_v0.{self.endpoint}",
                token=usuario.generate_auth_token(),
                _external=True,
                **kwargs,
            )
        )

    def test_get_arquivo(self, client, app):
        pedido = self._create_pedido()
        usuario = pedido.usuario

        with mock.patch("flask.send_from_directory") as send_mock:
            send_mock.return_value = b"123"

            response = self.get(
                client,
                usuario,
                pedido_eid=pedido.eid,
                produto_key=self.produto_key,
                nome_arquivo=self.nome_arquivo,
            )

            assert response.status_code == 200

            send_mock.assert_called_with(
                f"{app.instance_path}/pedidos/{pedido.eid}/{self.produto_key}",
                self.nome_arquivo,
                as_attachment=True,
            )

    def test_get_pedido_outro_usuario(self, client, app):
        pedido = self._create_pedido()

        outro_usuario = Usuario()
        db.session.add(outro_usuario)
        db.session.commit()

        response = self.get(
            client,
            outro_usuario,
            pedido_eid=pedido.eid,
            produto_key=self.produto_key,
            nome_arquivo=self.nome_arquivo,
        )

        assert response.status_code == 403

    def test_get_pedido_usuario_backoffice(self, client, app):
        pedido = self._create_pedido()

        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        with mock.patch("flask.send_from_directory") as send_mock:
            send_mock.return_value = b"123"

            response = self.get(
                client,
                backoffice,
                pedido_eid=pedido.eid,
                produto_key=self.produto_key,
                nome_arquivo=self.nome_arquivo,
            )

            assert response.status_code == 200

            send_mock.assert_called_with(
                f"{app.instance_path}/pedidos/{pedido.eid}/{self.produto_key}",
                self.nome_arquivo,
                as_attachment=True,
            )

    def test_get_pedido_nao_existe(self, client):
        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        response = self.get(
            client,
            backoffice,
            pedido_eid="zzz",
            produto_key=self.produto_key,
            nome_arquivo=self.nome_arquivo,
        )

        assert response.status_code == 404

    def test_get_arquivo_nao_existe(self, client, app):
        # Caso pode acontecer quando o arquivo não foi upado
        pedido = self._create_pedido()
        usuario = pedido.usuario

        with mock.patch("flask.send_from_directory") as send_mock:
            send_mock.side_effect = werkzeug.exceptions.NotFound()

            response = self.get(
                client,
                usuario,
                pedido_eid=pedido.eid,
                produto_key=self.produto_key,
                nome_arquivo=self.nome_arquivo,
            )

            send_mock.assert_called_with(
                f"{app.instance_path}/pedidos/{pedido.eid}/{self.produto_key}",
                self.nome_arquivo,
                as_attachment=True,
            )

            assert response.status_code == 404

    def test_get_arquivo_key_errada(self, client):
        pedido = self._create_pedido()
        usuario = pedido.usuario

        with mock.patch("flask.send_from_directory") as send_mock:
            response = self.get(
                client,
                usuario,
                pedido_eid=pedido.eid,
                produto_key="key_errada",
                nome_arquivo=self.nome_arquivo,
            )

            send_mock.assert_not_called()

            assert response.status_code == 400

    def test_get_arquivo_nome_arquivo_errado(self, client):
        pedido = self._create_pedido()
        usuario = pedido.usuario

        pedido.produto.dados_produto[self.produto_key] = {
            "nome_arquivo": self.nome_arquivo
        }

        with mock.patch("flask.send_from_directory") as send_mock:
            response = self.get(
                client,
                usuario,
                pedido_eid=pedido.eid,
                produto_key=self.produto_key,
                nome_arquivo="nome_arquivo_errado",
            )

            send_mock.assert_not_called()

            assert response.status_code == 400


class TestArquivoProdutoAPIPost(APIV0TestClient):
    endpoint = "uploadarquivoprodutoapi"

    nome_arquivo = "nome_arquivo.txt"
    produto_key = "produto_key"

    def _create_pedido(self):
        return _create_pedido(
            dados_produto={self.produto_key: {"nome_arquivo": self.nome_arquivo}}
        )

    def test_post_arquivo(self, client, app):
        pedido = self._create_pedido()
        usuario = pedido.usuario

        with mock.patch("werkzeug.datastructures.FileStorage.save") as save_mock:
            response = self.send_file(
                client,
                usuario,
                pedido_eid=pedido.eid,
                produto_key=self.produto_key,
                nome_arquivo=self.nome_arquivo,
            )

            assert response.status_code == 201
            save_mock.assert_called_once_with(
                f"{app.instance_path}/pedidos/{pedido.eid}/{self.produto_key}/{self.nome_arquivo}"
            )

    def test_post_pedido_outro_usuario(self, client, app):
        pedido = self._create_pedido()

        outro_usuario = Usuario()
        db.session.add(outro_usuario)
        db.session.commit()

        response = self.send_file(
            client,
            outro_usuario,
            pedido_eid=pedido.eid,
            produto_key=self.produto_key,
            nome_arquivo=self.nome_arquivo,
        )

        assert response.status_code == 403

    def test_post_pedido_usuario_backoffice(self, client, app):
        pedido = self._create_pedido()
        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        with mock.patch("werkzeug.datastructures.FileStorage.save") as save_mock:
            response = self.send_file(
                client,
                backoffice,
                pedido_eid=pedido.eid,
                produto_key=self.produto_key,
                nome_arquivo=self.nome_arquivo,
            )

            assert response.status_code == 201
            save_mock.assert_called_once_with(
                f"{app.instance_path}/pedidos/{pedido.eid}/{self.produto_key}/{self.nome_arquivo}"
            )

    def test_post_pedido_nao_existe(self, client):
        backoffice = Usuario(permissoes=[Permissao("backoffice")])
        db.session.add(backoffice)
        db.session.commit()

        response = self.send_file(
            client,
            backoffice,
            pedido_eid="zzz",
            produto_key=self.produto_key,
            nome_arquivo=self.nome_arquivo,
        )

        assert response.status_code == 404

    def test_post_arquivo_ja_existe(self, client, app):
        pedido = self._create_pedido()
        usuario = pedido.usuario

        with mock.patch(
            "werkzeug.datastructures.FileStorage.save"
        ) as save_mock, mock.patch("os.path.exists", return_value=True):
            response = self.send_file(
                client,
                usuario,
                pedido_eid=pedido.eid,
                produto_key=self.produto_key,
                nome_arquivo=self.nome_arquivo,
            )

            save_mock.assert_not_called()
            assert response.status_code == 409

    def test_post_arquivo_key_errada(self, client):
        pedido = self._create_pedido()
        usuario = pedido.usuario

        with mock.patch("werkzeug.datastructures.FileStorage.save") as save_mock:
            response = self.send_file(
                client,
                usuario,
                pedido_eid=pedido.eid,
                produto_key="xxx",
                nome_arquivo=self.nome_arquivo,
            )

            save_mock.assert_not_called()
            assert response.status_code == 400

    def test_post_arquivo_nome_arquivo_errado(self, client):
        pedido = self._create_pedido()
        usuario = pedido.usuario

        pedido.produto.dados_produto[self.produto_key] = {
            "nome_arquivo": self.nome_arquivo
        }

        with mock.patch("werkzeug.datastructures.FileStorage.save") as save_mock:
            response = self.send_file(
                client,
                usuario,
                pedido_eid=pedido.eid,
                produto_key=self.produto_key,
                nome_arquivo="xxx",
            )

            save_mock.assert_not_called()
            assert response.status_code == 400
