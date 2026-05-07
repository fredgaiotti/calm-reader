# Calm Reader — Chrome Web Store Listing

---

## Name (max 45 chars)

```
Calm Reader
```

---

## Short description (max 132 chars)

```
Strip any article to clean, distraction-free reading. Mercury Reader successor — zero data, zero ads, pure reading.
```

---

## Full description (max 16,000 chars)

```
Calm Reader brings back the reading experience you lost when Mercury Reader (Postlight Reader) was removed from the Chrome Web Store in 2025.

Click the toolbar icon or press Alt+R on any article page. Calm strips away ads, navigation bars, sidebars, popups, and everything else competing for your attention — leaving only the text, formatted for comfortable reading.

─── FEATURES ───────────────────────────────────────

▸ Clean reader view — powered by Mozilla Readability, the same parser used in Firefox Reader View.
▸ Three themes — Light, Sepia, and Dark. Persisted across sessions.
▸ Adjustable font — Serif (Mercury-faithful), Sans-serif, or Monospace. Font size adjustable from 12–28px with A-/A+ buttons.
▸ Keyboard shortcut — Alt+R toggles reader view on the current tab. Click the icon to close.
▸ Minimal UI — a slim sticky toolbar. The content is the product.

─── PRIVACY ─────────────────────────────────────────

Calm Reader collects no data. There is no backend. No analytics. No telemetry. No ads. No affiliate links. Nothing is ever transmitted anywhere.

Your preferences (theme, font, size) are saved locally in Chrome storage — synced to your own Google account, never to ours.

─── PERMISSIONS ─────────────────────────────────────

• activeTab — to read and reformat the article on the tab you activate the extension on
• scripting — to inject the Readability parser (bundled locally, never loaded remotely)
• storage — to remember your display preferences

That is all. No host permissions. No browsing history access. No background access to your tabs.

─── OPEN SOURCE ─────────────────────────────────────

Calm Reader is MIT licensed. All code is on GitHub at github.com/fredgaiotti/calm-reader. Readability.js is Apache 2.0 (Mozilla Foundation).

─── WHY CALM? ───────────────────────────────────────

Mercury Reader was discontinued after Postlight was acquired by NTT DATA in 2022. It was removed from the Chrome Web Store on February 6, 2025, leaving roughly one million users without a maintained replacement.

Existing alternatives are either broader in scope (Helperbird — accessibility suite), AI-cluttered (Clearly Reader), or privacy-compromised (Readermode.io). Calm is none of those things. It does exactly one thing: clean reading view.
```

---

## Category

```
Productivity
```

## Language

```
English
```

---

## Store URL (once published)

```
https://chromewebstore.google.com/detail/calm-reader/[EXTENSION-ID]
```

---

## Permission justifications (Chrome Web Store dashboard)

Fill in the "Justify your permission use" field for each permission:

| Permission | Justification |
|---|---|
| `activeTab` | Required to read the current article's DOM and reformat it for clean reading. Only activates on the tab the user explicitly clicks the extension icon on. |
| `scripting` | Required to inject Mozilla Readability.js (bundled locally) and the reader stylesheet into the active tab's page context. |
| `storage` | Required to persist user preferences (theme, font family, font size) across browser sessions using Chrome's built-in storage.sync. |

---

## Single-purpose statement

```
Calm Reader has a single purpose: strip web articles to a clean, distraction-free reading view.
```

---

## Privacy practices (Chrome Web Store dashboard)

Answer to each question:

- **Does your extension collect or use any user data?** → No
- **What data does your extension collect?** → No data is collected. Extension preferences (theme/font/size) are stored locally in chrome.storage.sync, which syncs to the user's own Google account. We have no access to this data.
- **Do you use any analytics or tracking?** → No
- **Do you sell or share user data with third parties?** → No
- **Privacy policy URL:** `https://fredgaiotti.github.io/calm-reader/privacy.html`

---

## Store assets needed

### Icons (already built)

| File | Size | Status |
|------|------|--------|
| `extension/icons/icon-16.png` | 16×16 | ✅ Done |
| `extension/icons/icon-48.png` | 48×48 | ✅ Done |
| `extension/icons/icon-128.png` | 128×128 | ✅ Done |

### Screenshots (1280×800 or 640×400, PNG/JPEG, 1–5 required)

Take these screenshots from Chrome on Mac after loading the unpacked extension:

1. **Article in reader view (light theme)** — open a long article (e.g., paulgraham.com/avg.html), activate Calm, screenshot the reader view
2. **Theme switcher** — same article, show the sepia or dark theme active
3. **Comparison** — split or before/after showing original page vs reader view (optional — can be one screenshot each)
4. **Options page** — right-click extension → Options, screenshot the preferences panel

Save screenshots to `docs/screenshots/` before uploading.

### Promo tile (440×280 PNG — optional but recommended)

A promo tile SVG is available at `docs/promo-tile.svg` — export to PNG at 440×280 before uploading.

---

## Chrome Web Store — Upload checklist

- [ ] Pay the one-time $5 developer registration fee at: https://chrome.google.com/webstore/devconsole
- [ ] Go to Chrome Web Store Developer Dashboard → "New Item"
- [ ] Upload `calm-reader-1.0.0.zip` (available at `dist/calm-reader-1.0.0.zip`)
- [ ] Fill in store listing: name, short description, full description (from above)
- [ ] Set category: Productivity
- [ ] Upload icon-128.png as the store icon
- [ ] Upload 1–5 screenshots (1280×800)
- [ ] Upload promo tile (440×280) — optional but recommended
- [ ] Fill in permission justifications (see above)
- [ ] Set privacy policy URL: `https://fredgaiotti.github.io/calm-reader/privacy.html`
- [ ] Submit for review (typically 1–3 business days for new extensions)
