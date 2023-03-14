#!/usr/bin/env sh

set -eux

sed -i "s|{{BASE_PATH}}|${BASE_PATH}|g" index.js

exec node index.js
