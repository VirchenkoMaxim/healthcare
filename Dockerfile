FROM node:19.2.0

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY ./.env ./.env

COPY ./src ./src

