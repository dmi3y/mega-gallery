/**
 * MG gallery main script
 */
$(function galleryCoverflow() {
    var delay = 200; //animation delay
    var hm = {};
    var hlpr;
    var bodyClass = ".mg-body";
    var itemClass = ".mg-item";
    var imgClass = ".mg-item-image";
    var movingClass = ".mg-moving";
    var _movingClass = "mg-moving";
    var currentClass = ".mg-current";
    var _currentClass = "mg-current";
    var teaserClass = ".mg-item-teaser";

    hlpr = { //helper hash
        init: function(cur, gallery) {
            cur.add(cur.prev('li')).add(cur.next('li')).each(function(ix) {
                var li = $(this);
                hm[ix] = {
                    l: li.css('left'),
                    r: li.css('right'),
                    t: li.css('top'),
                    w: $(imgClass, li).css('width'),
                    h: $(imgClass, li).css('height')
                }; // shortcuted object instead of array for better readability
                hm.r = hm[0];
                hm.d = hm[1];
                hm.l = hm[2]; //shortcuten for left, right and default
            });
            hm.lg = $(itemClass, gallery).length;
            gallery.data('initData', hm);
            return hm;
        },
        anim: function(wht, wre) {
            wht.addClass(_movingClass).animate({
                left: wre.l,
                right: wre.r,
                top: wre.t
            }, delay).find(imgClass).animate({
                width: wre.w,
                height: wre.h
            }, delay, function() {
                wht.toggleClass(_currentClass).removeClass(_movingClass);
            }).parents('li').find(teaserClass).fadeToggle(delay);
        },
        doclk: function(it, st, cur, gallery) {
            var wro = gallery.data('initData');
            this.anim(it, wro.d); //move new item to center (default position) and make current
            this.anim(cur, wro[st]); //move current to its new position
            gallery.trigger('galleryslide', st); //hook for helpers
        },
        cirle: function(it, st, cur, eds, gallery) {
            var mi = $(st == 'r' ? eds[0] : eds[1]).removeAttr('style'); //reassign things so it looks like circle
            if (st == 'r') {
                it.after(mi);
            } else {
                it.before(mi);
            }
            this.doclk(it, st, cur, gallery);
        }
    };

    $(bodyClass).each(function() { //assume if there will be several galleries of this type on the page
        var gallery = $(this),
            it, st, eds;

        if ( $(itemClass, gallery).length > 3 ) {
            var cur = gallery.find(itemClass).filter(":nth-child(2)");
            cur.addClass(currentClass);
            var mga = gallery.attr('data-merrygoround') || 'on';
            $('[data-navigation]', gallery).click(function() { //catching prev next buttons
                cur = $(currentClass, gallery);
                if ($(movingClass, gallery).is('li')) return; //ban click on animation
                eds = $(itemClass, gallery).filter(":first, :last");
                gallery.data('initData') ? '' : hlpr.init(cur, gallery); //get the initial values from the CSS
                switch (st = $(this).data('navigation')) {
                    case 'l':
                        it = cur.prev();
                        break;
                    case 'r':
                        it = cur.next();
                        break;
                }
                if (it.is(eds)) gallery.trigger('beforegalleryslideend', st); //hook for helpers @REV question for optimization
                if (it.is(eds) && mga == 'on') { //last items hook and check for merrygoround functionality
                    hlpr.cirle(it, st, cur, eds, gallery); /* here before animating might be done checking and ajax requests for more images either circling like now */
                } else if (it.is('li')) { //normal rotation
                    hlpr.doclk(it, st, cur, gallery);
                }
            });
        } 
    });
});
