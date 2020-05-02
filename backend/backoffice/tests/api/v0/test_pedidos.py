from unittest import mock

import pytest

from backoffice.models import (
    db,
    Usuario,
    Pedido,
    PedidoProduto,
    EstadoCivil,
    Ocupacao,
    DataVencimento,
    Permissao,
)

from backoffice.models import pedidos

from backoffice.tests.api.v0 import APIV0TestClient


def _create_pedido(usuario=None, status=pedidos.ESTADOS.NOVO):
    if not usuario:
        usuario = Usuario(cpf="477.417.717-10", nome="Fulano de Tal")

    pedido_produto = PedidoProduto(
        cep="12240-310",
        uf="SP",
        cidade="SJC",
        logradouro="Rua Presidente Epitácio",
        endereco_numero="97",
        complemento="casa",
        nome_mae="Izolda",
        estado_civil=EstadoCivil.solteiro,
        ocupacao=Ocupacao.assalariado,
        data_vencimento=DataVencimento.dia_10,
    )
    pedido = Pedido(
        usuario=usuario,
        produto=pedido_produto,
        produto_slug="cartao-de-credito",
        nome_completo="Arthur Bressan",
        cpf="388.308.808-09",
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
                "nome_mae": "Izolda",
                "estado_civil": "solteiro",
                "ocupacao": "assalariado",
                "data_vencimento": "dia_10",
            },
            "produto_slug": "cartao-de-credito",
            "nome_completo": "Arthur Bressan",
            "cpf": "388.308.808-09",
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

            assert response.status_code == 200
            pedido = Pedido.query.first()
            assert pedido.usuario == usuario
            assert response.json == {
                "pedido": {
                    "eid": pedido.eid,
                    "produto_slug": "cartao-de-credito",
                    "status": "novo",
                    "nome_completo": "Arthur Bressan",
                    "cpf": "388.308.808-09",
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
                        "nome_mae": "Izolda",
                        "estado_civil": str(EstadoCivil.solteiro),
                        "ocupacao": str(Ocupacao.assalariado),
                        "data_vencimento": str(DataVencimento.dia_10),
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
                        "cpf": "388.308.808-09",
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
                "cpf": "388.308.808-09",
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
                    "nome_mae": "Izolda",
                    "estado_civil": str(EstadoCivil.solteiro),
                    "ocupacao": str(Ocupacao.assalariado),
                    "data_vencimento": str(DataVencimento.dia_10),
                },
                "created_at": pedido.created_at.isoformat(),
                "updated_at": pedido.updated_at.isoformat(),
                "status": "novo",
                "usuario": {
                    "eid": usuario.eid,
                    "cpf": "477.417.717-10",
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


class TestPedidoAPIPatch(APIV0TestClient):
    endpoint = "pedidoapi"

    @pytest.mark.parametrize(
        "transicao,status_inicial,status_final",
        [
            (
                pedidos.TRANSICOES.INICIAR,
                pedidos.ESTADOS.NOVO,
                pedidos.ESTADOS.ANALISE_CREDITO,
            ),
            (
                pedidos.TRANSICOES.APROVAR,
                pedidos.ESTADOS.ANALISE_CREDITO,
                pedidos.ESTADOS.EM_ANDAMENTO,
            ),
            (
                pedidos.TRANSICOES.COMPLETAR,
                pedidos.ESTADOS.EM_ANDAMENTO,
                pedidos.ESTADOS.COMPLETO,
            ),
            (
                pedidos.TRANSICOES.REPROVAR,
                pedidos.ESTADOS.ANALISE_CREDITO,
                pedidos.ESTADOS.REPROVADO,
            ),
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
                "cpf": "388.308.808-09",
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
                    "nome_mae": "Izolda",
                    "estado_civil": str(EstadoCivil.solteiro),
                    "ocupacao": str(Ocupacao.assalariado),
                    "data_vencimento": str(DataVencimento.dia_10),
                },
                "created_at": pedido.created_at.isoformat(),
                "updated_at": pedido.updated_at.isoformat(),
                "status": status_final.value,
                "usuario": {
                    "eid": pedido.usuario.eid,
                    "cpf": "477.417.717-10",
                    "nome": "Fulano de Tal",
                    "permissoes": [],
                },
            }
        }
