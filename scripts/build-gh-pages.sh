#!/usr/bin/env bash -x

npm run compile-style
npm run compile-tmpl
npm run compile-script

cp build/script.js script.js
cat build/main.css gh-pages/style/* > main.css

node scripts/build-gh-pages.js

# it's going to be deploy
# git commit -am 'build gh pages'
# git push -f
