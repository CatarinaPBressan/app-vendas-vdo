def init_app(app):
    @app.context_processor
    def _static_processors():
        def s3_static(filename):
            return app.config["S3_STATIC_PATH"].format(filename=filename)

        return {
            "s3_static": s3_static,
        }
