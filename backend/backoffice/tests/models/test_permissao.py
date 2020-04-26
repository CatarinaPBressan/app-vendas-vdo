from backoffice import models


def test_nome():
    p1 = models.Permissao("nome")
    assert p1.nome == "nome"

    p2 = models.Permissao("NOME_2")
    assert p2.nome == "nome_2"


def test_str():
    permissao = models.Permissao("nome")
    assert str(permissao) == "nome"


def test_repr():
    permissao = models.Permissao("nome")
    assert permissao.nome in repr(permissao)
