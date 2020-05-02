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
