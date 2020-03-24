FROM python:3.6

RUN apt-get update && apt-get install -y \
  python3-dev \
  vim \
  postgresql-client \
  libpq-dev

RUN pip3 install pipenv

WORKDIR /home/docker/code

COPY . .
RUN pipenv install --dev --deploy --system

EXPOSE 5000
