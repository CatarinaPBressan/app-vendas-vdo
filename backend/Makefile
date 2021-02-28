docker-compose:
	docker-compose build --pull --no-cache

dev:
	docker-compose \
		-f docker-compose.yml \
		up

test:
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.test.yml \
		up \
		--exit-code-from backoffice

backoffice-container:
	docker-compose exec backoffice bash

psql-container:
	docker exec -it backoffice_db psql -d app_vendas -U postgres

requirements:
	pipenv run pip freeze > requirements.txt

ssh:
	ssh app-vendas@appvendasvidadeouro.com.br
