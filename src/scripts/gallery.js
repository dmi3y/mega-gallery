/* global $ */
$(function mgGallery () {
  $.fn.mgGallery = function () {
    var gallery = $(this)
    var inner = gallery.find('.mg-inner')

    var navigation = gallery.find('[data-navigation]')
    navigation.click(function (ev) {
      var dir = this.dataset.navigation
      var firstChild = inner.find('li:first-child')
      inner.find('li:last-child')[dir](firstChild)
    })
  }
})
