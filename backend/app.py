from app_vendedor import create_app

app = create_app()


@app.shell_context_processor
def make_shell_context():
    from app_vendedor.models import db, Usuario, Token, Pedido, PedidoProduto

    return {
        "db": db,
        "Usuario": Usuario,
        "Token": Token,
        "Pedido": Pedido,
        "PedidoProduto": PedidoProduto,
    }
