#!/usr/bin/env bash -x

npm run compile-style
npm run compile-tmpl
npm run compile-script

cat build/script.js gh-pages/script/* > script.js
cat build/main.css gh-pages/style/* > main.css

node scripts/build-gh-pages.js

# it's going to be deploy
# git checkout gh-pages
# git add index.html script.js main.css
# git commit -m 'build gh pages'
# git push -f
