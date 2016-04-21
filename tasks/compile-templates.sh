#!/usr/bin/env bash
mkdir -p build/templates

# All templates compiles to partials
handlebars -e hbs --commonjs handlebars -p -f build/templates/partials-common.js src/templates/*.hbs
handlebars -e hbs --amd -p -f build/templates/partials-amd.js src/templates/*.hbs
handlebars -e hbs -p -f build/templates/partials.js src/templates/*.hbs
