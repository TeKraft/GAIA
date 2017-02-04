/**
  * @desc Function for making the backgroundimage in the index.html move to the side
  *
*/
(function ($) {
    var x = 0;
    var y = 0;
    //cache a reference to the banner
    var body = $("body");
    // set initial banner background position
    body.css('backgroundPosition', x + 'px' + ' ' + y + 'px');
    // scroll up background position every 90 milliseconds
    var timer = window.setInterval(function () {
        if (x > -2000) {
            body.css("backgroundPosition", x + 'px' + ' ' + y + 'px');
            x--;
            //if you need to scroll image horizontally -
            // uncomment x and comment y
        } else if (y > -280) {
            body.css("backgroundPosition", x + 'px' + ' ' + y + 'px');
            y--;
        }
        else {
          clearInterval(timer);
        }
    }, 50);
})(jQuery);
