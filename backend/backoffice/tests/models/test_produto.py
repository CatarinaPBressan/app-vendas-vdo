from unittest import mock

from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from flask import url_for

from backoffice import models
from backoffice.models import pedido_produtos, pedidos


def test_from_api_sem_arquivo(app):
    assert app

    pedido = pedidos.Pedido()
    dados_produto = {
        "teste": 1,
        "teste2": "teste2",
    }

    produto = pedido_produtos.PedidoProduto.from_api(pedido, dados_produto)

    assert isinstance(produto, pedido_produtos.PedidoProduto)
    assert produto.pedido == pedido
    assert produto.dados_produto == dados_produto

    models.db.session.add(pedido)
    models.db.session.commit()

    assert produto.id
    assert pedido.id
    assert produto.pedido_id == pedido.id


def test_from_api_com_arquivo(app):
    assert app

    pedido = pedidos.Pedido(eid="blhe")
    dados_produto = {
        "teste1": 1,
        "teste2__file__": {"nome_arquivo": "nome arquivo.txt"},
    }

    produto = pedido_produtos.PedidoProduto.from_api(pedido, dados_produto)

    assert isinstance(produto, pedido_produtos.PedidoProduto)
    assert produto.pedido == pedido
    assert produto.dados_produto == {
        "teste1": 1,
        "teste2": {
            "nome_arquivo": "nome_arquivo.txt",
            "url": url_for(
                "api_v0.arquivoprodutoapi",
                pedido_eid=produto.pedido.eid,
                produto_key="teste2",
                nome_arquivo="nome_arquivo.txt",
                _external=True,
            ),
        },
    }


def test_save_file(app):
    app.instance_path = "path/to/instance"
    pedido = pedidos.Pedido()
    models.db.session.add(pedido)
    models.db.session.commit()
    produto = pedido_produtos.PedidoProduto()
    produto.pedido = pedido
    produto.dados_produto["produto_key"] = {"nome_arquivo": "nome_arquivo.txt"}

    file = mock.Mock()

    with mock.patch("os.path.exists", return_value=False) as exists_mock:
        with mock.patch("os.makedirs") as makedirs_mock:
            produto.save_file("produto_key", "nome arquivo.txt", file)
            makedirs_mock.assert_called_once_with(
                f"path/to/instance/pedidos/{produto.pedido.eid}/produto_key"
            )
        exists_mock.asssert_has_calls(
            [
                mock.call(
                    f"path/to/instance/pedidos/{produto.pedido.eid}/produto_key/nome_arquivo.txt"
                ),
                mock.call(f"path/to/instance/pedidos/{produto.pedido.eid}/produto_key"),
            ]
        )

    file.save.assert_called_once_with(
        f"path/to/instance/pedidos/{produto.pedido.eid}/produto_key/nome_arquivo.txt"
    )


def test_add_file(app):
    produto = pedido_produtos.PedidoProduto(pedido=pedidos.Pedido(eid="xxx"))

    produto.add_file("arquivo__file__", {"nome_arquivo": "nome arquivo.txt"})

    assert "arquivo__file__" not in produto.dados_produto
    assert "arquivo" in produto.dados_produto
    assert produto.dados_produto["arquivo"] == {
        "nome_arquivo": "nome_arquivo.txt",
        "url": url_for(
            "api_v0.arquivoprodutoapi",
            pedido_eid="xxx",
            produto_key="arquivo",
            nome_arquivo="nome_arquivo.txt",
            _external=True,
        ),
    }


def test_validar_dados_arquivo(app):
    produto = pedido_produtos.PedidoProduto(pedido=pedidos.Pedido(eid="xxx"))
    produto.add_file("arquivo__file__", {"nome_arquivo": "nome arquivo.txt"})
    produto.dados_produto["nao_arquivo"] = "xxx"
    produto.dados_produto["outro_dict"] = {"outra_chave": "xxx"}

    assert produto.validar_dados_arquivo("arquivo", "nome_arquivo.txt")
    assert produto.validar_dados_arquivo("arquivo", "nome arquivo.txt")
    assert not produto.validar_dados_arquivo("arquivo", "xxx")
    assert not produto.validar_dados_arquivo("nao_existe", "xxx")
    assert not produto.validar_dados_arquivo("nao_arquivo", "xxx")
    assert not produto.validar_dados_arquivo("outro_dict", "xxx")
