#!/usr/bin/env bash -x

npm run compile-style
npm run compile-tmpl
npm run compile-script
node scripts/build-gh-pages.js