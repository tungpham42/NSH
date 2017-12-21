/*
   ClickMap jQuery Plugin
   By Jay Salvat
   http://www.jaysalvat.com/
*/
(function($) { 
$.fn.saveClicks = function() {
    $(this).bind('mousedown.clickmap', function(evt) {
        $.post('/clickmap/clickmap.php', {
            x:evt.pageX,
            y:evt.pageY,
            l:escape(document.location.pathname)
        });
    });
};
$.fn.stopSaveClicks = function() {
     $(this).unbind('mousedown.clickmap');
};
$.displayClicks = function(settings) {
    $('<div id="clickmap-overlay"></div>').appendTo('body');
    $('<div id="clickmap-loading"></div>').appendTo('body');
    $.get('/clickmap/clickmap.php', {l:escape(document.location.pathname)},
        function(html) {
            $(html).appendTo('body');
            $('#clickmap-loading').remove();
        }
    );
};
$.removeClicks = function() {
    $('#clickmap-overlay').remove();
    $('#clickmap-container').remove();
};
})(jQuery); 