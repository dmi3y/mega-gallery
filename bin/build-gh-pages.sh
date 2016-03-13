#!/usr/bin/env bash -x

npm run compile-styles
npm run compile-templates
npm run compile-scripts

cat build/*.js gh-src/scripts/* > index.js
cat build/*.css gh-src/styles/* > index.css

node bin/build-gh-pages.js

# it's going to be deploy
# git checkout gh-pages
# git add index.html script.js main.css
# git commit -m 'build gh pages'
# git push -f
