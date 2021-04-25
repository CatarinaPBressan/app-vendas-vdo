FROM python:3.8-buster

RUN groupadd -g 1000 app_vendas
RUN useradd -g 1000 app_vendas

RUN apt-get update && apt-get install -y \
  python3-dev \
  vim \
  postgresql-client \
  libpq-dev \
  git

RUN pip3 install pipenv

WORKDIR /home/app_vendas/code

COPY . .
RUN pipenv install --dev --deploy --system

EXPOSE 5000

RUN chown -R app_vendas:app_vendas /home/app_vendas
USER app_vendas
