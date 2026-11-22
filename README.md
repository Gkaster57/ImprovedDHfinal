# ImprovedDHfinal
Changes made to my final Digital Humanities project made by Claude Code

<p align="center">
  <a href="https://gkaster57.github.io/ImprovedDHfinal/"><strong>▶&nbsp; View the site: Wes Anderson Influences</strong></a>
  <br>
  <a href="https://gkaster57.github.io/ImprovedDHfinal/">gkaster57.github.io/ImprovedDHfinal</a>
</p>

| [▶ Live site](https://gkaster57.github.io/ImprovedDHfinal/) | [Original StoryMap](https://uploads.knightlab.com/storymapjs/0a9a05b0f3202d24d2d8ab63022cae0a/wes-anderson-influences/index.html) | [AI usage log](AI_USAGE_LOG.md) |
| :---: | :---: | :---: |

## About this project

**Wes Anderson Influences** is an interactive StoryMap showing the real-world places and cultures
that inspired Wes Anderson's films, from *Bottle Rocket* in Dallas to *The Phoenician Scheme* in Rome.

- **Original StoryMap (KnightLab):** https://uploads.knightlab.com/storymapjs/0a9a05b0f3202d24d2d8ab63022cae0a/wes-anderson-influences/index.html
- **Improved version (live site):** https://gkaster57.github.io/ImprovedDHfinal/
- **AI usage log:** [AI_USAGE_LOG.md](AI_USAGE_LOG.md)

### What was improved

- **Navigation:** a clickable table of contents, previous/next buttons, a slide counter, a progress
  bar, keyboard shortcuts (← →, Home, End) and shareable links to individual slides (`#slide-4`).
- **Appearance:** a Wes Anderson–inspired pastel palette, Futura-style headings, a symmetrical
  layout, and a mobile-friendly design.
- **Content:** the story is loaded directly from the published KnightLab StoryMap, with a backup
  copy in `data/published.json`. The site's design did not change any wording; later fact-check
  corrections were made in KnightLab at my request (see the [AI usage log](AI_USAGE_LOG.md)).

### Files

| File | Purpose |
| --- | --- |
| `index.html` | The page that displays the StoryMap |
| `css/style.css` | Visual design |
| `js/app.js` | Navigation features |
| `data/published.json` | Backup copy of the published StoryMap data |
| `AI_USAGE_LOG.md` | Record of AI (Claude Code) assistance |

### Viewing the site

The site is published with GitHub Pages at **https://gkaster57.github.io/ImprovedDHfinal/**
(also linked in the repository's **About** panel). It updates automatically whenever changes are
pushed to `main`.

You can link straight to any slide by adding `#slide-` and its number, for example
[#slide-9](https://gkaster57.github.io/ImprovedDHfinal/#slide-9) for *The Grand Budapest Hotel*.

To view it on your own computer instead, run `python3 -m http.server` in this folder and open
`http://localhost:8000`.
