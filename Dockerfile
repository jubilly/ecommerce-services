# build
FROM node:23-alpine3.20

ENV NODE_ENV=build

RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma
COPY ./app ./