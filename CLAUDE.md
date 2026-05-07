---
type: project-brief
project: lucida-reader
status: scaffolded
owner: Fred Gaiotti
project-path: ~/workspace/projects/lucida-reader/
extension-path: ~/workspace/projects/lucida-reader/extension/
target: Chrome Web Store (Manifest V3)
created: 2026-05-08
last-updated: 2026-05-08
---

# Lucida Reader — Project Brief

Mercury Reader successor. Pure client-side Chrome extension that strips
articles down to clean, readable text. Powered by Mozilla's Readability.js.

---

## LOCAL CLAUDE HANDOFF

You are running in `~/workspace/projects/lucida-reader/` on FOS.
The shippable Chrome extension lives in `extension/`.

### Current phase: Phase 1 — Scaffold complete, ready to load and test

### First task
1. Pull the extension folder to a local Mac via `scp -r fos:~/workspace/projects/lucida-reader/extension ~/Desktop/`
2. Open `chrome://extensions`, enable Developer mode, click Load unpacked, select the `extension/` folder.
3. Visit any article page, click the Lucida Reader toolbar icon (or press Alt+R), confirm reader view renders.

### Architecture
- `extension/manifest.json` — MV3 manifest, minimal permissions (`activeTab`, `storage`, `scripting`)
- `extension/src/background.js` — service worker, handles toolbar click → injects content script
- `extension/src/content.js` — runs Readability.js on the page DOM, swaps document with rendered reader
- `extension/src/options.html` + `options.js` — preferences (theme, font, size) persisted in chrome.storage
- `extension/vendor/Readability.js` — Mozilla's parser, vendored (NOT loaded remotely — MV3 forbids that)
- `extension/styles/reader.css` — Mercury-style typography

### Why Lucida (working name)
Latin for "clear, bright." Avoids Mercury/Postlight trademark issues.
Rename freely — only one place to change: `manifest.json` `name` field.

---

## What This Project Is

A faithful, minimal recreation of Mercury Reader for Chrome:
- Removes ads, navigation, sidebars, popups
- Renders article in clean typography (Mercury-inspired)
- Light, sepia, dark themes
- Adjustable font size and family
- Zero data collection, zero remote code, zero backend

---

## Why It Exists

Mercury Reader was discontinued after Postlight was acquired by NTT DATA (2022).
Postlight Reader was removed from the Chrome Web Store on 2025-02-06, leaving
~1M users without a maintained replacement. Existing alternatives are either
broader (Helperbird), AI-bloated (Clearly Reader), or compromised (Readermode.io).
Lucida fills the simple-Mercury-replacement gap.

---

## Non-Negotiable Rules

1. **No remote code.** Manifest V3 forbids it; Chrome reviewers reject it. Vendor everything.
2. **No data collection.** Zero analytics, zero telemetry, zero phone-home. Privacy is the product.
3. **Minimum permissions.** `activeTab` + `storage` + `scripting` only. No `<all_urls>`, no `host_permissions: *`.
4. **Single purpose.** Reader mode only. No "while we're here" features that trigger Single-Purpose review rejection.
5. **Vendored parser, not custom.** Use Mozilla Readability.js. Maintaining a parser is a full-time job.

---

## Publishing Checklist (later)

- [ ] $5 Chrome Web Store dev fee (one-time)
- [ ] Original name (not Mercury/Postlight/Reader View)
- [ ] 128/48/16 px icons
- [ ] 1280x800 screenshots (3-5)
- [ ] 440x280 promo tile
- [ ] Privacy policy URL (host on GitHub Pages)
- [ ] Permission justifications (one sentence each in dashboard)
- [ ] Single-purpose statement: "Strip articles to clean reading view"

---

## Phases

- **Phase 1: Scaffold** (this commit)
- **Phase 2: Local load + smoke test** (10 sites)
- **Phase 3: Theme + options polish**
- **Phase 4: Listing assets (icons, screenshots, promo)**
- **Phase 5: Submit to Chrome Web Store**
