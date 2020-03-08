from backoffice import create_app

app = create_app()


@app.shell_context_processor
def make_shell_context():
    from backoffice.models import db, Usuario, Pedido, PedidoProduto

    return {
        "db": db,
        "Usuario": Usuario,
        "Pedido": Pedido,
        "PedidoProduto": PedidoProduto,
    }


@app.cli.command("create-admin")
def create_admin():
    from backoffice.models import db, Usuario, Permissao

    admin = Permissao(nome="admin")
    db.session.add(Usuario(username="admin", password="admin", permissoes=[admin]))
    db.session.commit()
