/*
  Wird web behaviour. No dependencies, no tracking, no cookies.
  Everything here is progressive: without JavaScript every section is fully visible.
*/

// Set this to Wird's App Store link (https://apps.apple.com/app/id...) once the app is live.
// While it is empty, pages show "Coming soon to the App Store" instead of the badge.
const APP_STORE_URL = "";

// Set this to the support address listed in App Store Connect. App Review needs a working contact.
// While it is empty, the Support page says contact details are on Wird's App Store page.
const SUPPORT_EMAIL = "";

document.documentElement.classList.remove("no-js");

function setUpContact() {
  if (!SUPPORT_EMAIL) return;
  document.querySelectorAll("[data-support-email]").forEach((link) => {
    link.href = "mailto:" + SUPPORT_EMAIL;
    link.textContent = SUPPORT_EMAIL;
    link.hidden = false;
  });
  document.querySelectorAll("[data-support-pending]").forEach((el) => {
    el.hidden = true;
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Badge files live next to this script, so pages at any depth find them.
const ASSETS = new URL(".", document.currentScript.src);

// Swap each "Coming soon" note for Apple's official badge, unaltered, linking to the App Store.
function setUpStoreLinks() {
  if (!APP_STORE_URL) return;
  document.querySelectorAll("[data-store]").forEach((store) => {
    const link = document.createElement("a");
    link.className = "store__badge";
    link.href = APP_STORE_URL;
    link.innerHTML =
      '<picture>' +
      '<source srcset="' + new URL("badges/app-store-white.svg", ASSETS) + '" media="(prefers-color-scheme: dark)">' +
      '<img src="' + new URL("badges/app-store-black.svg", ASSETS) + '" alt="Download Wird on the App Store" width="144" height="48">' +
      '</picture>';
    const soon = store.querySelector(".store__soon");
    if (soon) soon.replaceWith(link);
    else store.prepend(link);
  });
}

// Fade sections up once as they enter, then stop observing them.
function setUpReveals() {
  const items = document.querySelectorAll(".reveal");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  items.forEach((el) => observer.observe(el));
}

// Grow a tree illustration the first time it is seen.
function setUpTrees() {
  const trees = document.querySelectorAll("[data-grow]");
  trees.forEach((tree) => {
    tree.querySelectorAll(".draw").forEach((path) => {
      if (typeof path.getTotalLength === "function") {
        path.style.setProperty("--len", Math.ceil(path.getTotalLength()) + 1);
      }
    });
  });
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    trees.forEach((el) => el.classList.add("is-grown"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        // Wait a frame so the starting state paints before the transition begins.
        requestAnimationFrame(() => entry.target.classList.add("is-grown"));
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );
  trees.forEach((el) => observer.observe(el));
}

// Light the tagline one word at a time, in reading order, as each word crosses a line
// 60% down the viewport. One observer for all words; no scroll listeners.
function setUpTagline() {
  const taglines = document.querySelectorAll("[data-tagline]");
  if (!taglines.length) return;

  const words = [];
  taglines.forEach((line) => {
    line.querySelectorAll("[data-words]").forEach((part) => {
      const tone = part.dataset.words; // "", "gold" or "leaf"
      const text = part.textContent.trim().split(/\s+/);
      part.textContent = "";
      text.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "word" + (tone ? " is-" + tone : "");
        span.textContent = word;
        part.append(span);
        if (i < text.length - 1) part.append(" ");
        words.push(span);
      });
    });
  });

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    words.forEach((w) => w.classList.add("is-lit"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Words above the trigger line are lit; words below it are not.
        const above = entry.boundingClientRect.top < (entry.rootBounds ? entry.rootBounds.bottom : 0);
        entry.target.classList.toggle("is-lit", entry.isIntersecting || above);
      });
    },
    { rootMargin: "0px 0px -40% 0px", threshold: 0 }
  );
  words.forEach((w) => observer.observe(w));
}

// Pause looping animations (the drying leaves, the follow-along words, the breathing seed)
// while they are off screen. One observer, toggling one class; CSS does the pausing.
function setUpPause() {
  const loops = document.querySelectorAll("[data-pause]");
  if (!loops.length || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
      });
    },
    { threshold: 0.01 }
  );
  loops.forEach((el) => observer.observe(el));
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

setUpStoreLinks();
setUpContact();
setUpReveals();
setUpTrees();
setUpTagline();
setUpPause();
setYear();
