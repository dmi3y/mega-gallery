var test = require('tape')
var fs = require('fs')
var path = require('path')
var $ = require('jquery')

var renderGallery = require('../assets/renderGallery')

var dataStr = fs.readFileSync(path.join(__dirname, '/../assets/galleryFiveItems.json'))
var data = JSON.parse(dataStr)

test('test nav left', function (t) {
  t.plan(3)
  renderGallery(data)

  var navLeft = $('[data-navigation=left]')

  navLeft.trigger('click')
  var text = $('.mg-item:nth-child(3) .mg-item-text').text().trim()
  t.equal(text, 'four', 'should move to 4 as active')

  navLeft.trigger('click')
  text = $('.mg-item:nth-child(3) .mg-item-text').text().trim()
  t.equal(text, 'five', 'should move to 5 as active')

  navLeft.trigger('click')
  text = $('.mg-item:nth-child(3) .mg-item-text').text().trim()
  t.equal(text, 'one', 'should move to 1 as active')
})

test('test nav right', function (t) {
  t.plan(3)
  renderGallery(data)

  var navRight = $('[data-navigation=right]')

  navRight.trigger('click')
  var text = $('.mg-item:nth-child(3) .mg-item-text').text().trim()
  t.equal(text, 'two', 'should move to 2 as active')

  navRight.trigger('click')
  text = $('.mg-item:nth-child(3) .mg-item-text').text().trim()
  t.equal(text, 'one', 'should move to 1 as active')

  navRight.trigger('click')
  text = $('.mg-item:nth-child(3) .mg-item-text').text().trim()
  t.equal(text, 'five', 'should move to 5 as active')
})
