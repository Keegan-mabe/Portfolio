/* ============================================================
   RENDERER — content in, theme markup out
   ------------------------------------------------------------
   The only place that knows this theme's class names. Swapping
   themes means a new CLASSES map plus its stylesheet; the
   records in data/projects.js never change.

   Usage — put a mount in the page and let it configure itself:

     <div data-projects
          data-base="../"           path back to the site root
          data-featured="01"        nums to run full width, wide crop
          data-large="02"           nums at two thirds
          data-small="03"           nums at one third
          data-wide="05"            nums at a panorama's own ratio
          data-priority="01"        num to load eagerly
          data-numbers="off">       hide the catalogue number in the UI
     </div>

   Anything not named falls back to `standard`. Prominence is a
   page decision, which is why it lives in the markup and not in
   the project records.
   ============================================================ */

(function () {
  'use strict';

  var CLASSES = {
    card:    'ex-card',
    variant: 'ex-card--',        /* + standard | large | small | featured | wide */
    link:    'ex-card__link',
    figure:  'ex-card__figure',
    panel:   'ex-card__figure--panel',
    edge:    'ex-card__figure--edge',
    img:     'ex-card__img',
    caption: 'ex-card__caption',
    num:     'ex-card__num',
    text:    'ex-card__text',
    name:    'ex-card__name',
    meta:    'ex-card__meta',
    cue:     'ex-card__cue',
    reveal:  'ex-reveal'
  };

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* The drawing stands in for photography on work that has none yet. */
  function surface(project) {
    if (!project.drawing) return '';
    return '<div class="stark-canvas">' +
             '<span class="stark-dev-label">Working drawing</span>' +
             (window.KO_STARK_DRAWING || '') +
           '</div>';
  }

  function picture(project, opts) {
    var img = (opts.wide && project.imageWide) || project.image;
    if (!img) return surface(project);

    return '<img src="' + esc(opts.base + img.src) + '"' +
             ' alt="' + esc(img.alt) + '"' +
             ' class="' + CLASSES.img + '"' +
             ' style="object-position: ' + esc(img.focal || '50% 50%') + '"' +
             (opts.priority
               ? ' fetchpriority="high" decoding="async"'
               : ' loading="lazy" decoding="async"') +
           '>';
  }

  function meta(project) {
    var parts = [project.category, project.year].filter(Boolean).join(' / ');
    if (project.note) parts += ' — ' + project.note;
    return parts;
  }

  function card(project, opts) {
    var figureClass = CLASSES.figure +
      (project.surface === 'panel' ? ' ' + CLASSES.panel : '') +
      (project.edge ? ' ' + CLASSES.edge : '');

    return '' +
      '<article class="' + CLASSES.card + ' ' + CLASSES.variant + opts.variant +
        ' ' + CLASSES.reveal + '">' +
        '<a href="' + esc(opts.base + 'projects/' + project.slug + '/index.html') +
          '" class="' + CLASSES.link + '">' +
          '<figure class="' + figureClass + '">' + picture(project, opts) + '</figure>' +
          '<figcaption class="' + CLASSES.caption + '">' +
            /* The number stays in the data either way — it drives the
               layout variants — this only decides whether it is shown. */
            (opts.numbers
              ? '<span class="' + CLASSES.num + '">' + esc(project.num) + '</span>'
              : '') +
            '<span class="' + CLASSES.text + '">' +
              '<h2 class="' + CLASSES.name + '">' + esc(project.name) + '</h2>' +
              '<span class="' + CLASSES.meta + '">' + esc(meta(project)) + '</span>' +
            '</span>' +
            '<span class="' + CLASSES.cue + '" aria-hidden="true">&rarr;</span>' +
          '</figcaption>' +
        '</a>' +
      '</article>';
  }

  var VARIANTS = ['featured', 'large', 'small', 'wide', 'standard'];

  function list(el, name) {
    return (el.getAttribute('data-' + name) || '').split(/[\s,]+/).filter(Boolean);
  }

  function mount(el) {
    var projects = window.KO_PROJECTS || [];
    var base = el.getAttribute('data-base') || '';
    var priority = list(el, 'priority');
    var numbers = el.getAttribute('data-numbers') !== 'off';

    var assigned = {};
    VARIANTS.forEach(function (name) {
      list(el, name).forEach(function (num) { assigned[num] = name; });
    });

    el.innerHTML = projects.map(function (project) {
      var variant = assigned[project.num] || 'standard';
      return card(project, {
        base: base,
        variant: variant,
        numbers: numbers,
        wide: variant === 'wide',
        priority: priority.indexOf(project.num) !== -1
      });
    }).join('');
  }

  function init() {
    var mounts = document.querySelectorAll('[data-projects]');
    for (var i = 0; i < mounts.length; i++) mount(mounts[i]);

    /* Reveals are wired after the cards exist. */
    if (window.KO_OBSERVE_REVEALS) window.KO_OBSERVE_REVEALS();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.KO_RENDER = { card: card, mount: mount, CLASSES: CLASSES };
}());
