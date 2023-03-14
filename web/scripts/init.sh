#!/usr/bin/env sh

set -eux

sed -i "s|{{BASE_PATH}}|${BASE_PATH}|" index.js

exec node index.js
