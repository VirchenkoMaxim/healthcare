FROM node:19.2.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY ./.env ./.env

COPY ./src ./src

