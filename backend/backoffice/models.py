from flask import current_app
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer, BadSignature, SignatureExpired
import sqlalchemy_utils

from backoffice.base import db
from backoffice import utils
from backoffice.enums import EstadoCivil, Ocupacao, DataVencimento


class _BaseTable(object):
    id = db.Column(db.Integer, primary_key=True)
    eid = db.Column(db.String(26), index=True, unique=True, default=utils.create_eid)

    created_at = db.Column(db.DateTime, default=utils.datetime_now)
    updated_at = db.Column(
        db.DateTime, default=utils.datetime_now, onupdate=utils.datetime_now
    )

    def __str__(self):
        return f"<{self.__class__.__name__} - {self.eid}>"


usuario_permissao = db.Table(
    "usuario_permissao",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("usuario_id", db.ForeignKey("usuario.id")),
    db.Column("permissao_id", db.ForeignKey("permissao.id")),
)

ONE_DAY = 60 * 60 * 24


class Usuario(db.Model, _BaseTable, UserMixin):
    username = db.Column(db.String(255), index=True, unique=True)
    cpf = db.Column(db.String(14), unique=True)
    password = db.Column(db.String(128))
    nome = db.Column(db.String(255))

    permissoes = db.relationship("Permissao", secondary=usuario_permissao)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        password = kwargs.get("password")
        if password:
            self.set_password(password)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password, password)

    def generate_auth_token(self, expiration=ONE_DAY):
        s = TimedJSONWebSignatureSerializer(
            current_app.config["SECRET_KEY"], expires_in=expiration
        )
        return s.dumps({"eid": self.eid}).decode("ascii")

    @staticmethod
    def get_user_via_token(token):
        s = TimedJSONWebSignatureSerializer(current_app.config["SECRET_KEY"])
        try:
            data = s.loads(token)
        except (SignatureExpired, BadSignature):
            return None
        return Usuario.query.filter_by(eid=data["eid"]).one()

    @property
    def is_admin(self):
        # pylint: disable=not-an-iterable
        return "admin" in {permissao.nome for permissao in self.permissoes}


class Pedido(db.Model, _BaseTable):
    usuario_id = db.Column(db.ForeignKey("usuario.id"))
    usuario = db.relationship("Usuario")
    produto = db.relationship("PedidoProduto", uselist=False, backref="pedido")
    produto_slug = db.Column(db.String(255))
    status = db.Column(db.String(255), default="NOVO")
    # Dados do pedido compartilhado entre todos os produtos
    nome_completo = db.Column(db.String(255))
    cpf = db.Column(db.String(14))
    email = db.Column(db.String(255))
    telefone_celular = db.Column(db.String(14))
    observacoes = db.Column(db.Text)


class PedidoProduto(db.Model, _BaseTable):
    """
    Tabela que segura os dados dos pedidos.
    As colunas são compartilhados entre produtos.
    Idealmente os produtos que não utilizarem alguma coluna não devem mostrar
    essa coluna no JSON.
    """

    pedido_id = db.Column(db.ForeignKey("pedido.id"))
    # Dados dos produtos
    cep = db.Column(db.String(9))
    uf = db.Column(db.String(2))
    cidade = db.Column(db.String(255))
    logradouro = db.Column(db.String(255))
    endereco_numero = db.Column(db.String(255))
    complemento = db.Column(db.String(255))
    nome_mae = db.Column(db.String(255))
    estado_civil = db.Column(db.Enum(EstadoCivil))
    ocupacao = db.Column(db.Enum(Ocupacao))
    data_vencimento = db.Column(db.Enum(DataVencimento))


class Permissao(db.Model, _BaseTable):
    nome = db.Column(db.String(255), unique=True)

    def __init__(self, nome):
        self.nome = nome.lower()

    def __repr__(self):
        return f"<Permissao - {self.nome}>"

    def __str__(self):
        return self.nome


def init_app(app):
    db_url = app.config["SQLALCHEMY_DATABASE_URI"]
    if sqlalchemy_utils.database_exists(db_url):
        return
    db_name = db_url.split("/")[-1]
    print(f"Database {db_name} does not exist, creating...")
    print("NOTE: Migrations still need to be ran.")
    sqlalchemy_utils.create_database(db_url)
    print("Created.")
