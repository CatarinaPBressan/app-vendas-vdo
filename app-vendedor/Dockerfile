FROM node:12-slim

RUN apt-get update && apt-get install -y \
  zip \
  unzip \
  curl

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

WORKDIR /home/docker/code
COPY . /home/docker/code
RUN cd /home/docker/code && yarn install
RUN cd /home/docker/code && yarn build
