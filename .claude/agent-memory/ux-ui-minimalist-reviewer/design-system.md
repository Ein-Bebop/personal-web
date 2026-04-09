---
name: Design System
description: Current color palette, typography, spacing tokens and dark mode values in style.css
type: project
---

All values live in CSS custom properties in :root in /src/css/style.css.

**Light mode palette**
- --bg: #ffffff
- --text: #1a1a1a (near-black, higher contrast than original #333333)
- --muted: #6b6b6b
- --link: #1d4ed8 (blue)
- --link-visited: #6d28d9 (purple)
- --border: #e2e2e2
- --code-bg: #f5f5f5

**Dark mode palette** (prefers-color-scheme: dark)
- --bg: #111111
- --text: #d8d8d8
- --muted: #888888
- --link: #60a5fa
- --link-visited: #a78bfa
- --border: #2e2e2e
- --code-bg: #1e1e1e (neutral dark, not blue-tinted)

**Layout tokens**
- --max-width: 700px
- --page-padding: 1.25rem (side gutters on body)

**Typography tokens**
- --font-size-base: 1rem (16px)
- --font-size-sm: 0.875rem (14px)
- --line-height-base: 1.65
- --line-height-tight: 1.25 (headings)

**Type scale**
- h1: 1.5rem (1.75rem on post pages via .post-header h1)
- h2: 1.2rem
- h3: 1.05rem
- Font stack: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Monospace: "SF Mono", "Fira Code", Consolas, monospace

**Post body reading width**
- .post-body: max-width: 68ch (comfortable ~65 char line length)
