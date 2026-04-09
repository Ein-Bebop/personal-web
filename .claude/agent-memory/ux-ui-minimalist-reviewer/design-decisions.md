---
name: Design Decisions
description: Conscious choices made during review that should be preserved and not reverted
type: project
---

**Blog listing uses CSS Grid (not Flexbox) for date/title columns**
Changed from `display: flex` to `display: grid; grid-template-columns: 7rem 1fr` for the post-list items. Grid gives stable column alignment regardless of content length, and collapses cleanly to a single column at narrow viewports (max-width: 480px) via a media query that sets `grid-template-columns: 1fr`.

**Why:** Flex items can wrap unpredictably. Grid keeps the date column a fixed width, making the listing scannable in a proper tabular rhythm.

---

**Blog listing heading is "Writing" not "Blog"**
The page h1 was changed from "Blog" to "Writing", styled as `.page-title` — small (1rem), muted color, uppercase, letter-spaced. This is a label/section marker, not a hero heading.

**Why:** "Blog" is redundant with the nav link. "Writing" is more personal and consistent with the site's voice. The small uppercase label style communicates it's a category marker without visual weight.

---

**Post body constrained to 68ch**
`.post-body { max-width: 68ch }` — this keeps the reading column narrower than the 700px container, which is especially useful once images are added (they can still span the full 700px parent width by overriding margin).

---

**Footer is minimal: name only, no copyright year or links**
A `<footer class="site-footer">` was added with just the author name. No year (avoids the need to update it), no social links (per CLAUDE.md constraints).

---

**Nav hover goes to `var(--text)` not `var(--link)` color**
Nav links hover to `--text` (not `--link` blue). This keeps the nav understated — it's a utility strip, not a call to action. The site title hover does go to `--link` to signal it's the logo/home link.

---

**`margin-inline: auto` used instead of `margin: 0 auto`**
More modern, logical property. Both work identically for this use case. Prefer `margin-inline` going forward.
