FROM node:18.12.1 as node

WORKDIR /app
COPY ./dist/ ./
COPY ./public/ ./public/

ENV NODE_ENV=production

CMD node index.js
