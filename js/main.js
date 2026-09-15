/* ============================================================
   Navigation — scroll state
   ============================================================ */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ============================================================
   Navigation — mobile toggle
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close on link click
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ============================================================
   Scroll reveal — IntersectionObserver
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -48px 0px',
});

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   Ticker — duplicate track for seamless loop
   ============================================================ */
const tickerTrack = document.querySelector('.ticker__track');
if (tickerTrack) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

/* ============================================================
   Home — opening word drifts as the project sheet rises over it
   ============================================================ */
const openSeq = document.querySelector('.hm-open__seq');
const stillPreferred = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Hold the intro until the display webfont is ready, so the words never
   swap metrics part-way through the sequence. */
const opening = document.querySelector('.hm-open');

if (opening && document.fonts) {
  opening.classList.add('hm-open--hold');
  document.fonts.ready.then(() => opening.classList.remove('hm-open--hold'));
}

/* The scroll cue stops being relevant the moment the sheet starts rising. */
if (opening) {
  const flagScrolled = () =>
    opening.classList.toggle('hm-open--scrolled', window.scrollY > 24);

  window.addEventListener('scroll', flagScrolled, { passive: true });
  flagScrolled();
}

if (openSeq && !stillPreferred) {
  let ticking = false;

  const driftSeq = () => {
    const travel = Math.min(window.scrollY, window.innerHeight);
    openSeq.style.transform = `translate3d(0, ${(travel * -0.12).toFixed(2)}px, 0)`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(driftSeq);
    }
  }, { passive: true });
}
