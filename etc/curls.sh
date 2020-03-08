curl \
-X POST \
-H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsImlhdCI6MTU4MjMyMDM2NSwiZXhwIjoxNTgyNDA2NzY1fQ.eyJlaWQiOiJUVzJKWk1ER1VaRFlWQ01SVU1SVkdDVVM3WSJ9.9ll04yEOzXdQefgN6WEOcqXHGR4GOI9Id5iER9EWHU2ZT8gvZdIdrdbvtKFm0MHgVnAXWkAnJ80A8BHuNA0l1g" \
-H "content-type: application/json" \
-d '{
  "nome_completo": "Arthur de Paula Bressan",
  "cpf": "38830880809",
  "email": "arthurbressan2@hotmail.com",
  "telefone_celular": "(12)99123-2413",
  "observacoes": "OBS",
  "produto_slug": "cartao-de-credito",
  "produto": {
    "cep": "12240-310",
    "uf": "SP",
    "cidade": "SJC",
    "logradouro": "R 123",
    "endereco_numero": "97",
    "complemento": "casa",
    "nome_mae": "Izolda",
    "estado_civil": "solteiro",
    "ocupacao": "assalariado",
    "data_vencimento": "dia_5"
  }
}' \
http://localhost:5000/api/v0/pedidos/

curl \
-X GET \
-H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsImlhdCI6MTU4MjMyMDM2NSwiZXhwIjoxNTgyNDA2NzY1fQ.eyJlaWQiOiJUVzJKWk1ER1VaRFlWQ01SVU1SVkdDVVM3WSJ9.9ll04yEOzXdQefgN6WEOcqXHGR4GOI9Id5iER9EWHU2ZT8gvZdIdrdbvtKFm0MHgVnAXWkAnJ80A8BHuNA0l1g" \
http://localhost:5000/api/v0/pedidos/

curl \
-X GET \
-H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsImlhdCI6MTU4MjMyMDM2NSwiZXhwIjoxNTgyNDA2NzY1fQ.eyJlaWQiOiJUVzJKWk1ER1VaRFlWQ01SVU1SVkdDVVM3WSJ9.9ll04yEOzXdQefgN6WEOcqXHGR4GOI9Id5iER9EWHU2ZT8gvZdIdrdbvtKFm0MHgVnAXWkAnJ80A8BHuNA0l1g" \
http://localhost:5000/api/v0/pedidos/YVEUAWEMDZEJXCCY66KZMXLTQY/

curl \
-X POST \
-H "content-type: application/json" \
-d '{"username": "admin", "password": "admin"}' \
http://localhost:5000/api/v0/usuarios/

curl \
-X GET \
-H "Authorization: Bearer {}" \
http://localhost:5000/api/v0/usuarios/
