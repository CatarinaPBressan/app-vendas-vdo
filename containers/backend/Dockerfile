FROM python:3.8

RUN apt-get update && apt-get install -y \
  vim \
  postgresql-client \
  libpq-dev

RUN pip3 install pipenv

WORKDIR /home/docker/code
COPY ./backend .
COPY ./scripts ./scripts

RUN pipenv sync
RUN pipenv sync --dev
RUN pipenv run pip freeze

# UWSGI uses this
# ENV PYTHONPATH /home/docker/code:$PYTHONPATH

EXPOSE 5000
