FROM node:18.15.0 as node

WORKDIR /app
COPY ./dist/ ./
COPY ./public/ ./public/
COPY ./scripts/ ./scripts/

ENV NODE_ENV=production

CMD ./scripts/init.sh
