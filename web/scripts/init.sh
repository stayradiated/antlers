#!/usr/bin/env sh

set -eux

sed -i "s|{{BASE_PATH}}|${BASE_PATH}|g" index.js $(find ./public/build -type f -iname '*.js')

exec node index.js
