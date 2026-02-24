/* My3DBuild — Main JS
   Lightweight interactions, no framework needed */

(function() {
  'use strict';

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector('.header');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      mainNav.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close nav when a link is clicked
    mainNav.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== FADE-IN ON SCROLL (Intersection Observer) =====
  var animateEls = document.querySelectorAll(
    '.step-card, .feature-card, .building-card, .craft-content, .section-header'
  );

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animateEls.forEach(function(el) {
      el.classList.add('animate-in');
      observer.observe(el);
    });
  }

})();
