from backoffice import create_app

app = create_app()


@app.shell_context_processor
def make_shell_context():
    from backoffice.models import db, Usuario, Token, Pedido, PedidoProduto

    return {
        "db": db,
        "Usuario": Usuario,
        "Token": Token,
        "Pedido": Pedido,
        "PedidoProduto": PedidoProduto,
    }
