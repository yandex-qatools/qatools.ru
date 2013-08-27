/**
 *    ON LOAD
 **/

$(window).load(function () {
    $(document.body).addClass('loaded');
});
$(document).ready(function () {
    $(document.body).addClass('js');
});

/**
 * Smoothscrolling
 */
var initializeSmoothscroll = function () {
    $(document).on('click', '*[data-smoothscroll]', function (e) {
        var element = $(this);

        var id = element.attr('data-smoothscroll');

        if (id && id != '') {
            element = $(id);
        }
        ;

        if (element && element.length > 0) {
            if (e && e.preventDefault) e.preventDefault();
            this.blur();

            var header = $('header');
            var headerSize = header && header.length > 0 ? header.height() : 0;

            $('html, body').animate({
                scrollTop: element.offset().top - (headerSize + 40)
            }, 1200, 'easeInOutExpo');
        }
    });
};


$(function () {
    initializeSmoothscroll();
});