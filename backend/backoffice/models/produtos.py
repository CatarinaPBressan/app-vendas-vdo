import enum

import dataclasses


class TIPO_PRODUTO(str, enum.Enum):
    """
    Enum que controla o tipo do produto.

    Usado para pegar o conjunto de transições de status correspondente
    """

    CARTAO_DE_CREDITO = "cartao-de-credito"
    SEGURO = "seguro"
    CONSORCIO = "consorcio"


@dataclasses.dataclass(frozen=True)
class Produto:
    tipo_produto: TIPO_PRODUTO
    nome: str


PRODUTOS = {
    "cartao-de-credito": Produto(
        nome="Cartão de Crédito", tipo_produto=TIPO_PRODUTO.CARTAO_DE_CREDITO
    ),
    "seguro-vida": Produto(nome="Seguro de Vida", tipo_produto=TIPO_PRODUTO.SEGURO),
    "seguro-residencial": Produto(
        nome="Seguro Residencial", tipo_produto=TIPO_PRODUTO.SEGURO
    ),
    "seguro-automotivo": Produto(
        nome="Seguro Automotivo", tipo_produto=TIPO_PRODUTO.SEGURO
    ),
    "consorcio": Produto(nome="Consórcio", tipo_produto=TIPO_PRODUTO.CONSORCIO),
}
