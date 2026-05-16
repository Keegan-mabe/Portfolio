# CLAUDE.md
# Portfolio Website Project

## Goal
Build a modern, clean, semi-minimal design portfolio website for an industrial/product designer. The site should feel polished, cool, and professional, with interesting transitions and motion, but not overly flashy.

## Visual Direction
- Main colors: white and black
- Accent color: orange: `#FA5000`
- Style: modern, minimal, sharp, design-forward
- Avoid emojis, gimmicky visuals, or overly playful UI
- Use strong typography, clean spacing, large imagery, and smooth transitions
- The site should feel appropriate for product design, UX/UI, automotive, and powersports work

## Main Sections
The website needs these main areas:

1. **Home**
   - Landing page with a strong hero section
   - Show hero images from multiple product projects
   - Should quickly communicate that this is a product/UX/industrial design portfolio
   - Include clean navigation to Products, UX, and About

2. **Products**
   - Showcase physical product design projects
   - Each project should have its own page or section
   - Use large images, process work, sketches, renders, prototypes, and concise descriptions

3. **UX**
   - Showcase UX/UI, interface, app, website, or vehicle interface work
   - Emphasize user flows, wireframes, systems thinking, interaction design, and design decisions

4. **About Me**
   - Short designer bio
   - Include background in industrial design, product design, UX/UI, woodworking, metalworking, and powersports
   - Keep tone professional but personal

## File Structure
Use a clean project folder structure where each project has its own folder. Keep that project’s images inside its own folder so assets stay organized and Claude does not mix up files.

Suggested structure:

```text
Portfolio/
├── CLAUDE.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── projects/
│   ├── bunni-trike/
│   │   ├── index.html
│   │   └── images/
│   ├── grill-speaker/
│   │   ├── index.html
│   │   └── images/
│   ├── stark-watch/
│   │   ├── index.html
│   │   └── images/
│   └── basics-packaging/
│       ├── index.html
│       └── images/
├── ux/
│   ├── index.html
│   └── images/
└── about/
    └── index.html