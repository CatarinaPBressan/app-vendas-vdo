FROM python:3.8

RUN apt-get update && apt-get install -y \
  vim \
  postgresql-client

RUN pip3 install pipenv

WORKDIR /home/docker/code

COPY Pipfile /home/docker/code
COPY Pipfile.lock /home/docker/code
RUN pipenv sync
ENV PYTHONPATH /home/docker/code:$PYTHONPATH

EXPOSE 5000

COPY . /home/docker/code
