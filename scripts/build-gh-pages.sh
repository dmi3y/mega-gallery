#!/usr/bin/env bash -x

npm run compile-style
npm run compile-tmpl
npm run compile-script

cp build/script.js script.js
cp build/main.css main.css

node scripts/build-gh-pages.js
