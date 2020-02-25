from datetime import datetime

from flask_admin import Admin
from flask_admin.model import typefmt
from flask_admin.contrib.sqla import ModelView
from wtforms import fields

from backoffice.models import db, Usuario, Pedido, PedidoProduto

column_searchable_list_base = ["eid"]
column_labels_base = {
    "eid": "EID",
    "created_at": "Criado em",
    "updated_at": "Atualizado em",
    "cpf": "CPF",
}


def _format_datetime(_, value):
    return value.strftime("%d/%m/%Y %H:%M")


column_type_formatters_base = {
    **typefmt.BASE_FORMATTERS,
    **{datetime: _format_datetime},
}
form_excluded_columns_base = ["created_at", "updated_at", "eid"]
column_type_formatters_detail_base = {
    **typefmt.DETAIL_FORMATTERS,
    **{datetime: _format_datetime},
}


class _BaseModelView(ModelView):
    can_view_details = True
    column_searchable_list = column_searchable_list_base
    column_labels = column_labels_base
    column_type_formatters = column_type_formatters_base
    form_excluded_columns = form_excluded_columns_base
    column_type_formatters_detail = column_type_formatters_detail_base


class UsuarioModelView(_BaseModelView):
    column_exclude_list = ["password"]
    column_details_exclude_list = ["password"]

    form_overrides = {"password": fields.PasswordField}

    def on_model_change(self, form, model, is_created):
        password = form.password.data
        if password:
            model.set_password(password)


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
        "created_at",
        "updated_at",
    ]

    column_searchable_list = column_searchable_list_base + ["pedido.eid"]

    can_create = False
    can_edit = False
    can_export = True


def init_app(app):
    admin = Admin(app, name="backoffice", template_mode="bootstrap3")
    admin.add_views(
        UsuarioModelView(Usuario, db.session),
        PedidoModelView(Pedido, db.session),
        PedidoProdutoModelView(PedidoProduto, db.session),
    )
