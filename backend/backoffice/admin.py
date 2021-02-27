from datetime import datetime

import flask
import flask_login
from flask_admin import Admin, AdminIndexView, expose, helpers, menu
from flask_admin.model import typefmt
from flask_admin.contrib.sqla import ModelView
from wtforms import fields, Form, ValidationError, validators

from backoffice.models import (
    db,
    Usuario,
    Pedido,
    PedidoProduto,
    Permissao,
    Franquia,
)

column_searchable_list_base = ["eid"]
column_labels_base = {
    "eid": "EID",
    "criado_em": "Criado em",
    "atualizado_em": "Atualizado em",
    "cpf": "CPF",
}


def _format_datetime(_, value):
    return value.strftime("%d/%m/%Y %H:%M")


column_type_formatters_base = {
    **typefmt.BASE_FORMATTERS,
    **{datetime: _format_datetime},
}
form_excluded_columns_base = ["criado_em", "atualizado_em", "eid"]
column_type_formatters_detail_base = {
    **typefmt.DETAIL_FORMATTERS,
    **{datetime: _format_datetime},
}


class AdminLoginForm(Form):
    _render_kws = {"class": "form-control"}
    username = fields.StringField(
        validators=[validators.DataRequired()], label="Usuário", render_kw=_render_kws,
    )
    password = fields.PasswordField(
        validators=[validators.DataRequired()], label="Senha", render_kw=_render_kws,
    )

    def get_user(self):
        usuario = Usuario.query.filter_by(username=self.username.data).first()
        if (
            not usuario
            or not usuario.verify_password(self.password.data)
            or not usuario.is_admin
        ):
            raise ValidationError(
                "Usário ou senha inválidos, ou usuário não tem permissão para acessar."
            )
        return usuario


def _user_is_admin(user):
    return user and user.is_authenticated and user.is_admin


class BackofficeIndexView(AdminIndexView):
    @expose("/")
    def index(self):
        if not _user_is_admin(flask_login.current_user):
            return flask.redirect(flask.url_for(".login_view"))
        return super(BackofficeIndexView, self).index()

    @expose("/login/", methods=("GET", "POST"))
    def login_view(self):
        form = AdminLoginForm(flask.request.form)
        if helpers.validate_form_on_submit(form):
            try:
                user = form.get_user()
            except ValidationError as error:
                flask.flash(str(error))
            else:
                flask_login.login_user(user)

        if _user_is_admin(flask_login.current_user):
            return flask.redirect(flask.url_for(".index"))
        self._template_args["form"] = form
        return super(BackofficeIndexView, self).index()

    @expose("/logout/")
    def logout_view(self):
        flask_login.logout_user()
        return flask.redirect(flask.url_for(".index"))


class _BaseModelView(ModelView):
    can_view_details = True
    column_searchable_list = column_searchable_list_base
    column_labels = column_labels_base
    column_type_formatters = column_type_formatters_base
    form_excluded_columns = form_excluded_columns_base
    column_type_formatters_detail = column_type_formatters_detail_base

    def is_accessible(self):
        return _user_is_admin(flask_login.current_user)


class FranquiaModelView(_BaseModelView):
    pass


class PermissaoModelView(_BaseModelView):
    column_searchable_list = ["nome"]
    column_list = ["nome"]
    can_edit = False
    can_view_details = False


class UsuarioModelView(_BaseModelView):
    _view_columns = [
        "eid",
        "nome",
        "cpf",
        "username",
        "franquia.nome",
        "criado_em",
        "atualizado_em",
        "permissoes",
    ]
    column_list = _view_columns
    column_details_list = _view_columns
    column_searchable_list = column_searchable_list_base + ["username", "cpf", "nome"]

    form_ajax_refs = {"permissoes": {"fields": [Permissao.nome]}}

    form_extra_fields = {"password_new": fields.PasswordField("Senha")}

    form_columns = ["username", "password_new", "cpf", "nome", "permissoes", "franquia"]

    def on_model_change(self, form, model, is_created):
        password_new = form.password_new.data
        if password_new:
            model.set_password(password_new)


class PedidoModelView(_BaseModelView):
    can_create = False
    can_export = True

    column_exclude_list = ["email", "telefone_celular", "observacoes"]
    column_searchable_list = column_searchable_list_base + ["cpf", "nome_completo"]
    column_filters = ["produto_slug", "status"]
    form_excluded_columns = form_excluded_columns_base + [
        "produto",
        "produto_slug",
    ]


class PedidoProdutoModelView(_BaseModelView):
    column_list = [
        "eid",
        "pedido.eid",
        "pedido.produto_slug",
        "criado_em",
        "atualizado_em",
    ]

    column_searchable_list = column_searchable_list_base + ["pedido.eid"]

    can_create = False
    can_edit = False
    can_export = True


class LogoutLink(menu.MenuLink):
    name = "Sair"
    endpoint = "admin.logout_view"

    def __init__(self):
        super().__init__(self.name, endpoint=self.endpoint)

    def is_accessible(self):
        return not flask_login.current_user.is_anonymous


def init_app(app):
    admin = Admin(
        app,
        name="backoffice",
        template_mode="bootstrap3",
        index_view=BackofficeIndexView(),
    )
    admin.add_views(
        PermissaoModelView(Permissao, db.session),
        UsuarioModelView(Usuario, db.session),
        PedidoModelView(Pedido, db.session),
        PedidoProdutoModelView(PedidoProduto, db.session),
        FranquiaModelView(Franquia, db.session),
    )
    admin.add_link(LogoutLink())
