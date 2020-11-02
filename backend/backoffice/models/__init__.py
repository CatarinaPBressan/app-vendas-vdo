import flask
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer, BadSignature, SignatureExpired
import sqlalchemy_utils

from backoffice import utils
from backoffice.base import db, BaseTable
from backoffice.models.pedidos import Pedido

usuario_permissao = db.Table(
    "usuario_permissao",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("usuario_id", db.ForeignKey("usuario.id")),
    db.Column("permissao_id", db.ForeignKey("permissao.id")),
)

ONE_DAY = 60 * 60 * 24


class Franquia(db.Model, BaseTable):
    nome = db.Column(db.String())
    cnpj = db.Column(db.String(19), unique=True)  # 12.456.890/2345-789

    def __str__(self):
        return f"<Franquia {self.nome} - {self.cnpj}>"


class Usuario(db.Model, BaseTable, UserMixin):
    username = db.Column(db.String(255), index=True, unique=True)
    cpf = db.Column(db.String(14), unique=True)  # 123.567.901-34
    password = db.Column(db.String(128))
    nome = db.Column(db.String(255))

    franquia_id = db.Column(db.ForeignKey("franquia.id"))
    franquia = db.relationship("Franquia")

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
        serializer = TimedJSONWebSignatureSerializer(
            flask.current_app.config["SECRET_KEY"], expires_in=expiration
        )
        return serializer.dumps({"eid": self.eid}).decode("ascii")

    @staticmethod
    def get_user_via_token(token):
        serializer = TimedJSONWebSignatureSerializer(
            flask.current_app.config["SECRET_KEY"]
        )
        try:
            data = serializer.loads(token)
        except (SignatureExpired, BadSignature):
            return None
        return Usuario.query.filter_by(eid=data["eid"]).first()

    @property
    def is_admin(self):
        return self.has_permission("admin")

    def has_permission(self, permissao):
        # pylint: disable=not-an-iterable
        return permissao in {permissao.nome for permissao in self.permissoes}

    @property
    def pusher_key(self):
        return flask.current_app.config["PUSHER_KEY"]

    @property
    def pusher_cluster(self):
        return flask.current_app.config["PUSHER_CLUSTER"]


class PedidoProduto(db.Model, BaseTable):
    """
    Tabela que segura os dados dos pedidos.
    As colunas são compartilhados entre produtos.
    """

    # TODO: Os produtos que não utilizarem alguma coluna não devem mostrar essa coluna no JSON.
    # ref: https://github.com/marshmallow-code/marshmallow/issues/229#issuecomment-134387999

    pedido_id = db.Column(db.ForeignKey("pedido.id"))
    # Dados dos produtos
    cep = db.Column(db.String(9))
    uf = db.Column(db.String(2))
    cidade = db.Column(db.String(255))
    logradouro = db.Column(db.String(255))
    endereco_numero = db.Column(db.String(255))
    complemento = db.Column(db.String(255))
    nome_mae = db.Column(db.String(255))
    estado_civil = db.Column(db.String)
    ocupacao = db.Column(db.String)
    data_vencimento = db.Column(db.String)


class Permissao(db.Model, BaseTable):
    nome = db.Column(db.String(255), unique=True)

    def __init__(self, nome):
        self.nome = nome.lower()

    def __repr__(self):
        return f"<Permissao - {self.nome}>"

    def __str__(self):
        return self.nome


def init_app(app):
    db_url = app.config.get("SQLALCHEMY_DATABASE_URI")
    if db_url is None:
        print("SQLALCHEMY_DATABASE_URI is None.")
        print("Did you pass the DATABASE_URI env?")
        return
    if sqlalchemy_utils.database_exists(db_url):
        return
    db_name = db_url.split("/")[-1]
    print(f"Database {db_name} does not exist, creating...")
    print("NOTE: Migrations still need to be run.")
    sqlalchemy_utils.create_database(db_url)
    print("Created.")
