from enum import Enum, auto


class EstadoCivil(Enum):
    solteiro = auto()
    casado = auto()
    viuvo = auto()
    separado = auto()


class Ocupacao(Enum):
    assalariado = auto()
    empresario = auto()
    aposentado = auto()
    autonomo = auto()
    outros = auto()


class DataVencimento(Enum):
    dia_5 = auto()
    dia_10 = auto()
    dia_15 = auto()
    dia_20 = auto()
    dia_25 = auto()
