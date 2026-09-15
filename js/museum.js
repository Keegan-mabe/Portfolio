/* ============================================================
   MUSEUM — theme behaviour
   Nav state, mobile nav, scroll reveals, scroll cue.
   ============================================================ */

const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Navigation ------------------------------------------- */
const nav = document.querySelector('.ex-nav');
const navToggle = document.querySelector('.ex-nav__toggle');
const navLinks = document.querySelector('.ex-nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Page scroll state ------------------------------------
   Drives the nav hairline and retires the scroll cue.          */
let queued = false;

const readScroll = () => {
  const y = window.scrollY;
  if (nav) nav.classList.toggle('is-scrolled', y > 8);
  document.documentElement.classList.toggle('is-scrolled-page', y > 24);
  queued = false;
};

window.addEventListener(
  'scroll',
  () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(readScroll);
    }
  },
  { passive: true }
);

readScroll();

/* ---- Reveals ----------------------------------------------
   Each card uncovers once, on approach. No continuous scroll
   binding — the work should settle, not track the wheel.

   Exposed globally because rendered content arrives after this
   script runs; render.js calls it once the cards exist.        */
const revealObserver =
  still || !('IntersectionObserver' in window)
    ? null
    : new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );

window.KO_OBSERVE_REVEALS = function () {
  document.querySelectorAll('.ex-reveal:not(.is-visible)').forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('is-visible');
  });
};

window.KO_OBSERVE_REVEALS();

/* ============================================================
   Status line — reports the real viewport and the active
   breakpoint. Names match the theme's own media queries, so the
   readout describes the CSS rather than guessing at it.
   ============================================================ */
const statusSize = document.querySelector('[data-viewport-size]');
const statusBreak = document.querySelector('[data-viewport-label]');

if (statusSize || statusBreak) {
  const nameFor = (w) => (w <= 768 ? 'Mobile' : w <= 1024 ? 'Tablet' : 'Desktop');
  let shown = null;

  const report = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (statusSize) statusSize.textContent = w + ' \u00d7 ' + h;

    const name = nameFor(w);
    if (statusBreak && name !== shown) {
      /* Only the discrete change is animated; the numbers just update. */
      if (shown === null || still) {
        statusBreak.textContent = name;
      } else {
        statusBreak.classList.add('is-changing');
        setTimeout(() => {
          statusBreak.textContent = name;
          statusBreak.classList.remove('is-changing');
        }, 200);
      }
      shown = name;
    }
  };

  let reporting = false;
  window.addEventListener('resize', () => {
    if (reporting) return;
    reporting = true;
    requestAnimationFrame(() => { report(); reporting = false; });
  });

  report();
}
