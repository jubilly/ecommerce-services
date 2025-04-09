FROM node:18.16.0-alpine3.17

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY app/ .

EXPOSE 3000

CMD [ "node", "app.js" ]