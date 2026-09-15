/* ============================================================
   CONTENT — the project archive
   ------------------------------------------------------------
   One source of truth. Every page that lists projects reads from
   here, so adding or reordering work is a single edit.

   Nothing in this file describes how a project looks. Sizes,
   colours, type and layout live in the theme (css/museum.css);
   class names live in the renderer (js/render.js).

   Paths are relative to the site root. Pages that sit in a
   subfolder pass their own prefix via data-base on the mount,
   so the same record works from / and from /projects/.

   Fields
     num       catalogue number, shown in the card
     name      display name
     slug      folder under /projects/ — also the route
     category  discipline label
     year      as shown
     note      optional extra label (rendered in the accent)
     image     { src, alt, focal } — focal is object-position
     imageWide optional alternate for full-width presentation
     surface   'photo' (default) | 'panel' for the dark drawing
     drawing   true when the card shows the working drawing
     edge      true when a render sits on white and needs a hairline
   ============================================================ */

window.KO_PROJECTS = [
  {
    num: '01',
    name: 'Grill Speaker',
    slug: 'grill-speaker',
    category: 'Product Design',
    year: '2025',
    image: {
      src: 'projects/grill-speaker/images/Grill/Main.png',
      alt: 'Grill Speaker, exploded view of the modular street speaker',
      focal: '50% 50%'
    },
    edge: true
  },
  {
    num: '02',
    name: 'Pure Mountain Fun',
    slug: 'pmf',
    category: 'Industrial Design',
    year: '2025',
    image: {
      src: 'projects/pmf/images/PMF/Main.png',
      alt: 'Pure Mountain Fun, snow play kit laid out on fresh snow',
      focal: '50% 46%'
    }
  },
  {
    num: '03',
    name: 'Stark Watch',
    slug: 'stark-watch',
    category: 'Product Design',
    year: '2023',
    note: 'In development',
    surface: 'panel',
    drawing: true
  },
  {
    num: '04',
    name: 'Basics Packaging',
    slug: 'basics-packaging',
    category: 'Brand & Packaging',
    year: '2026',
    image: {
      src: 'projects/basics-packaging/images/Basics/1.png',
      alt: 'Basics Packaging, four cartons photographed in daylight',
      focal: '50% 50%'
    }
  },
  {
    num: '05',
    name: 'MNLegit',
    slug: 'mnlegit',
    category: 'Brand / Content / Product',
    year: '2025',
    image: {
      src: 'projects/mnlegit/images/MNLegit/Main.jpg',
      alt: 'MNLegit, apparel campaign photography',
      focal: '50% 38%'
    },
    imageWide: {
      src: 'projects/mnlegit/images/MNLegit/WIDEBOI-1.png',
      alt: 'MNLegit, apparel campaign photography',
      focal: '50% 50%'
    }
  }
];
