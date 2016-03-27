// Autoscroll functionality

/* global $ */
$(function slidersAutoscroll () {
  // selector might be modified as *[class^=gallery] to support all future possible scripts
  $('[data-autoscroll]').each(function () {
    var el = $(this)
    var l = $('*[class^=arw-l]', el)
    var r = $('*[class^=arw-r]', el)
    var amt = r
    var time = el.attr('data-autoscroll')
    var dir = el.attr('data-autoscrolldir') || 'ltr'

    switch (dir) {
      case 'ltr':
        amt = r
        break
      case 'rtl':
        amt = l
        break
    }
    var flg = true // flag to check reverse autoplay
    el.on('galleryslide', function () { // catching prev next buttons with custom event
      flg = false // everytime the gallery srolled flag goes to false
    })
    setInterval(function () {
      if (el.hasClass('paused')) return
      amt.click()
      if (flg) {
        amt = (amt === r) ? l : r // change direction if we could not autoscroll futher
        amt.click() // and instantly click to not have double pause
      }
      flg = true // set flag back to true
    }, time)
    el.on('hover touchstart touchend', function () {
      el.toggleClass('paused')
    })
  })
})
/* global $ */
$(function mgGallery () {
  $.fn.mgGallery = function () {
    var gallery = $(this)
    var inner = gallery.find('.mg-inner')

    var navigation = gallery.find('[data-navigation]')
    navigation.click(function (ev) {
      var dir = this.dataset.navigation
      var firstChild = inner.find('li:first-child')
      var lastChild = inner.find('li:last-child')

      if (dir === 'left') lastChild.before(firstChild)
      else if (dir === 'right') firstChild.after(lastChild)
    })
  }
})
/* global $ */

$(function () {
  $('.mg-body').mgGallery()
})
