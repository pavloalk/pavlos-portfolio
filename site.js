/* ═══════════════════════════════════════════════════════
   Shared behavior — Pavlos Aliko Portfolio
   Loaded by every page. Each block checks what exists on
   the page and skips itself when it doesn't apply.

   Per-page tuning via attributes on <body>:
   - data-reveal-threshold  (default 0.12)
   - data-reveal-margin     (default "0px 0px -32px 0px")
   - data-nav-enter         (default "to-case-study")
   ═══════════════════════════════════════════════════════ */

// ── Scroll reveal ──
(function () {
  var body = document.body;
  var threshold = parseFloat(body.getAttribute('data-reveal-threshold') || '0.12');
  var margin = body.getAttribute('data-reveal-margin') || '0px 0px -32px 0px';

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: threshold, rootMargin: margin }
  );
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
})();

// ── Touch active state — clears immediately on finger lift ──
(function () {
  document.querySelectorAll('.back-nav-btn, .back-nav-theme-btn, .nav-dock-btn').forEach(function (btn) {
    btn.addEventListener('touchstart', function () { btn.classList.add('pressed'); }, { passive: true });
    btn.addEventListener('touchend', function () { btn.classList.remove('pressed'); });
    btn.addEventListener('touchcancel', function () { btn.classList.remove('pressed'); });
  });
})();

// ── Theme toggle ──
(function () {
  var themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', function () {
    document.body.classList.add('theme-transitioning');
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    setTimeout(function () { document.body.classList.remove('theme-transitioning'); }, 400);
  });
})();

// ── Back nav dock transitions (subpages only) ──
(function () {
  var backNav = document.querySelector('.back-nav');
  var backBtn = document.getElementById('backBtn');
  if (!backNav || !backBtn) return;

  var separators = backNav.querySelectorAll('.back-nav-separator');
  var backNavItems = [
    { el: backNav.querySelector('.back-nav-btn'),       enterFrom: 'translateX(-8px)', exitTo: 'translateX(8px)'  },
    { el: separators[0],                                separator: true },
    { el: backNav.querySelector('.back-nav-title'),     enterFrom: 'translateX(8px)',  exitTo: 'translateX(-8px)' },
    { el: separators[1],                                separator: true },
    { el: backNav.querySelector('.back-nav-theme-btn'), enterFrom: 'translateX(8px)',  exitTo: 'translateX(-8px)' },
  ];
  var EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  // Entrance (arriving from home)
  var enterKey = document.body.getAttribute('data-nav-enter') || 'to-case-study';
  var transition = sessionStorage.getItem('nav-transition');

  if (transition === enterKey) {
    var sourceWidth = sessionStorage.getItem('nav-source-width');
    sessionStorage.removeItem('nav-transition');
    sessionStorage.removeItem('nav-source-width');

    document.fonts.ready.then(function () {
      var targetWidth = Math.ceil(backNav.offsetWidth);

      backNavItems.forEach(function (item) { item.el.style.transition = 'none'; });

      backNavItems.forEach(function (item) {
        item.el.style.opacity = '0';
        item.el.style.transform = item.separator ? 'scaleY(0)' : item.enterFrom;
      });

      backNav.style.overflow = 'hidden';
      backNav.style.width = sourceWidth;

      backNav.offsetHeight; // force reflow

      backNav.style.transition = 'width 0.32s ' + EASING;
      backNav.style.width = targetWidth + 'px';

      backNavItems.forEach(function (item, i) {
        var delay = 60 + i * 36;
        item.el.style.transition =
          'transform 0.28s ' + EASING + ' ' + delay + 'ms, ' +
          'opacity 0.28s ' + EASING + ' ' + delay + 'ms';
        item.el.style.transform = item.separator ? 'scaleY(1)' : 'translateX(0)';
        item.el.style.opacity = '1';
      });

      setTimeout(function () {
        backNav.style.transition = '';
        backNav.style.width = '';
        backNav.style.overflow = '';
        backNavItems.forEach(function (item) {
          item.el.style.transition = '';
          item.el.style.transform = '';
          item.el.style.opacity = '';
        });
      }, 500);
    });
  }

  // Exit (going back to home)
  backBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var href = backBtn.getAttribute('href');

    sessionStorage.setItem('nav-transition', 'to-home');
    sessionStorage.setItem('nav-source-width', backNav.offsetWidth + 'px');

    backNavItems.forEach(function (item, i) {
      var delay = i * 40;
      item.el.style.transition =
        'transform 0.22s ' + EASING + ' ' + delay + 'ms, ' +
        'opacity 0.22s ' + EASING + ' ' + delay + 'ms';
      item.el.style.transform = item.separator ? 'scaleY(0)' : item.exitTo;
      item.el.style.opacity = '0';
    });

    setTimeout(function () { window.location.href = href; }, 300);
  });

  // Keep the home entrance animation working when the visitor uses the
  // browser's back arrow (which restores home from cache and skips the
  // click handler above). Stash the nav width on the way out.
  window.addEventListener('pagehide', function () {
    sessionStorage.setItem('nav-transition', 'to-home');
    sessionStorage.setItem('nav-source-width', backNav.offsetWidth + 'px');
  });
})();
