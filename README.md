# Wird website

The website for [Wird](https://wirdwellness.app), a calm daily companion for prayer and the Quran. Static HTML, CSS and a little JavaScript: no build step, no dependencies, no cookies, no tracking. Served by GitHub Pages from this repo's `main` branch (see Deploy).

The app itself lives in the private `Wird-app-repo`; references below to `docs/…` and `functions/…` point there.

## What is here

| Path | What it is | Use in App Store Connect |
| --- | --- | --- |
| `index.html` (`/`) | Product website: the full tour of Wird | Marketing URL |
| `start/` | Landing page: one audience, one action (get Wird) | Campaign and ad links |
| `support/` | Help topics and contact (hello@wirdwellness.app) | Support URL |
| `privacy/` | The full privacy policy | Privacy Policy URL |
| `terms/` | Apple's standard EULA plus what Wird is and isn't | |
| `moderate/` | Report review page opened from the Remove / Keep links in a report email. Calls the app's `moderate` edge function; nothing happens until the reviewer taps Confirm. Not indexed | |
| `learn/plans/` | What is free, what Wird Plus and Wird Family cost | Link from the paywall and the App Store description |
| `compare/…/`, `guides/…/` | Comparison and guide pages (five at launch); drafts and audits live in the app repo under `docs/marketing/gtm/content/` | |
| `sitemap.xml`, `robots.txt`, `llms.txt` | Discovery files for search engines and AI agents; add every new page to the sitemap and to `llms.txt` | |
| `404.html` | Not-found page (uses absolute paths, so it works at any depth) | |
| `assets/` | `wird.css`, `wird.js` (support email, App Store link, badge swap, animation pausing), `icon.svg`, `apple-touch-icon.png`, `og.png` (social image) | |
| `CNAME` | The custom domain for GitHub Pages: `www.wirdwellness.app`. Don't delete it | |
| `.nojekyll` | Keeps Pages from running Jekyll over the files | |

Every page links `assets/wird.css` and `assets/wird.js`, so a change there reaches the whole site. There is no build step: edit the HTML, preview, push.

The old policy address `https://sakinah-blq7852-backend.rork.app/privacy` now redirects to `/privacy/`; link the site address from the app.

© 2026 Wird. All rights reserved. This site's design, text and code are not licensed for reuse.

## Preview locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173/ and http://localhost:4173/start/. Pages shows `404.html` for missing paths on its own; locally, open http://localhost:4173/404.html directly.

## Deploy

Pushing to `main` is the deploy: GitHub Pages rebuilds the site from the branch within a minute or two. Work on a branch and open a pull request against `main`; nothing else is needed.

## Hosting

GitHub Pages serves `main` at `https://www.wirdwellness.app`; the bare domain redirects there. The `CNAME` file holds the domain and `.nojekyll` keeps Pages from processing the files. Every push to `main` redeploys within a minute or two.

The domain is registered at Squarespace and its DNS stays there. These records point it here:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | aaraouf.github.io |

Google Workspace `MX` records stay as they are. `.app` domains require HTTPS; GitHub issues the certificate once DNS resolves, after which Enforce HTTPS is turned on in the repo's Pages settings.

## Before launch

1. **Support email.** `hello@wirdwellness.app`, set in `assets/wird.js` and on the Support page. Use the same address in App Store Connect.
2. **App Store link.** Set `APP_STORE_URL` in `assets/wird.js`. Every "Coming soon to the App Store" note then becomes the App Store badge.
3. **Badge artwork.** Download Apple's official "Download on the App Store" badges from https://tools.applemarketingtools.com and save them unaltered as `assets/badges/app-store-black.svg` and `assets/badges/app-store-white.svg`. Don't redraw, recolour or crop them.
4. **Smart App Banner.** In `index.html` and `start/index.html`, uncomment the `apple-itunes-app` meta tag and put in the real App Store ID.
5. **Domain.** Social image and canonical URLs point at `https://www.wirdwellness.app`. Change them if the site goes live somewhere else.
6. **Screens.** The app screens on the pages are drawn in HTML from the redesign files in `docs/design/screens`. Once the redesign ships, check that they still match the app, so the marketing stays accurate (App Review Guideline 2.3).
7. **Religious content.** The Arabic is the opening clause of Al-Baqarah 2:286, copied from the app's bundled Tanzil text. The English line is the one in the design system. Include both in the qualified review listed in `docs/PRE-LAUNCH-CHECKLIST.md`.

## How the pages follow Apple's guidelines

- **App Store marketing.** Only Apple's unaltered badge, linked to the App Store, and only once the app is live. No Apple logo. No drawn device frames: app screens are shown frameless, because device imagery must be Apple's own artwork. Trademarks are written correctly (iPhone, iPad, App Store), with the attribution in every footer.
- **Accuracy (Guideline 2.3).** Every claim comes from the code, the privacy policy or the design system. Unreleased features (Together, sponsored cards) are left out.
- **Privacy (5.1.1).** A privacy link on every page. Account deletion steps on the Support and Privacy pages.
- **HIG foundations.** The page follows the system light/dark setting with no theme switch (`dark-mode.md`). Every text pair is 4.5:1 or better in both appearances (`accessibility.md`). Touch targets are 44 px or more. Motion is optional and fully disabled under Reduce Motion (`motion.md`). Translucency is used only on the floating navigation bar and turns solid under Reduce Transparency (`materials.md`). Each colour has one meaning: gold for prayer, sage for growth (`color.md`).

## Motion

Every animation has a job, and all of it follows the app's motion rules (`docs/DESIGN-SYSTEM.md › Motion`): entrances fade up 14px over 800ms, repeating motion breathes at 4.5s, nothing bounces. Only `transform`, `opacity` and SVG paint are animated. Scroll-linked motion uses CSS scroll-driven animations, so there are no scroll listeners; browsers without them get the finished, static state.

| Where | What moves | What it explains |
| --- | --- | --- |
| Every page | A short fade between pages (View Transitions), a 2px reading hairline at the top, a nav bar that gains depth once content passes beneath it | Continuity; the app's growth line; the floating layer |
| Today screen (both pages) | Prayer dots fill one by one, Begin is pressed, a drop falls to the soil, the leaves lift top-down 90ms apart, the growth line extends, the roots card says "A drop reached your tree" | How a day in Wird feeds the tree |
| Rhythm screen (product) | The day draws from Fajr to now, the sun travels the arc, prayers fill as it passes | The sun arc on Rhythm |
| The living tree (product) | Scrolling grows one tree from Seed to Sapling, the first four of nine stages, with the stage chips and a line of copy following. The other five are left for the app | The idea of stages, with some mystery kept |
| The idea (landing) | Every 14s the leaves dry and droop, a drop reaches the soil, and they lift again from the top down | "Waits when you can't"; the tree never dies |
| Quran (both pages) | The whole verse lights, holds, then rests | Follow-along under a reciter |
| Hero (product) | The three screens drift at different speeds as the page starts to scroll | Depth, only on wide screens |

Reduce Motion turns all of it off and shows end states, including the page fade. The `.season`, `.moment`, `.arc` and `.grow` blocks in `assets/wird.css` hold the timelines.

Looping animations (the drying leaves, the follow-along verse, the breathing seed) carry `data-pause`; an observer in `wird.js` pauses them while they are off screen, so a page at rest runs no animation the visitor cannot see.

## Verified

- axe-core 4.10.2: 0 violations on all six pages, in light and in dark.
- No horizontal scrolling at 320, 375 and 768 px wide.
- Keyboard: a skip link and visible focus on every control.
- Scroll-driven tree checked at 5%, 50% and 99% of its scroll range on desktop and on a 375px phone, where the sticky stage fits the screen.
- Off-screen pausing measured with `document.getAnimations()`: at the top of the landing page 0 of 7 looping animations run; at the tree section only the 7 on screen run.
- tastemaker's anti-slop scan: clean, apart from one false positive (the `100vh` fallback line before `100dvh`).
