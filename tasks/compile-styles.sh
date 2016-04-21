#!/usr/bin/env bash

node-sass "$@" src/styles/index.scss \
| postcss -c postcss-options.json \
-o build/index.css
