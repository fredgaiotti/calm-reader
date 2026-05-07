# Changelog

All notable changes to Calm Reader are documented here.

---

## [1.0.0] — 2026-05-08

First public release on the Chrome Web Store.

### Added
- Reader view powered by Mozilla Readability.js (vendored, Apache-2.0)
- Three themes: Light, Sepia, Dark — persisted via `chrome.storage.sync`
- Adjustable font family: Serif, Sans-serif, Monospace
- Adjustable font size: 12–28 px via A− / A+ toolbar buttons
- Sticky reader toolbar: theme switcher, font size controls, close button
- Keyboard shortcut: `Alt+R` to toggle reader view
- Options page: persistent preferences UI
- Inline toast notification when no article is found on the page
- Headless smoke test suite: 9 real URLs via Puppeteer, all passing
- GitHub Pages: landing page and privacy policy
- Chrome Web Store store listing assets

### Architecture
- Manifest V3 compliant
- Permissions: `activeTab`, `storage`, `scripting` — no host permissions
- Zero remote code — all scripts and styles bundled locally
- Zero data collection — no analytics, no telemetry, no backend

---

## [0.1.0] — 2026-05-07

Initial scaffold.

- Extension structure: manifest, background service worker, content script, options UI, reader CSS
- Vendored Readability.js
- Placeholder icons
