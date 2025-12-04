$(document).ready(function () {

  // ————————————————————————————————————————————————
  // 1. TESTIMONIAL CAROUSEL (auto-rotating slider)
  // ————————————————————————————————————————————————
  let current = 0;                       // Track current testimonial index
  const $slides = $('.testimonial');     // All testimonial elements
  const $dots = $('.dot');               // Navigation dots under testimonials

  // Show a specific slide + highlight matching dot
  function showSlide(n) {
    $slides.removeClass('active').eq(n).addClass('active');
    $dots.removeClass('active').eq(n).addClass('active');
    current = n; // update index
  }

  // Dot click manually switches slide
  $dots.click(function () {
    showSlide($(this).index());
  });

  // Auto-rotation every 7 seconds
  setInterval(() => {
    showSlide((current + 1) % $slides.length);
  }, 7000);

  showSlide(0); // Initialise with first slide active


  // ————————————————————————————————————————————————
  // 2. ACTIVE NAV LINK HIGHLIGHTING
  // ————————————————————————————————————————————————
  // Extract the filename from the URL (e.g., "about.html")
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  // Add the "active" class to the matching nav item
  $(`.nav-link[href="${currentPage}"]`).addClass('active');


  // ————————————————————————————————————————————————
  // 3. CONTACT FORM VALIDATION (client-side checks)
  // Only runs when contact form exists on page
  // ————————————————————————————————————————————————
  const $form = $('#contactForm');
  if ($form.length) {  // Ensure we are on contact.html

    // Cache form inputs
    const $name    = $('#name');
    const $email   = $('#email');
    const $phone   = $('#phone');
    const $message = $('#message');

    // Form submit handler
    $form.on('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Clear previous error states
      $('.form-control').removeClass('invalid');
      $('.error-msg').hide();

      // ——— Name validation
      if ($name.val().trim().length < 2) {
        $name.addClass('invalid').next('.error-msg').show();
        valid = false;
      }

      // ——— Email validation
      const emailVal = $email.val().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check
      if (!emailRegex.test(emailVal)) {
        $email.addClass('invalid').next('.error-msg').show();
        valid = false;
      }

      // ——— Message length validation
      if ($message.val().trim().length < 10) {
        $message.addClass('invalid').next('.error-msg').show();
        valid = false;
      }

      // ——— Optional phone: only validate if user entered something
      if ($phone.val().trim() !== '' && !/^[0-9+\-\s()]+$/.test($phone.val())) {
        $phone.addClass('invalid').next('.error-msg').show();
        valid = false;
      }

      // ——— If everything checks out: success message + reset
      if (valid) {
        alert('Thank you! Your message has been sent. We’ll reply within the hour.');
        $form[0].reset();
      }
    });

    // Remove error styles in real time as user types
    $('.form-control').on('input', function () {
      $(this).removeClass('invalid');
      $(this).next('.error-msg').hide();
    });
  }

});
