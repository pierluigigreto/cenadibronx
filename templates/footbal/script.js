/* begin Page */
/* Created by Artisteer v3.1.0.46558 */
// css helper
(function($) {
    var data = [
        {str:navigator.userAgent,sub:'Chrome',ver:'Chrome',name:'chrome'},
        {str:navigator.vendor,sub:'Apple',ver:'Version',name:'safari'},
        {prop:window.opera,ver:'Opera',name:'opera'},
        {str:navigator.userAgent,sub:'Firefox',ver:'Firefox',name:'firefox'},
        {str:navigator.userAgent,sub:'MSIE',ver:'MSIE',name:'ie'}];
    for (var n=0;n<data.length;n++)	{
        if ((data[n].str && (data[n].str.indexOf(data[n].sub) != -1)) || data[n].prop) {
            var v = function(s){var i=s.indexOf(data[n].ver);return (i!=-1)?parseInt(s.substring(i+data[n].ver.length+1)):'';};
            $('html').addClass(data[n].name+' '+data[n].name+v(navigator.userAgent) || v(navigator.appVersion)); break;			
        }
    }
})(jQuery);
/* end Page */

/* begin Menu */
jQuery(function () {
    if (!jQuery.browser.msie || parseInt(jQuery.browser.version) > 7) return;
    jQuery('ul.style-hmenu>li:not(:first-child)').each(function () { jQuery(this).prepend('<span class="style-hmenu-separator"> </span>'); });
    if (!jQuery.browser.msie || parseInt(jQuery.browser.version) > 6) return;
    jQuery('ul.style-hmenu li').each(function () {
        this.j = jQuery(this);
        this.UL = this.j.children('ul:first');
        if (this.UL.length == 0) return;
        this.A = this.j.children('a:first');
        this.onmouseenter = function () {
            this.j.addClass('style-hmenuhover');
            this.UL.addClass('style-hmenuhoverUL');
            this.A.addClass('style-hmenuhoverA');
        };
        this.onmouseleave = function() {
            this.j.removeClass('style-hmenuhover');
            this.UL.removeClass('style-hmenuhoverUL');
            this.A.removeClass('style-hmenuhoverA');
        };
    });
});

jQuery(function() { setHMenuOpenDirection({container: "div.style-sheet-body", defaultContainer: "#style-main", menuClass: "style-hmenu", leftToRightClass: "style-hmenu-left-to-right", rightToLeftClass: "style-hmenu-right-to-left"}); });

function setHMenuOpenDirection(menuInfo) {
    var defaultContainer = jQuery(menuInfo.defaultContainer);
    defaultContainer = defaultContainer.length > 0 ? defaultContainer = jQuery(defaultContainer[0]) : null;

    jQuery("ul." + menuInfo.menuClass + ">li>ul").each(function () {
        var submenu = jQuery(this);
        var submenuWidth = submenu.outerWidth();
        var submenuLeft = submenu.offset().left;

        var mainContainer = submenu.parents(menuInfo.container);
        mainContainer = mainContainer.length > 0 ? mainContainer = jQuery(mainContainer[0]) : null;

        var container = mainContainer || defaultContainer;
        if (container != null) {
            var containerLeft = container.offset().left;
            var containerWidth = container.outerWidth();

            if (submenuLeft + submenuWidth >=
                    containerLeft + containerWidth) 
                /* right to left */
                submenu.addClass(menuInfo.rightToLeftClass).find("ul").addClass(menuInfo.rightToLeftClass);
            if (submenuLeft <= containerLeft)
                /* left to right */
                submenu.addClass(menuInfo.leftToRightClass).find("ul").addClass(menuInfo.leftToRightClass);
        }
    });
}
/* end Menu */

/* begin MenuSubItem */
jQuery(function () {
    jQuery("ul.style-hmenu ul li").hover(function () { jQuery(this).prev().children("a").addClass("style-hmenu-before-hovered"); }, 
        function () { jQuery(this).prev().children("a").removeClass("style-hmenu-before-hovered"); });
});

jQuery(function () {
    if (!jQuery.browser.msie) return;
    var ieVersion = parseInt(jQuery.browser.version);
    if (ieVersion > 7) return;

    /* Fix width of submenu items.
    * The width of submenu item calculated incorrectly in IE6-7. IE6 has wider items, IE7 display items like stairs.
    */
    jQuery.each(jQuery("ul.style-hmenu ul"), function () {
        var maxSubitemWidth = 0;
        var submenu = jQuery(this);
        var subitem = null;
        jQuery.each(submenu.children("li").children("a"), function () {
            subitem = jQuery(this);
            var subitemWidth = subitem.outerWidth();
            if (maxSubitemWidth < subitemWidth)
                maxSubitemWidth = subitemWidth;
        });
        if (subitem != null) {
            var subitemBorderLeft = parseInt(subitem.css("border-left-width"), 10) || 0;
            var subitemBorderRight = parseInt(subitem.css("border-right-width"), 10) || 0;
            var subitemPaddingLeft = parseInt(subitem.css("padding-left"), 10) || 0;
            var subitemPaddingRight = parseInt(subitem.css("padding-right"), 10) || 0;
            maxSubitemWidth -= subitemBorderLeft + subitemBorderRight + subitemPaddingLeft + subitemPaddingRight;
            submenu.children("li").children("a").css("width", maxSubitemWidth + "px");
        }
    });

    if (ieVersion > 6) return;
    jQuery("ul.style-hmenu ul>li:first-child>a").css("border-top-width", "1px");
});
/* end MenuSubItem */

/* begin Layout */
jQuery(function () {
     var c = jQuery('div.style-content');
    if (c.length !== 1) return;
    var s = c.parent().children('.style-layout-cell:not(.style-content)');


    if (jQuery.browser.msie && parseInt(jQuery.browser.version) < 8) {
        jQuery(window).bind('resize', function() {
            var w = 0;
            c.hide();
            s.each(function() { w += this.clientWidth; });
            c.w = c.parent().width(); c.css('width', c.w - w + 'px');
            c.show();
        });
    }

    jQuery(window).trigger('resize');
});/* end Layout */

/* begin VMenu */
jQuery(function() {
    if (!jQuery('html').hasClass('ie7')) return;
    jQuery('ul.style-vmenu li:not(:first-child),ul.style-vmenu li li li:first-child,ul.style-vmenu>li>ul').each(function () { jQuery(this).append('<div class="style-vmenu-separator"> </div><div class="style-vmenu-separator-bg"> </div>'); });
});
jQuery(function() {
    setOpenSubmenuWithNoReload({vMenuClass: "style-vmenu", activeClass: "active", hoveredClass: "hovered"});
});

function setOpenSubmenuWithNoReload(vMenuInfo) {
    jQuery("ul." + vMenuInfo.vMenuClass + " li").each(function () {
        var item = jQuery(this);
        item.children("a").bind("click", function(e) {
            var link = jQuery(this);
            var simple = link.siblings("ul").length == 0;
            link.parent().siblings().children("ul." + vMenuInfo.activeClass).slideUp(function() {
                jQuery(this).find("li, a, ul").removeClass(vMenuInfo.activeClass);
                jQuery(this).removeClass(vMenuInfo.activeClass).siblings("a").removeClass(vMenuInfo.activeClass);
                jQuery(this).css("display", "");
            });
            link.parent().siblings().children("a." + vMenuInfo.activeClass).removeClass(vMenuInfo.activeClass);
            link.parent().siblings().removeClass(vMenuInfo.activeClass);
            if (simple && !link.hasClass(vMenuInfo.activeClass)) {
                link.addClass(vMenuInfo.activeClass).parent().addClass(vMenuInfo.activeClass);
            }
            if (!simple) {
                if (link.hasClass(vMenuInfo.activeClass)) {
                    link.siblings("ul").slideUp("fast", function() {
                        jQuery(this).removeClass(vMenuInfo.activeClass).siblings("a").removeClass(vMenuInfo.activeClass).parent().removeClass(vMenuInfo.activeClass);
                        jQuery(this).css("display", "");
                    });
                } else {
                    link.siblings("ul").slideDown("fast", function() {
                        jQuery(this).addClass(vMenuInfo.activeClass).siblings("a").addClass(vMenuInfo.activeClass).parent().addClass(vMenuInfo.activeClass);
                        jQuery(this).css("display", "");
                    });
                }
                
                e.preventDefault();
                return false;
            }
        });
    });
}

/* end VMenu */

/* begin Button */
function artButtonSetup(className) {
    jQuery.each(jQuery("a." + className + ", button." + className + ", input." + className), function (i, val) {
        var b = jQuery(val);
        if (!b.parent().hasClass('style-button-wrapper')) {
            if (b.is('input')) b.val(b.val().replace(/^\s*/, '')).css('zoom', '1');
            if (!b.hasClass('style-button')) b.addClass('style-button');
            jQuery("<span class='style-button-wrapper'><span class='style-button-l'> </span><span class='style-button-r'> </span></span>").insertBefore(b).append(b);
            if (b.hasClass('active')) b.parent().addClass('active');
        }
        b.mouseover(function () { jQuery(this).parent().addClass("hover"); });
        b.mouseout(function () { var b = jQuery(this); b.parent().removeClass("hover"); if (!b.hasClass('active')) b.parent().removeClass('active'); });
        b.mousedown(function () { var b = jQuery(this); b.parent().removeClass("hover"); if (!b.hasClass('active')) b.parent().addClass('active'); });
        b.mouseup(function () { var b = jQuery(this); if (!b.hasClass('active')) b.parent().removeClass('active'); });
    });
}
jQuery(function() { artButtonSetup("style-button"); });

/* end Button */



jQuery(function() {
  artButtonSetup("button");
  artButtonSetup("readon");
  artButtonSetup("readmore");
});