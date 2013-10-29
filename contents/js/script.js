'use strict';

/* global $, Modernizr */

//GOOGLE ANALYTICS
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-40760324-1', 'jehantremback.com');
ga('send', 'pageview');



//TOPBAR AFFIX
var targetFromTop = $('#affix').offset().top;
$(document).on('scroll', function() {
  if (Modernizr.mq('only all and (min-width: 767px)')) {
    var documentScroll = $(document).scrollTop();
    if (targetFromTop < (documentScroll)) {
      $('#affix').addClass('-affixed');
    } else {
      $('#affix').removeClass('-affixed');
    }
  }
});


//MODAL
//Activate
$('*[data-modal-id]').on('click', function(){
  var id = $(this).attr('data-modal-id'),
  target = $('#' + id);
  target.addClass('md-show');
});

//Dismiss
$('.md-overlay, .md-modal').on('click', function(){
  $(this).removeClass('md-show');
});

$('.md-close').on('click', function(){
  $(this).parents('.modal-bg').removeClass('md-show');
});

$('.md-content').on('click', function(e){
  e.stopPropagation();
});


//FORM SCRIPTS
function validateEmail(email) {
    var regex = /@/;
    return regex.test(email);
}

function validateForm(form) {
  var honeypot = form.find('*[data-val="honey"]'),
  requireds = form.find('*[data-val="required"]'),
  notice = form.find('*[data-val="notice"]');

  //Invalidate immediately if there are flies in the honey
  var check = !honeypot.val().length;

  requireds.each(function(){
    $(this).removeClass('_wrong');
    if ( !$(this).val().length ) {
      check = false;
      $(this).addClass('_wrong');
      notice.text('Please fill all the required fields.');
    }
    if ( $(this).attr('type') === 'email' && !validateEmail($(this).val()) ) {
      check = false;
      $(this).addClass('_wrong');
      notice.text('Please enter a valid email address.');
    }
  });

  if ( check ) {
    form.submit();
  }

}


$('*[data-val="submit"]').on('click', function() {
  validateForm($(this).parents('form'));
});


//IMAGE ZOOM AND PAN
var zoomNpan = function(zoom) {
  zoom.append('<div class="toggle"><i class="icon-zoom-in z_in"></i><i class="icon-zoom-out z_out"></i></div>');

  var z_in = zoom.find('.z_in')
    , z_out = zoom.find('.z_out')
    , img = zoom.find('img')
  ;

  z_in.on('click', function() {
    //Set zoom el height to avoid collapse
    var small_height = img.height();

    zoom.height(small_height);
    zoom.addClass('zoomed');
    $.pep.toggleAll(true);

    //Restore abs pos
    img.css('position', 'absolute').pep().css('top', '0').css('left', '0');
  });

  z_out.on('click', function() {
    zoom.removeClass('zoomed');
    //Remove abs pos
    img.css('position', 'static');
    $.pep.toggleAll(false);
  });
};


//SLIDESHOW
$(function() {
    var slide = $('#slideshow .slide')
      // , slideshow = $('#slideshow')
      , counter = $('#slideshow .counter')
      , index = 0
      , interval
      , slideNext
      , slidePrev
      , slideChange
    ;


        // This fades out the slide and counter with an old index, 
        //fades in the one with a new index, and changes the old index to new.
        slideChange = function (newIndex) {
          //Really janky hack to stop page scrolling to top because of 
          //slide being hidden momentarily and slide height not being explicit.
          // height = slideshow.height();
          // slideshow.height(height + 1);

          counter.eq(index).removeClass('active');
          slide.eq(index).removeClass('active');
          counter.eq(newIndex).addClass('active');
          slide.eq(newIndex).addClass('active');

          index = newIndex;
        };

        //This calls the slideChange and sets the new index to the one ahead.
        slideNext = function () {
          slideChange((index + 1) % slide.length);
        };

        //This calls the slideChange and sets the new index to the one behind.
        slidePrev = function () {
          slideChange((index - 1) % slide.length);
        };

    //This stuff happens at the beginning and hides all slides except for the one at the index.
    slide.eq(index).addClass('active');
    counter.eq(index).addClass('active');

    //This binds the next and previous to the arrows.
    $('.slide-left').click(slidePrev);
    $('.slide-right').click(slideNext);

    //This calls the slide change to the index of the proper counter.
    counter.click(function () {
      slideChange(counter.index(this));
    });

    //This calls the slideChange on a set interval and also disables it on hover.
    interval = setInterval(slideNext, 6740);
    $('#slideshow').hover(function () {
        clearInterval(interval);
    }, function () {
        interval = setInterval(slideNext, 6740);
    });
});


//INITIALIZE
var init = function() {
  $('#contact-form').attr('action', window.location.pathname + '?=thanks');
  if (window.location.search.match(/\?=thanks/)) {
    $('#thanks-modal').addClass('md-show');
  }
  zoomNpan($('.zoom'));
  hljs.initHighlighting();
}();
