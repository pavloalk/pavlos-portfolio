/* ═══════════════════════════════════════════════════════
   Shared behavior — Pavlos Aliko Portfolio
   Loaded by every page. Each block checks what exists on
   the page and skips itself when it doesn't apply.

   Per-page tuning via attributes on <body>:
   - data-reveal-threshold  (default 0.12)
   - data-reveal-margin     (default "0px 0px -32px 0px")
   - data-nav-enter         (default "to-case-study")
   ═══════════════════════════════════════════════════════ */

// ── Sticky section headings ──
// Every eyebrow immediately followed by its title gets wrapped in a
// .cs-sticky-head that pins to the top of the viewport. COLLAPSE_AT px after it
// pins, the big title cross-fades into a copy of itself set at eyebrow size, so
// the pinned bar stays two short lines tall.
//
// Nothing here positions anything. The pinning is CSS `position: sticky`, which
// the compositor handles along with the scroll itself; script that moves an
// element during a scroll always lands a frame late and wobbles. All this does
// is build the markup once and flip a class at a threshold, which cannot.
//
// Headings replace each other rather than stacking, and sticky gives that for
// free — provided each heading's immediate parent is the box holding what that
// heading owns, so it is pushed out exactly as its own content ends. See the
// note on .cs-sticky-head in design-system.css.
//
// Runs before the reveal block on purpose: it moves the .reveal class off the
// title and onto the wrapper (the title's own opacity is needed for the
// cross-fade), and the observer below picks up whichever elements carry it.
(function () {
  var COLLAPSE_AT = 8; // extra scroll past the pin before the title collapses
  var TITLE_FOR = { 'cs-label': 'cs-h2', 'cs-change-eyebrow': 'cs-change-title' };

  var heads = [];

  document.querySelectorAll('.cs-label, .cs-change-eyebrow').forEach(function (label) {
    var wanted = TITLE_FOR[label.classList.contains('cs-label') ? 'cs-label' : 'cs-change-eyebrow'];
    var title = label.nextElementSibling;
    if (!title || !title.classList.contains(wanted)) return;

    // Zero-height marker left where the heading sits in the flow — how far it
    // has scrolled past this is how far the heading is pinned.
    var sentinel = document.createElement('div');
    sentinel.className = 'cs-sticky-sentinel';
    label.parentNode.insertBefore(sentinel, label);

    var head = document.createElement('div');
    head.className = 'cs-sticky-head';
    label.parentNode.insertBefore(head, label);

    var swap = document.createElement('div');
    swap.className = 'cs-title-swap';

    if (title.classList.contains('reveal')) {
      title.classList.remove('reveal');
      swap.classList.add('reveal');
    }

    var mini = document.createElement('span');
    mini.className = 'cs-title-mini';
    mini.setAttribute('aria-hidden', 'true');
    mini.textContent = title.textContent;

    label.classList.add('cs-shead-label');
    title.classList.add('cs-shead-title');

    head.appendChild(label);
    head.appendChild(swap);
    swap.appendChild(title);
    swap.appendChild(mini);

    // The big title overflows the pinned box; this stands in for the height it
    // would have taken, so nothing below moves.
    var spacer = document.createElement('div');
    spacer.className = 'cs-shead-spacer';
    head.parentNode.insertBefore(spacer, head.nextSibling);

    // The scroll edge: five stacked blur layers, weakest first. Styling is all
    // in design-system.css — they only need to exist and be in order. Sits
    // inside the heading so sticky carries it along.
    var scrim = document.createElement('div');
    scrim.className = 'cs-shead-scrim';
    scrim.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 5; i++) scrim.appendChild(document.createElement('span'));
    head.insertBefore(scrim, head.firstChild);

    heads.push({
      head: head, sentinel: sentinel, spacer: spacer,
      label: label, title: title, mini: mini
    });
  });

  if (!heads.length) return;

  // Per heading: the collapsed copy takes its type from the eyebrow above it,
  // so each pattern shrinks to its own scale rather than a hardcoded one. Then
  // how tall the collapsed bar is, and how much height the big title gives up
  // by overflowing it.
  function measure() {
    heads.forEach(function (h) {
      var label = getComputedStyle(h.label);
      h.mini.style.fontSize = label.fontSize;
      h.mini.style.fontWeight = label.fontWeight;
      h.mini.style.letterSpacing = label.letterSpacing;
      h.mini.style.lineHeight = label.lineHeight;

      var box = getComputedStyle(h.head);
      var padding = parseFloat(box.paddingTop) + parseFloat(box.paddingBottom);

      h.bar = padding + (parseFloat(label.marginBottom) || 0) +
              h.label.offsetHeight + h.mini.offsetHeight;
      h.head.style.setProperty('--shead-bar', h.bar + 'px');
      h.spacer.style.height = Math.max(0, h.title.offsetHeight - h.mini.offsetHeight) + 'px';
    });
  }

  // Collapsed once the heading has been pinned for COLLAPSE_AT px, and it stays
  // that way while sticky walks it back out at the end of its box — expanding
  // it on the way out would flash the big title across the top of the screen.
  function update() {
    ticking = false;
    heads.forEach(function (h) {
      var pinnedBy = -h.sentinel.getBoundingClientRect().top;
      h.head.classList.toggle('is-stuck', pinnedBy >= COLLAPSE_AT);
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  measure();
  update();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
})();

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

// ── Image lightbox ──
// Click a case-study image to open it full size over a dimmed page. Close with
// the X, a click on the backdrop, or Escape. The comparison slider is left out
// on purpose — clicking it is how you scrub it.
(function () {
  var ZOOMABLE = [
    '.cs-image-frame img',
    '.cs-hero-image img',
    '.cs-two-img img',
    '.cs-mobile-item img'
  ].join(', ');

  var targets = document.querySelectorAll(ZOOMABLE);
  if (!targets.length) return;

  var overlay = null;
  var overlayImg = null;
  var lastFocused = null;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'cs-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    overlayImg = document.createElement('img');

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'cs-lightbox-close';
    close.setAttribute('aria-label', 'Close image');
    close.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M4 4L14 14M14 4L4 14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>' +
      '</svg>';
    close.addEventListener('click', hide);

    // A click on the image itself shouldn't dismiss; anywhere else should.
    overlayImg.addEventListener('click', function (e) { e.stopPropagation(); });
    overlay.addEventListener('click', hide);

    overlay.appendChild(overlayImg);
    overlay.appendChild(close);
    document.body.appendChild(overlay);
  }

  function show(img) {
    if (!overlay) build();
    overlayImg.src = img.currentSrc || img.src;
    overlayImg.alt = img.alt || '';
    lastFocused = document.activeElement;

    overlay.style.display = 'flex';
    document.body.classList.add('is-lightbox-open');
    void overlay.offsetWidth; // flush before transitioning in
    overlay.classList.add('is-open');
    overlay.querySelector('.cs-lightbox-close').focus();
  }

  function hide() {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('is-lightbox-open');
    if (lastFocused && lastFocused.focus) lastFocused.focus();

    // Keep it in the DOM but out of the way once the fade has finished.
    setTimeout(function () {
      if (!overlay.classList.contains('is-open')) overlay.style.display = 'none';
    }, 240);
  }

  targets.forEach(function (img) {
    img.classList.add('cs-zoomable');
    img.addEventListener('click', function () { show(img); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hide();
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
