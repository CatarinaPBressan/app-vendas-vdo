FROM node:12-slim

ARG APPLICATION_NAME

RUN apt-get update && apt-get install -y \
  awscli

WORKDIR /home/docker/code
COPY . .

RUN yarn install
RUN yarn build
