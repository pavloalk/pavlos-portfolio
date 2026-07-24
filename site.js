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

  // Built from whatever the nav actually holds, so it works whether the last
  // control is the theme toggle (experience, styleguide) or the Present button
  // (case studies, where the theme toggle now lives in a separate pill).
  var backNavItems = Array.prototype.map.call(backNav.children, function (el, i) {
    if (el.classList.contains('back-nav-separator')) return { el: el, separator: true };
    // The first control (Back) enters from the left; the rest from the right.
    if (i === 0) return { el: el, enterFrom: 'translateX(-8px)', exitTo: 'translateX(8px)' };
    return { el: el, enterFrom: 'translateX(8px)', exitTo: 'translateX(-8px)' };
  });
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

// ── Presentation mode (opt-in via body[data-present-enabled]) ──
// One slide per heading, built straight from the page so there is nothing to
// keep in sync: title + eyebrow on the left, a single image on the right, and
// any card block under the heading collapsed to a label + short summary
// (curated via a data-present attribute, else the card's first sentence).
// Headings with no image keep the previous slide's image so the text isn't
// left alone. Advance with the on-screen arrows, the arrow keys, or space;
// Esc exits.
(function () {
  if (!document.body.hasAttribute('data-present-enabled')) return;
  var openBtn = document.getElementById('presentBtn');
  var page = document.querySelector('.page');
  if (!openBtn || !page) return;

  var TITLE_SEL = '.cs-h1, .cs-h2, .cs-change-title';
  var CARD_SEL = '.cs-opportunity-card, .cs-baw-card, .cs-order-card, ' +
                 '.cs-stat-pill, .cs-retro-part, .cs-goal-card, ' +
                 '.cs-kpi-card, .cs-moment-card';

  var slides = null;
  var idx = 0;
  var sub = 0;          // which window of the current image is showing
  var subImg = 0;       // which image of a sliding pair is showing (sequential)
  var winCount = 1;     // how many windows the current image needs
  var pendingSub = null;  // where to land once the next image has measured
  var overlay, stage, titlecol, eyebrowEl, titleEl, cardsEl, bulletsEl, counterEl, prevBtn, nextBtn, imgFrame, imgView, imgEl, dotsEl, lineEl, thumbEl;

  function firstSentence(el) {
    if (!el) return '';
    var t = (el.textContent || '').trim().replace(/\s+/g, ' ');
    var m = t.match(/^.*?[.!?](\s|$)/);
    return (m ? m[0] : t).trim();
  }

  function eyebrowFor(title) {
    var head = title.closest('.cs-sticky-head');
    if (head) {
      var lab = head.querySelector('.cs-label, .cs-change-eyebrow');
      if (lab) return lab.textContent.trim();
    }
    var prev = title.previousElementSibling;
    if (prev && (prev.classList.contains('cs-label') || prev.classList.contains('cs-change-eyebrow'))) {
      return prev.textContent.trim();
    }
    return '';
  }

  function cardData(el) {
    if (el.classList.contains('cs-stat-pill')) {
      var v = el.querySelector('.cs-stat-pill-value');
      var l = el.querySelector('.cs-stat-pill-label');
      return { label: v ? v.textContent.trim() : '', summary: l ? l.textContent.trim() : '' };
    }
    var h = el.querySelector('h4, h5');
    var summary = el.getAttribute('data-present');
    if (!summary) summary = firstSentence(el.querySelector('p'));
    return { label: h ? h.textContent.trim() : '', summary: summary };
  }

  function usableImg(img) {
    if (img.closest('.cs-comparison-after')) return false;   // the "before" shot
    if (img.classList.contains('cs-toggle-img') && !img.classList.contains('is-shown')) return false;
    return true;
  }

  function build() {
    var nodes = page.querySelectorAll(TITLE_SEL + ', ' + CARD_SEL + ', img');
    var out = [];
    var cur = null;
    nodes.forEach(function (n) {
      if (n.matches(TITLE_SEL)) {
        var bulletsAttr = n.getAttribute('data-present-bullets');
        var bullets = bulletsAttr
          ? bulletsAttr.split('|').map(function (s) { return s.trim(); }).filter(Boolean)
          : [];
        cur = { title: n.textContent.trim(), eyebrow: eyebrowFor(n), cards: [], bullets: bullets, visual: null, node: n };
        out.push(cur);
      } else if (!cur) {
        return;
      } else if (n.tagName === 'IMG') {
        if (cur.visual) return;   // first visual under a heading wins
        var toggleView = n.closest('.cs-toggle-view');
        if (toggleView) {
          // A whole switch set: every toggle image becomes a step (a dot),
          // captured once from the container. Mobile-tagged shots are flagged
          // so a phone can show only those.
          var list = [];
          toggleView.querySelectorAll('.cs-toggle-img').forEach(function (im) {
            list.push({
              src: im.currentSrc || im.src,
              alt: im.alt || '',
              mobile: im.classList.contains('cs-toggle-img--mobile'),
              slide: im.hasAttribute('data-present-slide')
            });
          });
          if (list.length) cur.visual = { type: 'switch', images: list };
        } else if (usableImg(n)) {
          // A single image: windows into the line if tagged data-present-slide,
          // otherwise just fits the frame.
          cur.visual = { type: 'slide', src: n.currentSrc || n.src, alt: n.alt || '', slide: n.hasAttribute('data-present-slide') };
        }
      } else {
        cur.cards.push(cardData(n));
      }
    });
    // Carry the last real visual forward into headings that have none.
    var lastVisual = null;
    out.forEach(function (s) {
      if (s.visual) lastVisual = s.visual;
      else s.visual = lastVisual;
    });
    // A plain closing slide: centred text only, no image carried in.
    out.push({ title: 'Thank you!', eyebrow: '', cards: [], bullets: [], visual: null, node: null, thanks: true });
    return out;
  }

  function arrowBtn(kind, label, path) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'present-arrow present-arrow--' + kind;
    b.setAttribute('aria-label', label);
    b.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="' + path + '" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return b;
  }

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'present-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Presentation');

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'present-close';
    close.setAttribute('aria-label', 'Exit presentation');
    close.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M4 4L14 14M14 4L4 14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>';
    close.addEventListener('click', closePresent);

    stage = document.createElement('div');
    stage.className = 'present-stage';

    titlecol = document.createElement('div');
    titlecol.className = 'present-titlecol';

    eyebrowEl = document.createElement('p');
    eyebrowEl.className = 'present-eyebrow';
    titleEl = document.createElement('h2');
    titleEl.className = 'present-title';
    cardsEl = document.createElement('div');
    cardsEl.className = 'present-cards';
    bulletsEl = document.createElement('ul');
    bulletsEl.className = 'present-bullets';

    var navRow = document.createElement('div');
    navRow.className = 'present-nav';
    prevBtn = arrowBtn('prev', 'Previous slide', 'M11 4L6 9L11 14');
    nextBtn = arrowBtn('next', 'Next slide', 'M7 4L12 9L7 14');
    counterEl = document.createElement('span');
    counterEl.className = 'present-counter';
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    navRow.appendChild(prevBtn);
    navRow.appendChild(counterEl);
    navRow.appendChild(nextBtn);

    // Blur/tint band behind the arrows when they pin to the bottom on mobile.
    // Five compounding backdrop-blur layers, same build as the section-heading
    // scrim. CSS hides it on desktop.
    var navScrim = document.createElement('div');
    navScrim.className = 'present-nav-scrim';
    navScrim.setAttribute('aria-hidden', 'true');
    for (var si = 0; si < 5; si++) navScrim.appendChild(document.createElement('span'));
    navRow.appendChild(navScrim);

    titlecol.appendChild(eyebrowEl);
    titlecol.appendChild(titleEl);
    titlecol.appendChild(cardsEl);
    titlecol.appendChild(bulletsEl);

    var imagecol = document.createElement('div');
    imagecol.className = 'present-imagecol';
    imgFrame = document.createElement('div');
    imgFrame.className = 'present-imageframe';
    imgView = document.createElement('div');
    imgView.className = 'present-imageview';
    imgEl = document.createElement('img');
    imgEl.addEventListener('load', onImgLoad);
    imgView.appendChild(imgEl);
    imgFrame.appendChild(imgView);
    dotsEl = document.createElement('div');
    dotsEl.className = 'present-dots';
    imgFrame.appendChild(dotsEl);   // floats over the frame's right edge
    lineEl = document.createElement('div');
    lineEl.className = 'present-line';
    lineEl.setAttribute('aria-hidden', 'true');
    thumbEl = document.createElement('div');
    thumbEl.className = 'present-line-thumb';
    lineEl.appendChild(thumbEl);
    imgFrame.appendChild(lineEl);   // same spot as the dots; only one shows
    imagecol.appendChild(imgFrame);

    stage.appendChild(titlecol);
    stage.appendChild(imagecol);

    // The arrows sit centred below the whole stage, not inside the text column.
    var frame = document.createElement('div');
    frame.className = 'present-frame';
    frame.appendChild(stage);
    frame.appendChild(navRow);

    var topbar = document.createElement('div');
    topbar.className = 'present-topbar';
    var topTitle = document.createElement('span');
    topTitle.className = 'present-topbar-title';
    topTitle.textContent = 'Present mode';

    // Blur/tint band behind the header when it pins to the top on mobile.
    // Mirror of the nav scrim: five compounding backdrop-blur layers, strongest
    // against the top edge so content softens as it rises under the header.
    // CSS hides it on desktop.
    var topScrim = document.createElement('div');
    topScrim.className = 'present-topbar-scrim';
    topScrim.setAttribute('aria-hidden', 'true');
    for (var ti = 0; ti < 5; ti++) topScrim.appendChild(document.createElement('span'));

    topbar.appendChild(topScrim);
    topbar.appendChild(topTitle);
    topbar.appendChild(close);

    overlay.appendChild(topbar);
    overlay.appendChild(frame);
    document.body.appendChild(overlay);
  }

  function render() {
    var s = slides[idx];
    overlay.classList.toggle('is-thanks', !!s.thanks);
    eyebrowEl.textContent = s.eyebrow || '';
    eyebrowEl.style.display = s.eyebrow ? '' : 'none';
    titleEl.textContent = s.title;

    cardsEl.innerHTML = '';
    s.cards.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'present-card';
      if (c.label) {
        var lab = document.createElement('span');
        lab.className = 'present-card-label';
        lab.textContent = c.label;
        card.appendChild(lab);
      }
      if (c.summary) {
        var p = document.createElement('p');
        p.textContent = c.summary;
        card.appendChild(p);
      }
      cardsEl.appendChild(card);
    });
    cardsEl.style.display = s.cards.length ? '' : 'none';

    bulletsEl.innerHTML = '';
    s.bullets.forEach(function (b) {
      var li = document.createElement('li');
      li.textContent = b;
      bulletsEl.appendChild(li);
    });
    bulletsEl.style.display = s.bullets.length ? '' : 'none';

    // Re-play the text entrance (fade + 8px slide-up) on every section change.
    titlecol.classList.remove('is-entering');
    void titlecol.offsetWidth;
    titlecol.classList.add('is-entering');

    paintVisual();
    updateNav();
  }

  // Paint the image for the current step. For a switch set that's the current
  // image; for a slide it's the single image. Fades in only when the src
  // actually changes, so carrying an image forward leaves it untouched.
  function paintVisual() {
    var cur = currentSrc();
    if (!cur) {
      imgEl.removeAttribute('src');
      imgFrame.classList.add('is-empty');
      winCount = 1;
      renderIndicators();
      updateNav();
      return;
    }
    imgFrame.classList.remove('is-empty');
    imgEl.alt = cur.alt || '';
    if (imgEl.getAttribute('src') !== cur.src) {
      imgEl.classList.add('is-loading');   // hide the old one until the new is ready
      imgEl.src = cur.src;                 // onImgLoad measures + fades in
    } else {
      layoutImage();                       // same image; no fade, just re-measure
    }
  }

  // A phone-width screen. A switch set that carries a mobile design collapses
  // to just that image here.
  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  // The images a switch set actually shows: on mobile, only the mobile-tagged
  // ones when any exist; everywhere else, all of them.
  function switchImages(v) {
    if (!isMobile()) return v.images;
    var only = v.images.filter(function (im) { return im.mobile; });
    return only.length ? only : v.images;
  }

  // A switch set that, after the mobile collapse, is a single Slide-tagged image
  // behaves like a windowed slide image (full width, step down) instead of a
  // fitted switch step. Returns that image, or null when the set stays a switch.
  function slideOverride(v) {
    if (!v || v.type !== 'switch') return null;
    var imgs = switchImages(v);
    return (imgs.length === 1 && imgs[0].slide) ? imgs[0] : null;
  }

  // A switch set with any slide-tagged image plays as a sequence rather than
  // fitted shots you tap between: step through each image, then roll on to the
  // next. Each image windows only if it's slide-tagged; untagged ones just fit
  // as a single step. Returns that image list, or null when the set stays a
  // normal tap-to-switch pair.
  function slidingSet(v) {
    if (!v || v.type !== 'switch') return null;
    var imgs = switchImages(v);
    if (imgs.length < 2) return null;
    var anySlide = imgs.some(function (im) { return im.slide; });
    return anySlide ? imgs : null;
  }

  // The image to show for the current slide and step.
  function currentSrc() {
    var v = slides[idx].visual;
    if (!v) return null;
    if (v.type === 'switch') {
      var imgs = switchImages(v);
      if (!imgs.length) return null;
      // A sliding pair advances image by image (subImg); a tap-to-switch set
      // moves through its images with the step index (sub).
      var pick = slidingSet(v) ? subImg : sub;
      return imgs[Math.min(pick, imgs.length - 1)];
    }
    return { src: v.src, alt: v.alt };
  }

  function onImgLoad() {
    imgEl.classList.remove('is-loading');
    layoutImage();
    imgEl.classList.remove('is-fading-in');
    void imgEl.offsetWidth;
    imgEl.classList.add('is-fading-in');
  }

  // Position a windowed (slide) image for the current window; animate only on
  // deliberate steps.
  function setTransform(animate) {
    var imgH = imgEl.offsetHeight;
    var viewH = imgView.clientHeight;
    var over = Math.max(0, imgH - viewH);
    var offset = Math.min(sub * viewH, over);
    imgEl.classList.toggle('is-sliding', !!animate);  // transition transform only on steps
    imgEl.style.transform = 'translateY(' + (-Math.round(offset)) + 'px)';
  }

  // Measure the current visual and work out how many steps it spans: one per
  // image for a switch set, one per window for a tall slide image.
  function layoutImage() {
    var v = slides[idx] ? slides[idx].visual : null;
    if (!imgEl.getAttribute('src') || !v) { winCount = 1; renderIndicators(); updateNav(); return; }

    var slideImg = slideOverride(v);
    var seq = slidingSet(v);

    // Switch set: each image just fits the frame; stepping swaps images.
    if (v.type === 'switch' && !slideImg && !seq) {
      imgEl.classList.add('is-fit');
      imgEl.classList.remove('is-sliding');
      imgEl.style.transform = 'translateY(0)';
      winCount = switchImages(v).length || 1;
      if (sub > winCount - 1) sub = winCount - 1;
      renderIndicators();
      updateNav();
      return;
    }

    // Slide image. Only images tagged data-present-slide window and slide;
    // everything else fits its height inside the frame, never stepping. Inside
    // a sequence each image follows its own tag, so a plain shot mid-sequence
    // just fits.
    var seqImg = seq ? seq[Math.min(subImg, seq.length - 1)] : null;
    var slideable = slideImg ? true
      : seq ? !!seqImg.slide
      : !!v.slide;
    imgEl.classList.toggle('is-fit', !slideable);
    if (!slideable) {
      winCount = 1;
      sub = 0;
      pendingSub = null;
      imgEl.classList.remove('is-sliding');
      imgEl.style.transform = 'translateY(0)';
      renderIndicators();
      updateNav();
      return;
    }

    var imgH = imgEl.offsetHeight;
    if (!imgH) return;   // not painted yet; the 'load' handler will retry
    var viewH = imgView.clientHeight;
    var over = imgH - viewH;
    winCount = over > 1 ? Math.ceil(over / viewH) + 1 : 1;

    if (pendingSub === 'last') sub = winCount - 1;
    else if (typeof pendingSub === 'number') sub = Math.min(pendingSub, winCount - 1);
    else if (sub > winCount - 1) sub = winCount - 1;
    pendingSub = null;

    setTransform(false);   // land without animating a slide-to-slide swap
    renderIndicators();
    updateNav();
  }

  // Show the right step indicator: dots for a switch set, the minimap line for
  // a windowed slide image, nothing for a single image that just fits.
  function renderIndicators() {
    var v = slides[idx] ? slides[idx].visual : null;
    if (v && v.type === 'switch' && !slideOverride(v) && !slidingSet(v)) {
      lineEl.style.display = 'none';
      renderDots();
    } else {
      dotsEl.style.display = 'none';
      renderLine();
    }
  }

  // Dots: one per image in a switch set, the current one filled. Passive.
  function renderDots() {
    dotsEl.innerHTML = '';
    if (winCount <= 1) { dotsEl.style.display = 'none'; return; }
    dotsEl.style.display = '';
    for (var i = 0; i < winCount; i++) {
      var d = document.createElement('span');
      d.className = 'present-dot' + (i === sub ? ' is-active' : '');
      dotsEl.appendChild(d);
    }
  }

  // Minimap line: the dark thumb's height is the visible fraction of the image
  // and its top is the scroll position, so it lands flush at the bottom on the
  // last step. Passive.
  function renderLine() {
    if (winCount <= 1) { lineEl.style.display = 'none'; return; }
    lineEl.style.display = '';
    var imgH = imgEl.offsetHeight || 1;
    var viewH = imgView.clientHeight || 1;
    var over = Math.max(0, imgH - viewH);
    var offset = Math.min(sub * viewH, over);
    var visFrac = Math.min(1, viewH / imgH);
    var topFrac = offset / imgH;
    thumbEl.style.height = (visFrac * 100) + '%';
    thumbEl.style.top = (topFrac * 100) + '%';
  }

  function updateNav() {
    counterEl.textContent = (idx + 1) + ' / ' + slides.length;
    prevBtn.disabled = idx === 0 && sub === 0 && subImg === 0;
    nextBtn.disabled = idx === slides.length - 1 && sub === winCount - 1;
  }

  // Jump to another slide, landing on a given step (number, or 'last'). A switch
  // set can resolve its step now, since its image count is known without
  // measuring; a slide image waits for its load to measure its windows.
  function goSlide(nextIdx, subTarget) {
    if (nextIdx < 0 || nextIdx >= slides.length) return;
    idx = nextIdx;
    subImg = 0;
    var v = slides[idx].visual;
    var seq = slidingSet(v);
    if (seq) {
      // Entering backward lands on the last image at its bottom; forward on the
      // first image at its top. The window index waits for the measure.
      if (subTarget === 'last') subImg = seq.length - 1;
      sub = 0;
      pendingSub = (subTarget == null ? 0 : subTarget);
    } else if (v && v.type === 'switch' && !slideOverride(v)) {
      var n = switchImages(v).length || 1;
      sub = subTarget === 'last' ? n - 1 : Math.min(subTarget || 0, n - 1);
      pendingSub = null;
    } else {
      sub = 0;
      pendingSub = (subTarget == null ? 0 : subTarget);
    }
    render();   // text animates in; image fades only if it changed
  }

  // Step within the current visual: swap images for a switch set, slide windows
  // for a tall image. Returns false when there's no step left this direction.
  function step(dir) {
    var v = slides[idx].visual;
    var seq = slidingSet(v);

    // A sliding pair: step through the current image's windows, then roll on to
    // the next image in the set (or back to the previous one's bottom) before
    // the sequence hands off to the next section.
    if (seq) {
      var next = sub + dir;
      if (next >= 0 && next <= winCount - 1) {
        sub = next;
        setTransform(true);
        renderIndicators();
        updateNav();
        return true;
      }
      if (dir > 0 && subImg < seq.length - 1) {
        subImg += 1;
        sub = 0;
        pendingSub = 0;       // land at the top of the next image
        paintVisual();        // load it; the measure sets windows + indicators
        return true;
      }
      if (dir < 0 && subImg > 0) {
        subImg -= 1;
        pendingSub = 'last';  // land at the bottom of the previous image
        paintVisual();
        return true;
      }
      return false;           // edge of the whole set: hand off to the section
    }

    var target = sub + dir;
    if (target < 0 || target > winCount - 1) return false;
    sub = target;
    if (v && v.type === 'switch' && !slideOverride(v)) {
      paintVisual();        // swap image, fade in
    } else {
      setTransform(true);   // window slide
    }
    renderIndicators();
    updateNav();
    return true;
  }

  // One linear sequence: step through this visual, then roll on to the next.
  function next() {
    if (!step(1) && idx < slides.length - 1) goSlide(idx + 1, 0);
  }

  function prev() {
    if (!step(-1) && idx > 0) goSlide(idx - 1, 'last');
  }

  // Which heading am I currently reading? The last one whose top has scrolled
  // to (or above) a small band near the top of the viewport. Nothing past the
  // top yet → the first slide.
  function currentSlideIndex() {
    var threshold = 120;
    var found = 0;
    for (var i = 0; i < slides.length; i++) {
      var node = slides[i].node;
      if (node && node.getBoundingClientRect().top <= threshold) found = i;
    }
    return found;
  }

  function openPresent() {
    if (!slides) slides = build();
    if (!slides.length) return;
    if (!overlay) buildOverlay();
    idx = currentSlideIndex();
    sub = 0;
    subImg = 0;
    pendingSub = 0;
    render();
    document.body.classList.add('is-presenting');
    overlay.style.display = 'flex';
    void overlay.offsetWidth;
    overlay.classList.add('is-open');
    // Drop focus off the trigger so no focus ring shows on it while present
    // mode is open, or when Esc returns without moving focus anywhere.
    openBtn.blur();
  }

  function closePresent() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('is-presenting');
    setTimeout(function () {
      if (!overlay.classList.contains('is-open')) overlay.style.display = 'none';
    }, 320);
  }

  openBtn.addEventListener('click', openPresent);

  document.addEventListener('keydown', function (e) {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Escape') {
      closePresent();
    }
  });

  window.addEventListener('resize', function () {
    if (overlay && overlay.classList.contains('is-open')) layoutImage();
  });
})();
