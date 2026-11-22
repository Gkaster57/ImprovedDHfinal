/*
 * Navigation layer for the "Wes Anderson Influences" StoryMap.
 *
 * The story content (headlines, text, images, captions, credits, locations)
 * is NOT stored or edited here. It is loaded unchanged from the published
 * KnightLab StoryMap. If KnightLab can't be reached, an exact, unmodified
 * copy saved in data/published.json is used instead.
 *
 * This script only adds navigation: a table of contents, previous/next
 * buttons, a slide counter, a progress bar, keyboard shortcuts and
 * shareable links to individual slides (e.g. index.html#slide-4).
 */
(function () {
  'use strict';

  var LIVE_URL = 'https://uploads.knightlab.com/storymapjs/0a9a05b0f3202d24d2d8ab63022cae0a/wes-anderson-influences/published.json';
  var LOCAL_URL = 'data/published.json';
  var SCRIPT_PATH = 'https://cdn.knightlab.com/libs/storymapjs/latest/js';
  var MOBILE_QUERY = window.matchMedia('(max-width: 860px)');

  var storymap = null;
  var slides = [];
  var current = -1;

  var el = {
    list: document.getElementById('contents-list'),
    prev: document.getElementById('prev'),
    next: document.getElementById('next'),
    counterCurrent: document.getElementById('counter-current'),
    counterTotal: document.getElementById('counter-total'),
    progress: document.getElementById('progress-bar'),
    toggle: document.getElementById('toggle-contents'),
    scrim: document.getElementById('scrim'),
    storymap: document.getElementById('storymap')
  };

  /* ---------- helpers ---------- */

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  // Convert the headline HTML from the StoryMap into plain text for the
  // table of contents (the words themselves are left exactly as written).
  function plainText(html) {
    var t = document.createElement('template');
    t.innerHTML = html || '';
    return (t.content.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function slideFromHash() {
    var m = /^#slide-(\d+)$/.exec(window.location.hash);
    return m ? parseInt(m[1], 10) - 1 : 0;
  }

  function clamp(n) { return Math.max(0, Math.min(slides.length - 1, n)); }

  /* ---------- data loading ---------- */

  function fetchJSON(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) { throw new Error(url + ' returned ' + r.status); }
      return r.json();
    }).then(function (d) {
      if (!d || !d.storymap || !d.storymap.slides) { throw new Error('No StoryMap data in ' + url); }
      return d;
    });
  }

  function loadData() {
    return fetchJSON(LIVE_URL).catch(function (err) {
      console.warn('Using saved copy of the StoryMap:', err.message);
      return fetchJSON(LOCAL_URL);
    });
  }

  /* ---------- table of contents ---------- */

  function renderContents() {
    el.list.innerHTML = '';
    slides.forEach(function (slide, i) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#slide-' + (i + 1);
      a.className = 'contents-link';
      a.dataset.index = i;

      var num = document.createElement('span');
      num.className = 'contents-num';
      num.textContent = pad(i + 1);

      var title = document.createElement('span');
      title.className = 'contents-title';
      title.textContent = plainText(slide.text && slide.text.headline);

      a.appendChild(num);
      a.appendChild(title);
      a.addEventListener('click', function (e) {
        e.preventDefault();
        goTo(i);
        if (MOBILE_QUERY.matches) { setContentsOpen(false); }
      });
      li.appendChild(a);
      el.list.appendChild(li);
    });
    el.counterTotal.textContent = pad(slides.length);
  }

  /* ---------- state ---------- */

  function setCurrent(n) {
    if (n === current) { return; }
    current = n;

    el.counterCurrent.textContent = pad(n + 1);
    el.progress.style.width = (slides.length > 1 ? (n / (slides.length - 1)) * 100 : 100) + '%';
    el.prev.disabled = n <= 0;
    el.next.disabled = n >= slides.length - 1;

    var links = el.list.querySelectorAll('.contents-link');
    links.forEach(function (a, i) {
      if (i === n) {
        a.setAttribute('aria-current', 'step');
        a.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        a.removeAttribute('aria-current');
      }
    });

    var target = '#slide-' + (n + 1);
    if (window.location.hash !== target) {
      history.replaceState(null, '', target);
    }
  }

  function goTo(n) {
    if (!storymap) { return; }
    n = clamp(n);
    if (n !== current) {
      storymap.goTo(n);
      setCurrent(n);
    }
  }

  /* ---------- contents panel ---------- */

  function setContentsOpen(open) {
    document.body.classList.toggle('contents-closed', !open);
    document.body.classList.toggle('contents-open', open);
    el.toggle.setAttribute('aria-expanded', String(open));
    el.scrim.hidden = !(open && MOBILE_QUERY.matches);
    // Let the StoryMap re-measure once the panel has finished sliding.
    window.setTimeout(refreshLayout, 320);
  }

  function refreshLayout() {
    if (storymap) { storymap.updateDisplay(); }
  }

  /* ---------- wiring ---------- */

  function bindControls() {
    el.prev.addEventListener('click', function () { goTo(current - 1); });
    el.next.addEventListener('click', function () { goTo(current + 1); });

    el.toggle.addEventListener('click', function () {
      setContentsOpen(el.toggle.getAttribute('aria-expanded') !== 'true');
    });
    el.scrim.addEventListener('click', function () { setContentsOpen(false); });

    document.addEventListener('keydown', function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) { return; }
      var tag = (e.target && e.target.tagName) || '';
      if (/INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable)) { return; }

      switch (e.key) {
        case 'ArrowRight': case 'PageDown': goTo(current + 1); e.preventDefault(); break;
        case 'ArrowLeft': case 'PageUp': goTo(current - 1); e.preventDefault(); break;
        case 'Home': goTo(0); e.preventDefault(); break;
        case 'End': goTo(slides.length - 1); e.preventDefault(); break;
        case 'Escape':
          if (MOBILE_QUERY.matches && document.body.classList.contains('contents-open')) { setContentsOpen(false); }
          break;
      }
    });

    window.addEventListener('hashchange', function () { goTo(slideFromHash()); });

    var resizeTimer;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refreshLayout, 150);
    });

    // Start with the contents panel closed on phones, open on larger screens.
    MOBILE_QUERY.addEventListener('change', function (q) { setContentsOpen(!q.matches); });
  }

  function build(data) {
    slides = data.storymap.slides;
    renderContents();

    var start = clamp(slideFromHash());
    el.storymap.innerHTML = '';

    storymap = new KLStoryMap.StoryMap('storymap', data, {
      script_path: SCRIPT_PATH,
      start_at_slide: start
    });

    // Keep our navigation in sync when the reader uses StoryMap's own
    // arrows, swipes, or clicks a marker on the map.
    storymap.on('change', function (e) {
      if (e && typeof e.current_slide === 'number') { setCurrent(e.current_slide); }
    });

    setCurrent(start);
  }

  bindControls();
  setContentsOpen(!MOBILE_QUERY.matches);

  loadData().then(build).catch(function (err) {
    console.error(err);
    el.storymap.innerHTML = '<p class="loading">Sorry, the story could not be loaded. ' +
      '<a href="https://uploads.knightlab.com/storymapjs/0a9a05b0f3202d24d2d8ab63022cae0a/wes-anderson-influences/index.html">Open the original StoryMap</a>.</p>';
  });
})();
