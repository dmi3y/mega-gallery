var fs = require('fs')
var path = require('path')

var $ = require('jquery')
window.$ = $

var indexcss = fs.readFileSync(path.join(__dirname, '/../../build/index.css')).toString()
$('<style>').text(indexcss).appendTo('head')

var indexjs = fs.readFileSync(path.join(__dirname, '/../../build/index.js')).toString()
$('<script>').text(indexjs).appendTo('head')

var handlebars = require('handlebars')
require('./../../build/templates/partials-common.js')

module.exports = function (data) {
  var init = $('<script>').text('$( function(){$(".mg-body").mgGallery()} )')
  $('body').html(handlebars.partials['mg-body']({items: data.items})).append(init)
}
