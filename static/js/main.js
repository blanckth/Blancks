(function($) {
  'use strict';
  /* --/ Typed /--*/
  if ($('.text-slider').length == 1) {
    const typed_strings = $('.text-slider-items').text();
    const typed = new Typed('.text-slider', {
      strings: typed_strings.split(','),
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30,
    });
  }
  //
})(jQuery);
