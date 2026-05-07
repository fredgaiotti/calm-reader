# Calm Reader

> Clean, distraction-free reading view for Chrome. Mercury Reader successor.

Calm Reader strips any web article down to a single, well-typeset column of text — removing ads, navigation bars, sidebars, popups, and everything else competing for your attention.

**[Install from the Chrome Web Store](https://chromewebstore.google.com/detail/calm-reader/dolnpndkmanjpbglffodjkadalikolgf)** · [Privacy policy](https://fredgaiotti.github.io/calm-reader/privacy.html) · [Report an issue](https://github.com/fredgaiotti/calm-reader/issues)

---

## Features

- **Three themes** — Light, Sepia, Dark. Persisted across sessions.
- **Adjustable typography** — Serif, Sans-serif, or Monospace. Font size 12–28 px via A− / A+ buttons.
- **Keyboard shortcut** — `Alt+R` toggles reader view. Click `×` or press `Alt+R` again to exit.
- **Powered by Mozilla Readability** — the same parser used in Firefox Reader View.
- **Zero data collection** — no analytics, no telemetry, no backend. Nothing leaves your browser.
- **No remote code** — everything is bundled locally. Manifest V3 compliant.

---

## Try it locally

```bash
git clone https://github.com/fredgaiotti/calm-reader.git
```

Then in Chrome:

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** → select the `extension/` folder
4. Pin the extension, open any article, click the icon or press `Alt+R`

---

## How it works

1. You activate Calm Reader on a tab (toolbar click or `Alt+R`)
2. The service worker injects `vendor/Readability.js` and `src/content.js` into the page
3. Readability parses the DOM and extracts the article title, byline, site name, and body
4. The content script replaces the document with a clean reader HTML page, loading `styles/reader.css` from the extension package
5. Theme and font preferences are read from and written to `chrome.storage.sync`

---

## Project structure

```
extension/
├── manifest.json          # MV3 manifest — permissions: activeTab, storage, scripting
├── src/
│   ├── background.js      # service worker — handles toolbar click, injects scripts
│   ├── content.js         # Readability parse → reader DOM render → controls
│   ├── options.html       # settings popup UI
│   └── options.js         # loads and saves preferences to chrome.storage.sync
├── styles/
│   └── reader.css         # typography — light / sepia / dark themes, font stacks
├── vendor/
│   ├── Readability.js     # mozilla/readability (Apache-2.0), vendored locally
│   └── LICENSE
└── icons/
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png

tests/
└── smoke/
    ├── run.mjs            # headless Readability pipeline test (Puppeteer)
    └── report.md          # last test run results (9/9 pass)

docs/
├── index.html             # landing page (GitHub Pages)
├── privacy.html           # privacy policy
└── store-assets/          # Chrome Web Store listing images
```

---

## Permissions

| Permission | Why |
|---|---|
| `activeTab` | To read and reformat the article on the tab you activate the extension on. Only the current, user-activated tab — nothing else. |
| `scripting` | To inject Readability.js (bundled locally) and the reader stylesheet into the active tab. |
| `storage` | To persist your display preferences (theme, font, font size) across sessions. |

No `host_permissions`. No `<all_urls>`. No background tab access.

---

## Update Readability.js

To pull the latest Mozilla Readability parser:

```bash
curl -sSL -o extension/vendor/Readability.js \
  https://raw.githubusercontent.com/mozilla/readability/main/Readability.js
```

Then reload the extension in `chrome://extensions` and re-run the smoke test.

---

## Smoke test

```bash
cd tests/smoke
npm install
node run.mjs
```

Runs headless Chromium against 9 real URLs and verifies Readability extracts usable article content from each. Last result: **9/9 pass**.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

Calm Reader source code is [MIT licensed](LICENSE).
[Readability.js](https://github.com/mozilla/readability) is Apache-2.0 — Mozilla Foundation / Arc90.
