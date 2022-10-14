FROM node:16-alpine as node

RUN npm install --verbose --location=global @remix-run/serve@1.7.2

WORKDIR /app
COPY ./dist/ ./
COPY ./public/ ./public/
COPY ./history.data.json/ ./

ENV NODE_ENV=production

CMD remix-serve index.js
