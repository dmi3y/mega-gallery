/**
* Description:     Cover-flow gallery - with 3d like functionality WebsiteBundle:ContentLists:/protos/gallery-coverflow.html.twig
* Dependency (latest version it works with):      jQuery 1.7.2
* Version:         1.3
* 
* NOTE: some helpers related to configuration located into the gallery-slider.js
* @TODO needs to be refactored to have more clean variable names and more clean structure!!!!
*/
$(function galleryCoverflow(){
    var delay = 200; //animation delay
    var hm = {};
    var hlpr;
    hlpr = { //helper hash
        init:function (cur, gallery) {
            cur.add(cur.prev('li')).add(cur.next('li')).each(function (ix) {
                var li = $(this);
                hm[ix] = {
                    l:li.css('left'),
                    r:li.css('right'),
                    t:li.css('top'),
                    w:$('.fimg', li).css('width'),
                    h:$('.fimg', li).css('height')};// shortcuted object instead of array for better readability
                hm.r = hm[0];
                hm.d = hm[1];
                hm.l = hm[2]; //shortcuten for left, right and default
            });
            hm.lg = $('.coverflow-holder', gallery).length;
            gallery.data('initData', hm);
            return hm;
        },
        anim:function (wht, wre) {
            wht.addClass('moving').animate({
                left:wre.l,
                right:wre.r,
                top:wre.t
            }, delay).find('.fimg').animate({
                    width:wre.w,
                    height:wre.h
                }, delay, function () {
                    wht.toggleClass('cur').removeClass('moving');
                }).parents('li').find('.lgd').fadeToggle(delay);
        },
        doclk:function (it, st, cur, gallery) {
            var wro = gallery.data('initData');
            this.anim(it, wro.d);//move new item to center (default position) and make current
            this.anim(cur, wro[st]); //move current to its new position
            gallery.trigger('galleryslide', st); //hook for helpers
        },
        cirle:function (it, st, cur, eds, gallery) {
            var mi = $(st == 'r' ? eds[0] : eds[1]).removeAttr('style');//reassign things so it looks like circle
            if (st == 'r') {
                it.after(mi);
            }
            else {
                it.before(mi);
            }
            this.doclk(it, st, cur, gallery);
        }
    };

    $('.gallery-coverflow').each(function(){//assume if there will be several galleries of this type on the page
       var gallery = $(this), it, st, cur, eds;
       gallery.data('hlpr', hlpr);
       if ($('.coverflow-holder', gallery).length <= 2) return; // temp solution 
       var mga = gallery.attr('data-merrygoround') || 'on';
       $('*[class^=arw]', gallery).click(function(){//catching prev next buttons
           if ( $('.moving', gallery).is('li') ) return; //ban click on animation
           cur = $('.cur', gallery);
           eds = $('.coverflow-holder:last, .coverflow-holder:first', gallery);
           gallery.data('initData')? '': hlpr.init(cur, gallery);//get the initial values from the CSS
           switch(st = $(this).attr('class').charAt(4)){
               case 'l':
                    it = cur.prev();
               break;
               case 'r':
                    it = cur.next();
               break;
           }
           if ( it.is(eds) ) gallery.trigger('beforegalleryslideend', st); //hook for helpers @REV question for optimization
           if ( it.is(eds) && mga == 'on' ){ //last items hook and check for merrygoround functionality
               hlpr.cirle(it, st, cur, eds, gallery);/* here before animating might be done checking and ajax requests for more images either circling like now */
           }
           else if ( it.is('li') ) { //normal rotation
               hlpr.doclk(it, st, cur, gallery);
           }
       });
    }); 
});

/**
* Description:     Different general helpers for galleries scripts
* Dependency (latest version it works with):      jQuery 1.7.2
* Version:         1.0
*/

/* <- SETTINGS HELPERS -> 
 * 
 * it uses data- atributes, so there is nothing to initializate, everything you need just put appropriate arrtibute and its value to the gallery's root element
 * 
 * data-merrygoround - default on, place off to disable
 * data-autoscroll - default off (0), place any number wich is value in ms to enable
 * data-autoscrolldir - default ltr, autoscroll from left to right, possible value rtl did opposite
 * 
 * */

//autoscroll enabler - build over gallery-coverflow and gallery-slider galleries
$(function slidersAutoscroll(){
    //selector might be modified as *[class^=gallery] to support all future possible scripts
    $('[data-autoscroll]').each(function(){
        var el = $(this);
        var l = $('*[class^=arw-l]', el), r = $('*[class^=arw-r]', el), amt = r;
        var time = el.attr('data-autoscroll');
        var dir = el.attr('data-autoscrolldir') || 'ltr';
        switch (dir) {
            case 'ltr':
                amt = r;
            break;
            case 'rtl':
                amt = l;
            break;
        }
        var flg = true; //flag to check reverse autoplay
        el.on('galleryslide', function(){//catching prev next buttons with custom event
            flg = false; //everytime the gallery srolled flag goes to false
        });
        setInterval(function(){
                if (el.hasClass('paused')) return;
                amt.click();
                if (flg) {
                    amt == r? amt = l: amt = r; //change direction if we could not autoscroll futher
                    amt.click();//and instantly click to not have double pause
                } 
                flg = true; //set flag back to true
        }, time);
        el.on('hover touchstart touchend', function(){
                el.toggleClass('paused');
        });
    });    
});
