import os

from werkzeug import datastructures
from werkzeug.utils import secure_filename
from flask import url_for, current_app
from sqlalchemy.dialects import postgresql

from backoffice.base import db, BaseTable


class PedidoProduto(db.Model, BaseTable):
    pedido_id = db.Column(db.ForeignKey("pedido.id"))
    dados_produto = db.Column(postgresql.JSON)

    __file_marker = "__file__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.dados_produto = kwargs.pop("dados_produto", {})

    @classmethod
    def from_api(cls, pedido, dados_produto):
        produto = cls(pedido=pedido)

        for key, value in dados_produto.items():
            if not key.endswith(PedidoProduto.__file_marker):
                produto.dados_produto[key] = value
            else:
                produto.add_file(key, value)

        return produto

    def add_file(self, key, file_data) -> None:
        cleaned_key = key.replace(self.__file_marker, "")
        nome_arquivo = secure_filename(file_data["nome_arquivo"])
        self.dados_produto[cleaned_key] = {
            "nome_arquivo": nome_arquivo,
            "url": url_for(
                "api_v0.arquivoprodutoapi",
                pedido_eid=self.pedido.eid,
                produto_key=cleaned_key,
                nome_arquivo=nome_arquivo,
                _external=True,
            ),
        }

    def validar_dados_arquivo(self, produto_key: str, nome_arquivo: str) -> bool:
        dados_arquivo = self.dados_produto.get(produto_key, {})
        if not isinstance(dados_arquivo, dict):
            return False

        try:
            return dados_arquivo["nome_arquivo"] == secure_filename(nome_arquivo)
        except KeyError:
            return False

    def save_file(
        self, produto_key: str, nome_arquivo: str, file: datastructures.FileStorage
    ) -> bool:
        nome_arquivo = secure_filename(nome_arquivo)
        file_dir = os.path.join(
            current_app.instance_path, "pedidos", self.pedido.eid, produto_key
        )
        file_path = os.path.join(file_dir, nome_arquivo)

        if os.path.exists(file_path):
            return False

        if not os.path.exists(file_dir):
            os.makedirs(file_dir)

        file.save(file_path)
        return True
