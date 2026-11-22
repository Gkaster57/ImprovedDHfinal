# AI Usage Log

This log documents how AI (Claude Code, an AI coding assistant made by Anthropic) was used in this
Digital Humanities project, *Wes Anderson Influences*. It records what I asked for, what the AI did,
and which files it created or changed, so the AI's contribution is transparent and separate from my
own research and writing.

**Ground rule for every session:** the AI may change navigation, layout and visual design, but it
must not remove, rewrite or add to the written content of the StoryMap (headlines, slide text,
captions, credits, images, or map locations). All of that writing is my own.

---

## How to add a new entry

Copy the template below to the bottom of this file for each new session with an AI tool.

```markdown
## Session N — YYYY-MM-DD

**Tool / model:**
**My request(s):**
> (paste what you asked)

**What the AI did:**
-

**Files changed:**
-

**Content check:** Did the AI change any of my writing? (Yes / No — explain)
**My review:** What I checked, kept, or rejected.
```

---

## Session 1 — 2026-11-22

**Tool / model:** Claude Code (Claude Opus 5.5), run in the terminal on my Mac in the `claude` folder.

### My requests

> Please improve the navigation and appearance of my digital humanities project without changing
> any of the information I have already typed. Please do not remove or rewrite anything I have
> written so far. I would also like to implement an AI usage log that documents my interactions with
> Claude code. Please commit changes to my github repository found here:
> https://github.com/Gkaster57/ImprovedDHfinal please work in the Claude folder on my Mac, and this
> is the URL to my project: https://storymap.knightlab.com/edit/?id=wes-anderson-influences

The AI explained that the StoryMap **editor** link requires my KnightLab login and asked for the
public **published** link instead (or access to my browser). My follow-up:

> okay, you can use my chrome browser. The link to the project is:
> https://uploads.knightlab.com/storymapjs/0a9a05b0f3202d24d2d8ab63022cae0a/wes-anderson-influences/index.html

(The published link contained everything needed, so the AI did not end up using my Chrome browser.)

### What the AI did

1. **Cloned my GitHub repository** (`Gkaster57/ImprovedDHfinal`) into the `claude` folder on my Mac.
2. **Read my published StoryMap data** (`published.json` from KnightLab) to see the 13 slides,
   their headlines, text, media and map locations.
3. **Saved an exact, unmodified backup copy** of that data as `data/published.json`. It was
   checked byte-for-byte against the KnightLab file to confirm nothing was altered.
4. **Built a new front page (`index.html`)** that displays my StoryMap using the same StoryMapJS
   library KnightLab uses. The page loads the story **live from my published KnightLab StoryMap**, so
   any future edits I make in the KnightLab editor will appear automatically. If KnightLab is
   unavailable, it falls back to the saved copy.
5. **Improved navigation** (`js/app.js`):
   - A **Contents** panel listing all 13 slides by their headlines; click any one to jump to it.
   - **Previous / Next** buttons and a **slide counter** (e.g. `05 / 13`) in the header.
   - A **progress bar** under the header showing how far through the story the reader is.
   - **Keyboard shortcuts:** ← / → (or Page Up / Page Down) to change slides, Home / End to jump
     to the first or last slide, Esc to close the contents drawer on phones.
   - **Shareable slide links:** the address bar updates to `#slide-1`, `#slide-2`, … so a link can
     open directly on a specific slide.
   - Everything stays in sync with StoryMap's own arrows and map markers.
   - A **mobile layout**: on phones the contents panel becomes a slide-out drawer.
   - Accessibility: a "skip to the story" link, visible keyboard focus, labelled buttons, and
     reduced motion for readers who turn animations off.
6. **Improved appearance** (`css/style.css`) with a Wes Anderson–inspired design:
   - A pastel palette (pink, plum, mustard, powder blue, cream) and symmetrical, centered header.
   - Typography: *Jost* (a Futura-style typeface strongly associated with Anderson's title cards)
     for headings and *Libre Baskerville* for reading text.
   - Headlines are **displayed** in capital letters with letter spacing. This is a styling effect
     only (CSS `text-transform`); the underlying headline text is unchanged.
   - Softer, vintage-toned map tiles; framed images; restyled StoryMap arrows and captions.
7. **Created this AI usage log** (`AI_USAGE_LOG.md`) with a reusable template for future sessions,
   and linked to it from the footer of the site.
8. **Added a section to the end of `README.md`** describing the project and how to view it. My
   original README line was kept exactly as written.
9. **Tested the site** in a browser at desktop and phone sizes: contents links, previous/next,
   keyboard arrows, slide links, StoryMap's own arrows, and the mobile drawer. Fixed two display
   problems found during testing (map credits showing through the mobile drawer; StoryMap's arrow
   buttons not matching the color scheme).
10. **Committed and pushed** the changes to the GitHub repository.

### Files changed

| File | Change |
| --- | --- |
| `index.html` | New: the improved page that displays the StoryMap |
| `css/style.css` | New: visual design |
| `js/app.js` | New: navigation features |
| `data/published.json` | New: exact backup copy of my StoryMap data (unmodified) |
| `AI_USAGE_LOG.md` | New: this log |
| `README.md` | Added a section at the end; original text kept |

### Content check

The AI did **not** change, remove or rewrite any of my StoryMap writing. The story text, headlines,
captions, credits, images and locations come directly from my published KnightLab StoryMap. The
only new words the AI added are interface labels (e.g. "Contents", "Loading the story…",
"Original StoryMap", "AI Usage Log", and the keyboard tip) and the documentation in this log and
the README.

### Limitations noted by the AI

- The AI could not edit the StoryMap inside KnightLab's editor (that requires my login). The
  improvements live in this GitHub repository as a site built around my StoryMap.
- To give the improved version its own public web address, GitHub Pages must be turned on in the
  repository settings (Settings → Pages → Deploy from branch → `main` / root).

### Follow-up (same session)

> those were typos. I also did the first thing you suggested.

(Referring to the misspelled git name/email the AI pointed out, and to turning on GitHub Pages.)

**What the AI did:**
- Corrected my git name and email on my Mac (`git config --global`), at my confirmation that the
  old values were typos.
- Confirmed the site is live on GitHub Pages at https://gkaster57.github.io/ImprovedDHfinal/ and
  checked in a browser that all 13 slides, the map and the navigation load correctly.
- Added this entry to the log.

**Files changed:** `AI_USAGE_LOG.md`

**Content check:** No changes to my StoryMap writing.

---

## Session 1 (continued) — 2026-11-22: Fact check

**My request:**
> Please fact check the information presented on the website

**What the AI did:**
- Checked the claims on all 13 slides against web sources (Dezeen, Focus Features, Library of
  Congress, Roald Dahl Museum, D Magazine, Boston.com, Screen Daily and others) and reported
  the results to me in the chat.
- Checked that every slide's image and video link still loads (all 13 do).
- **Did not edit any slide content.** Any corrections are mine to make in the KnightLab editor.

**Main findings reported:**
- Credits: *The Darjeeling Limited* and *The Grand Budapest Hotel* were released by Fox Searchlight,
  not Columbia Pictures. (Columbia is correct for *Bottle Rocket*.)
- *The Darjeeling Limited* was not Anderson's first film shot outside the U.S.; *The Life Aquatic*
  (2004) was shot in Italy.
- *The Life Aquatic*: no source found that the New York Explorers Club building inspired the film's
  set, and the film opens at a festival in Italy, not at the Explorers Club.
- *The Grand Budapest Hotel*: Görlitz was the main filming location; the hotel's main architectural
  model was the Grandhotel Pupp in Karlovy Vary (Czech Republic).
- *The Phoenician Scheme*: Villa Farnesina inspired part of the mansion (the painted-perspective
  gallery), not the whole mansion; the film was shot at Studio Babelsberg in Germany.
- *Asteroid City*: filmed on farmland near Chinchón, and the town was built by production designer
  Adam Stockhausen's team.
- Confirmed: Bottle Rocket/Brookhaven (Farmers Branch), Rushmore/St. John's, Tenenbaum house
  (Adolph Hoak), Fantastic Mr. Fox/Gipsy House and the Writing Hut, Henry Sugar, Moonrise
  Kingdom/Naushon Island, Isle of Dogs/Imperial Hotel → Brick Mansion, French Dispatch/Angoulême.

**Files changed:** `AI_USAGE_LOG.md`

**Content check:** No changes to my StoryMap writing.
