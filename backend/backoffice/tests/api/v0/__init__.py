import flask


class APIV0TestClient:
    @property
    def endpoint(self):
        raise NotImplementedError()

    def _do_request(self, method, client, usuario, json: dict = None, **kwargs):
        if json is None:
            json = {}
        if kwargs is None:
            kwargs = {}

        url = flask.url_for(f"api_v0.{self.endpoint}", **kwargs, _external=True)

        return getattr(client, method)(
            url,
            headers=[("Authorization", f"Bearer {usuario.generate_auth_token()}"),],
            json=json,
        )

    def get(self, client, usuario, **kwargs):
        return self._do_request("get", client, usuario, **kwargs)

    def post(self, client, usuario, json, **kwargs):
        return self._do_request("post", client, usuario, json=json, **kwargs)

    def patch(self, client, usuario, json, **kwargs):
        return self._do_request("patch", client, usuario, json=json, **kwargs)
