---
name: Recurring Issues Fixed
description: Concrete CSS/HTML bugs found and resolved in the first review session (April 2026)
type: feedback
---

**CSS selector collision on post pages (critical)**
The original CSS selected `header` by element name. The post template uses `<header class="post-header">` inside `<article>`, which matched the global `header` rule — causing it to render as a flex row with a border-bottom, identical to the site nav. Fixed by renaming the site header to use `.site-header` class selector in both CSS and base.html.

**Why:** Element-level selectors for structural elements (`header`, `main`, `footer`) are dangerous when those elements appear in multiple contexts on the same page.
**How to apply:** Always prefer class selectors for layout containers. Never style `header`, `footer`, or `nav` by element alone if they appear in more than one context per page.

---

**`<span class="post-date">` in blog listing should be `<time datetime="...">`**
The build.js was rendering dates in the listing as `<span>` despite the ISO date being available. Fixed in build.js to use `<time class="post-date" datetime="${p.dateISO}">`.

**Why:** `<time>` is the semantic element for machine-readable dates. Accessibility tools and search engines benefit from it.

---

**Blog listing margin-top with no heading above it**
The original `.post-list` had no margin-top; the "Blog" h1 provided the visual gap. After the heading was changed to a subtle `.page-title`, margin-top was added to `.post-list` (1.25rem) to maintain spacing.

---

**Dark mode code-bg had a blue tint**
Original: `--code-bg: #1a1a2e` (noticeably blue-purple). Changed to `#1e1e1e` (neutral dark), consistent with the rest of the dark palette.

---

**No keyboard focus styles**
Original CSS had no `:focus-visible` rule. Added `a:focus-visible` with a 2px outline using `var(--link)`.

---

**`body` had `font-size` implicit, not explicit**
Added `font-size: var(--font-size-base)` to `body` for clarity, even though browsers default to 16px.
