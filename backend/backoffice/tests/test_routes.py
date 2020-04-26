import flask


def test_health_check(client):
    response = client.get(flask.url_for("backoffice.health_check"))
    assert response.status_code == 200
    assert response.json == {"settings": "OK", "environment": "test", "db": "OK"}
