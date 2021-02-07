import enum

import dataclasses


class TipoProduto(str, enum.Enum):
    """
    Enum que controla o tipo do produto.

    Usado para pegar o conjunto de transições de status correspondente
    """

    CARTAO_DE_CREDITO = "cartao-de-credito"
    SEGURO = "seguro"


@dataclasses.dataclass(frozen=True)
class Produto:
    tipo_produto: TipoProduto
    nome: str


PRODUTOS = {
    "cartao-de-credito": Produto(
        nome="Cartão de Crédito", tipo_produto=TipoProduto.CARTAO_DE_CREDITO
    ),
    "seguro-vida": Produto(nome="Seguro de Vida", tipo_produto=TipoProduto.SEGURO),
    "seguro-residencial": Produto(
        nome="Seguro Residencial", tipo_produto=TipoProduto.SEGURO
    ),
    "seguro-automotivo": Produto(
        nome="Seguro Automotivo", tipo_produto=TipoProduto.SEGURO
    ),
}
