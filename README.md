# Wird website

Static HTML, CSS and a little JavaScript. No build step, no dependencies, no cookies, no tracking.

| Path | What it is | Use in App Store Connect |
| --- | --- | --- |
| `/` | Product website: the full tour of Wird | Marketing URL |
| `/start/` | Landing page: one audience, one action (get Wird) | Campaign and ad links |
| `/support/` | Help topics and contact | Support URL |
| `/privacy/` | Short summary, linking to the full policy | Keep using the full policy URL below |
| `/terms/` | Apple's standard EULA plus what Wird is and isn't | |
| `/404.html` | Not-found page (uses absolute paths) | |

The full privacy policy stays where the app already links it: `https://sakinah-blq7852-backend.rork.app/privacy` (`functions/privacy.ts`, `AppEnvironment.privacyPolicyURL`). The website summarises it and links to it rather than keeping a second copy.

## Preview

```bash
python3 -m http.server 4173 --directory website
```

Then open http://localhost:4173/ and http://localhost:4173/start/.

## Before launch

1. **Support email.** Set `SUPPORT_EMAIL` in `assets/wird.js`. App Review requires a working contact on the support URL.
2. **App Store link.** Set `APP_STORE_URL` in `assets/wird.js`. Every "Coming soon to the App Store" note then becomes the App Store badge.
3. **Badge artwork.** Download Apple's official "Download on the App Store" badges from https://tools.applemarketingtools.com and save them unaltered as `assets/badges/app-store-black.svg` and `assets/badges/app-store-white.svg`. Don't redraw, recolour or crop them.
4. **Smart App Banner.** In `index.html` and `start/index.html`, uncomment the `apple-itunes-app` meta tag and put in the real App Store ID.
5. **Social image URLs.** `og:image` paths are relative. Some link previewers need absolute URLs, so change them to `https://<your domain>/assets/og.png` once the domain is known.
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
| The living tree (product) | Scrolling grows one tree from Seed to Ancient through nine stages, with the stage chips and a line of copy following | The nine stages |
| The idea (landing) | Every 14s the leaves dry and droop, a drop reaches the soil, and they lift again from the top down | "Waits when you can't"; the tree never dies |
| Quran (both pages) | Words light in turn, 500ms each, then rest | Follow-along under a reciter |
| Hero (product) | The three screens drift at different speeds as the page starts to scroll | Depth, only on wide screens |

Reduce Motion turns all of it off and shows end states, including the page fade. The `.season`, `.moment`, `.arc` and `.grow` blocks in `assets/wird.css` hold the timelines.

## Verified

- axe-core 4.10.2: 0 violations on all six pages, in light and in dark.
- No horizontal scrolling at 320, 375 and 768 px wide.
- Keyboard: a skip link and visible focus on every control.
- Scroll-driven tree checked at 5%, 40%, 70% and 99% of its scroll range on desktop and on a 375px phone, where the sticky stage fits the screen.
- tastemaker's anti-slop scan: clean, apart from one false positive (the `100vh` fallback line before `100dvh`).
