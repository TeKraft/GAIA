/* moving background infinity

$(function () {
    var x = 1;

    setInterval(function () {
        x -= 1;
        $('body').css('background-position', x + 'px 0');
         console.log();
    }, 50);
})



/** http://api.jquery.com/focus/ 
$("input").focus(function () {
    $(this).next("span").css("display", "inline").fadeOut(1000);
});

*/

/* moving background + login.css */

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
            // y--;  
            x--;
            console.log( x);
          
            //if you need to scroll image horizontally -  
            // uncomment x and comment y  
        } else if (y > -280) {
            body.css("backgroundPosition", x + 'px' + ' ' + y + 'px');
            y--;
            // x--; 
            console.log( y);

        
        }
       // else if (x < 21) {
        //    body.css("backgroundPosition", x + 'px' + ' ' + y + 'px');
            // y--;  
        //    x++;}


         else {
            clearInterval(timer);
        }
    }, 50);

})(jQuery);