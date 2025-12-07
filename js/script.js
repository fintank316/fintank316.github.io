$(document).ready(function () {

  // 1. TESTIMONIAL CAROUSEL
  let current = 0;
  const $slides = $('.testimonial');
  const $dots = $('.dot');

  function showSlide(n) {
    $slides.removeClass('active').eq(n).addClass('active');
    $dots.removeClass('active').eq(n).addClass('active');
    current = n;
  }

  $dots.click(function () { showSlide($(this).index()); });
  setInterval(() => { showSlide((current + 1) % $slides.length); }, 7000);
  showSlide(0);

  // 2. ACTIVE NAV LINK + SMOOTH SCROLL
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  $(`.nav-link[href="${currentPage}"]`).addClass('active');

  // Smooth scrolling for all nav links
  $('a.nav-link, a[href^="#"]').on('click', function(e) {
    if (this.hash !== '') {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 116
      }, 800);
    }
  });

  // 3. AUTO-CLOSE MOBILE MENU
  $('.navbar-nav .nav-link').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });

  // 4. ANIMATED COUNTERS (Home page)
  function startCounters() {
    $('.counter').each(function() {
      const $this = $(this);
      const target = $this.data('target');
      $({count: 0}).animate({count: target}, {
        duration: 2200,
        easing: 'swing',
        step: function(now) {
          $this.text(Math.ceil(now));
        }
      });
    });
  }

  // Trigger counters once when scrolled into view
  $(window).on('scroll', function() {
    const counterTop = $('.counter').first().offset().top - $(window).height();
    if ($(window).scrollTop() > counterTop) {
      startCounters();
      $(window).off('scroll'); // run only once
    }
  });

  // 5. BACK TO TOP BUTTON
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('#backToTop').fadeIn();
    } else {
      $('#backToTop').fadeOut();
    }
  });

  $('#backToTop').click(function() {
    $('html, body').animate({scrollTop: 0}, 600);
  });

  // 6. CONTACT FORM VALIDATION + SUCCESS MESSAGE
  const $form = $('#contactForm');
  if ($form.length) {
    const $name = $('#name'), $email = $('#email'), $phone = $('#phone'), $message = $('#message');

    $form.on('submit', function(e) {
      e.preventDefault();
      let valid = true;

      $('.form-control').removeClass('invalid');
      $('.error-msg').hide();

      if ($name.val().trim().length < 2) { $name.addClass('invalid').next('.error-msg').show(); valid = false; }
      const emailVal = $email.val().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) { $email.addClass('invalid').next('.error-msg').show(); valid = false; }
      if ($message.val().trim().length < 10) { $message.addClass('invalid').next('.error-msg').show(); valid = false; }
      if ($phone.val().trim() !== '' && !/^[0-9+\-\s()]+$/.test($phone.val())) { $phone.addClass('invalid').next('.error-msg').show(); valid = false; }

      if (valid) {
        $('.success-message').fadeIn(600).delay(5000).fadeOut(600);
        $form[0].reset();
      }
    });

    $('.form-control').on('input', function() {
      $(this).removeClass('invalid');
      $(this).next('.error-msg').hide();
    });
  }

});