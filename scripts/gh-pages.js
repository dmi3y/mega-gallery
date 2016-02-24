#!/usr/bin/env node

/**
 * Generates GitHub Pages content
 */

"use strict";

var fs = require("fs");

var Handlebars = require("handlebars");
require("build/tmpl.js");

var index = fs.readFileAsync(__dirname + "/gh-pages/tmpl/index.hbs");


