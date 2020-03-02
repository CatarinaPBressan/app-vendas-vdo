FROM node:12-slim

ARG APPLICATION_NAME

RUN apt-get update && apt-get install -y \
  zip \
  unzip \
  curl

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

WORKDIR /home/docker/code
RUN echo "Building react application: ${APPLICATION_NAME}"
COPY ./${APPLICATION_NAME} .
COPY ./scripts ./scripts

RUN yarn install
RUN yarn build
