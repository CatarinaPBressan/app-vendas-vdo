import os
import typing

import flask

import sqlalchemy
import transitions
from werkzeug import datastructures, utils as werk_utils

from backoffice.base import db, BaseTable

from backoffice.models.pedidos import status
from backoffice.models import produtos


class Pedido(db.Model, BaseTable, transitions.Machine):
    @sqlalchemy.orm.reconstructor
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        produto_slug = self.produto_slug or kwargs.get("produto_slug")
        # produto_slug pode ser None para facilitar testes
        produto = produtos.PRODUTOS.get(produto_slug)
        transicoes = status.get_transicoes_produto(produto)
        estados = [estado.value for estado in status.get_estados_produto(produto)]

        transitions.Machine.__init__(
            self,
            states=estados,
            transitions=transicoes,
            initial=self.status or status.ESTADOS.NOVO.value,
            model_attribute="status",
        )

    usuario_id = db.Column(db.ForeignKey("usuario.id"))
    usuario = db.relationship("Usuario")
    produto = db.relationship("PedidoProduto", uselist=False, backref="pedido")
    produto_slug = db.Column(db.String(255))
    status = db.Column(db.String(255), default=status.ESTADOS.NOVO.value)
    arquivo_cotacao_url = db.Column(db.String())

    # Dados do pedido compartilhados entre todos os produtos
    nome_completo = db.Column(db.String(255))
    cpf = db.Column(db.String(14))
    email = db.Column(db.String(255))
    telefone_celular = db.Column(db.String(14))
    observacoes = db.Column(db.Text)

    def get_diretorio_arquivo(self, produto_key: str) -> str:
        absolute_instance_path = os.path.abspath(flask.current_app.instance_path)
        return f"{absolute_instance_path}/pedidos/{self.eid}/{produto_key}"

    def validar_dados_cotacao(self, produto_key: str) -> bool:
        produto = produtos.PRODUTOS[self.produto_slug]
        return (
            produto.tipo_produto == produtos.TipoProduto.SEGURO
            and produto_key == "cotacao"
        )

    def salvar_cotacao(self, file: datastructures.FileStorage) -> typing.Optional[str]:
        nome_arquivo = werk_utils.secure_filename(file.filename)
        dir_arquivo = self.get_diretorio_arquivo("cotacao")
        caminho_arquivo = os.path.join(dir_arquivo, nome_arquivo)

        if os.path.exists(caminho_arquivo):
            return None

        if not os.path.exists(dir_arquivo):
            os.makedirs(dir_arquivo)

        file.save(caminho_arquivo)
        self.arquivo_cotacao_url = self._url_arquivo(nome_arquivo)
        db.session.add(self)
        db.session.commit()

        return self.arquivo_cotacao_url

    def _url_arquivo(self, nome_arquivo):
        return flask.url_for(
            "api_v0.downloadarquivoprodutoapi",
            pedido_eid=self.eid,
            produto_key="cotacao",
            nome_arquivo=nome_arquivo,
            _external=True,
        )
