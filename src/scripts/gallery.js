/**
 * MG gallery main script
 *
 */

/* global $ */
// This, oh my dog... needs refactoring...
$(function mgGallery () {
  // animation delay
  var delay = 200
  var hm = {}
  var itemClass = '.mg-item'
  var imgClass = '.mg-item-image'
  var movingClass = '.mg-moving'
  var _movingClass = 'mg-moving'
  var currentClass = '.mg-current'
  var _currentClass = 'mg-current'
  var teaserClass = '.mg-item-teaser'

  var hlpr = { // helper hash
    init: function (cur, gallery) {
      cur.add(cur.prev('li')).add(cur.next('li')).each(function (ix) {
        var li = $(this)
        hm[ix] = {
          l: li.css('left'),
          r: li.css('right'),
          t: li.css('top'),
          w: $(imgClass, li).css('width'),
          h: $(imgClass, li).css('height')
        } // shortcuted object instead of array for better readability
        hm.r = hm[0]
        hm.d = hm[1]
        hm.l = hm[2] // shortcuten for left, right and default
      })
      hm.lg = $(itemClass, gallery).length
      gallery.data('initData', hm)
      return hm
    },
    anim: function (wht, wre) {
      wht.addClass(_movingClass).animate({
        left: wre.l,
        right: wre.r,
        top: wre.t
      }, delay).find(imgClass).animate({
        width: wre.w,
        height: wre.h
      }, delay, function () {
        wht.toggleClass(_currentClass).removeClass(_movingClass)
      }).parents('li').find(teaserClass).fadeToggle(delay)
    },
    doclk: function (it, st, cur, gallery) {
      var wro = gallery.data('initData')
      // move new item to center (default position) and make current
      this.anim(it, wro.d)
      // move current to its new position
      this.anim(cur, wro[st])
      gallery.trigger('galleryslide', st) // hook for helpers
    },
    cirle: function (it, st, cur, eds, gallery) {
      // reassign things so it looks like circle
      var mi = $(st === 'r' ? eds[0] : eds[1]).removeAttr('style')
      if (st === 'r') {
        it.after(mi)
      } else {
        it.before(mi)
      }
      this.doclk(it, st, cur, gallery)
    }
  }

  $.fn.mgGallery = function () {
    var gallery = $(this)
    var it, eds

    if ($(itemClass, gallery).length > 3) {
      var cur = gallery.find(itemClass).filter(':nth-child(2)')
      cur.addClass(_currentClass)
      var mga = gallery.attr('data-merrygoround') || 'on'

      // catching prev next buttons
      $('[data-navigation]', gallery).click(function () {
        cur = $(currentClass, gallery)

        // ban click on animation
        if ($(movingClass, gallery).is('li')) return
        eds = $(itemClass, gallery).filter(':first, :last')

        // get the initial values from the CSS
        gallery.data('initData') || hlpr.init(cur, gallery)
        var st = $(this).data('navigation')
        switch (st) {
          case 'l':
            it = cur.prev()
            break
          case 'r':
            it = cur.next()
            break
        }

        // hook for helpers @REV question for optimization
        if (it.is(eds)) gallery.trigger('beforegalleryslideend', st)

        // last items hook and check for merrygoround functionality
        if (it.is(eds) && mga === 'on') {
          // here before animating might be done checking and ajax requests
          // + for more images either circling like now
          hlpr.cirle(it, st, cur, eds, gallery)
        } else if (it.is('li')) {
          // normal rotation
          hlpr.doclk(it, st, cur, gallery)
        }
      })
    }
  }
})
