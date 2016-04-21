var test = require('tape')
var fs = require('fs')
var path = require('path')
var $ = require('jquery')

var renderGallery = require('../assets/renderGallery')

var dataStr = fs.readFileSync(path.join(__dirname, '/../assets/galleryFiveItems.json'))
var data = JSON.parse(dataStr)

test('test data', function (t) {
  t.plan(2)

  t.ok(Array.isArray(data.items), 'should contain array of items')
  t.equal(data.items.length, 5, 'should be 5 items')
})

test('test gallery', function (t) {
  t.plan(4)
  renderGallery(data)

  t.equal($('.mg-body .mg-item').length, 5, 'should render 5 items')

  var defaultText = $('.mg-item:nth-child(3) .mg-item-text').text().trim()
  t.equal(defaultText, 'three', 'should have 3 as active')

  var navLeft = $('[data-navigation=left]')
  t.ok(navLeft.length, 'should have left nav')

  var navRigth = $('[data-navigation=right]')
  t.ok(navRigth.length, 'should have right nav')
})
