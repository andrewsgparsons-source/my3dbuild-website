/* My3DBuild — Main JS
   Lightweight interactions, no framework needed */

(function() {
  'use strict';

  // ===== CONFIG =====
  var CONFIGURATOR_URL = 'https://andrewsgparsons-source.github.io/Parametric-shed2-staging/configurator.html';
  var isMobile = window.innerWidth <= 768 || navigator.maxTouchPoints > 1;

  // ===== HEADER SCROLL EFFECT =====
  var header = document.querySelector('.header');

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== MOBILE NAV TOGGLE =====
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      mainNav.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    mainNav.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ===== FULLSCREEN CONFIGURATOR =====
  var fullscreenEl = document.getElementById('configuratorFullscreen');
  var iframe = document.getElementById('configuratorIframe');
  var launchBtn = document.getElementById('launchConfiguratorBtn');
  var backBtn = document.getElementById('configuratorBackBtn');
  var iframeLoaded = false;

  function openConfigurator() {
    if (isMobile) {
      // Mobile: navigate directly (no iframe overhead)
      window.location.href = CONFIGURATOR_URL;
      return;
    }

    // Desktop: fullscreen takeover
    if (!iframeLoaded) {
      iframe.src = CONFIGURATOR_URL;
      iframeLoaded = true;
    }
    fullscreenEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeConfigurator() {
    fullscreenEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (launchBtn) {
    launchBtn.addEventListener('click', openConfigurator);
  }

  // Bottom CTA button
  var ctaLaunchBtn = document.getElementById('ctaLaunchBtn');
  if (ctaLaunchBtn) {
    ctaLaunchBtn.addEventListener('click', openConfigurator);
  }

  if (backBtn) {
    backBtn.addEventListener('click', closeConfigurator);
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && fullscreenEl.classList.contains('active')) {
      closeConfigurator();
    }
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');

      // Configurator links → open fullscreen
      if (href === '#configurator') {
        e.preventDefault();
        // Scroll to the section first so they see the launch card
        var section = document.getElementById('configurator');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      var target = document.querySelector(href);
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
