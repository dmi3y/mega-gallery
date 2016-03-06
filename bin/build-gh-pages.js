#!/usr/bin/env node

/**
 * Generates GitHub Pages content
 */

"use strict";

var fs = require("fs");
var cwd = process.cwd();

var Handlebars = require("handlebars");
require(cwd + "/build/tmpl.js");

var indexBlob = fs.readFileSync(cwd + "/gh-pages/tmpl/index.hbs");
var dataBlob  = fs.readFileSync(cwd + "/gh-pages/data/gallery.json");
var dataJSON = JSON.parse(dataBlob);
var indexStr = indexBlob.toString();
var indexTmpl = Handlebars.compile(indexStr);

var indexHtml = indexTmpl(dataJSON);

fs.writeFileSync(cwd + "/index.html", indexHtml);
