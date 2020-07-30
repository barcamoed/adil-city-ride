/*Sticky Header*/
// import $ from 'jquery';
$(window).scroll(function() {
  var sticky = $('#site-header'),
    scroll = $(window).scrollTop();
  if (scroll >= 400) sticky.addClass('sticky');
  else sticky.removeClass('sticky');
});

/*City Airports active*/
$('.cityairport .card').click(function() {
  $('.cityairport .card').removeClass('active');
  $(this).addClass('active');
});

/*faqs*/
$('.accordion .card-header').click(function() {
  $('.accordion .card').removeClass('active');
  $(this)
    .parent()
    .toggleClass('active');
});

/*tooltip*/
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

/*choose slider*/
$('.choosedesktopslider').owlCarousel({
  loop: false,
  margin: 0,
  nav: true,
  dots: false,
  dotsContainer: '.rightdots',
  dotsSpeed: 1000,

  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});
/*choose slider mobile*/
$('.choosemobileslider').owlCarousel({
  loop: false,
  margin: 0,
  nav: true,
  dots: false,
  dotsContainer: '.rightdots',
  dotsSpeed: 1000,

  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 2,
    },
    768: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});
/*driver slider*/
$('.driverslider').owlCarousel({
  loop: false,
  margin: 0,
  nav: true,
  dots: false,
  dotsContainer: '.rightdots',
  dotsSpeed: 1000,
  mouseDrag: false,
  touchDrag: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    768: {
      items: 1,
    },

    991: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});
/*car slider*/
$('.carslider').owlCarousel({
  loop: false,
  margin: 0,
  nav: true,
  dots: false,
  dotsContainer: '.rightdots',
  dotsSpeed: 1000,

  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    991: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});
