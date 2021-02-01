import io

import flask


class APIV0TestClient:
    @property
    def endpoint(_):
        raise NotImplementedError()

    def _do_request(self, method, client, usuario=None, json: dict = None, **kwargs):
        headers = []
        if json is None:
            json = {}
        if kwargs is None:
            kwargs = {}

        url = flask.url_for(f"api_v0.{self.endpoint}", **kwargs, _external=True)

        if usuario:
            headers.append(("Authorization", f"Bearer {usuario.generate_auth_token()}"))

        return getattr(client, method)(url, headers=headers, json=json)

    def get(self, client, usuario, **kwargs):
        return self._do_request("get", client, usuario, **kwargs)

    def post(self, client, usuario, json, **kwargs):
        return self._do_request("post", client, usuario, json=json, **kwargs)

    def patch(self, client, usuario, json, **kwargs):
        return self._do_request("patch", client, usuario, json=json, **kwargs)

    def send_file(
        self, client, usuario, file_data=b"123", file_name="file_name.txt", **kwargs
    ):
        url = flask.url_for(f"api_v0.{self.endpoint}", **kwargs, _external=True)
        return client.post(
            url,
            data={"file": (io.BytesIO(file_data), file_name)},
            headers=[("Authorization", f"Bearer {usuario.generate_auth_token()}")],
        )
