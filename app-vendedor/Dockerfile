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
RUN ls /home/docker/code
RUN cd /home/docker/code && yarn install
RUN cd /home/docker/code && yarn build
# A ideia aqui é:
# 1. Fazer o build de um container que consiga fazer o build da aplicação OK 
# 2. Rodar um script que faça o comando de build do yarn OK
# 3. Copiar o /static da aplicação em um lugar que o servidor consiga servir:
# aws s3 sync build/static s3://<bucket>/static
