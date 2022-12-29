FROM node:16 as node

RUN \
  apt-get -q update; \
  apt-get install -y --no-install-recommends --auto-remove file python3-pil; \
  apt-get -q clean; \
  rm -rf /var/tmp/* /tmp/*;

RUN \
  wget -O /tmp/imgp.deb https://github.com/jarun/imgp/releases/download/v2.8/imgp_2.8-1_ubuntu20.04.amd64.deb; \
  dpkg -i /tmp/imgp.deb; \
  rm -r /tmp/imgp.deb

RUN npm install --verbose --location=global @remix-run/serve@1.9.0

WORKDIR /app
COPY ./dist/ ./
COPY ./public/ ./public/

ENV NODE_ENV=production

CMD remix-serve index.js
