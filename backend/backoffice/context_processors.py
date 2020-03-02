def init_app(app):
    @app.context_processor
    def _static_processors():
        def promotores_static(filename):
            static_path = app.config.get("PROMOTORES_S3_STATIC_PATH")
            if static_path:
                return static_path.format(filename=filename)

        def backoffice_static(filename):
            static_path = app.config.get("BACKOFFICE_S3_STATIC_PATH")
            if static_path:
                return static_path.format(filename=filename)

        return {
            "promotores_static": promotores_static,
            "backoffice_static": backoffice_static,
        }
