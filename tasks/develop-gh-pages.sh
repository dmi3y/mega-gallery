#!/usr/bin/env bash -x

npm run watch-styles & /
sane 'cat build/*.css gh-src/styles/* > index.css' --glob=build/*.css --glob=gh-src/styles/* & /
npm run watch-scripts & /
sane 'cat build/*.js gh-src/scripts/* > index.js' --glob=build/*.js --glob=gh-src/scripts/* & /
sane 'node tasks/build-gh-pages.js' --glob=gh-src/templates/**/*.hbs --glob=src/templates/**/*.hbs

trap 'kill %1; kill %2; kill %3; kill %4' SIGINT