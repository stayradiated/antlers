#!/usr/bin/env sh

set -eux

rm -rf ./dist

pnpx @vercel/ncc build ./src/index.ts

sed -i 's/node://' ./dist/index.js
