# ImprovedDHfinal
Changes made to my final Digital Humanities project made by Claude Code


## About this project

**Wes Anderson Influences** is an interactive StoryMap showing the real-world places and cultures
that inspired Wes Anderson's films, from *Bottle Rocket* in Dallas to *The Phoenician Scheme* in Rome.

- **Original StoryMap (KnightLab):** https://uploads.knightlab.com/storymapjs/0a9a05b0f3202d24d2d8ab63022cae0a/wes-anderson-influences/index.html
- **Improved version:** `index.html` in this repository (see "Viewing the site" below)
- **AI usage log:** [AI_USAGE_LOG.md](AI_USAGE_LOG.md)

### What was improved

- **Navigation:** a clickable table of contents, previous/next buttons, a slide counter, a progress
  bar, keyboard shortcuts (← →, Home, End) and shareable links to individual slides (`#slide-4`).
- **Appearance:** a Wes Anderson–inspired pastel palette, Futura-style headings, a symmetrical
  layout, and a mobile-friendly design.
- **Content:** unchanged. The story is loaded directly from the published KnightLab StoryMap, with an
  exact backup copy in `data/published.json`.

### Files

| File | Purpose |
| --- | --- |
| `index.html` | The page that displays the StoryMap |
| `css/style.css` | Visual design |
| `js/app.js` | Navigation features |
| `data/published.json` | Unmodified backup of the StoryMap data |
| `AI_USAGE_LOG.md` | Record of AI (Claude Code) assistance |

### Viewing the site

Turn on GitHub Pages (Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`), and
the site will be available at `https://gkaster57.github.io/ImprovedDHfinal/`.

To view it on your own computer instead, run `python3 -m http.server` in this folder and open
`http://localhost:8000`.
