# Lucida Reader

A Mercury Reader successor — clean, distraction-free reading view for Chrome.
Pure client-side, zero data collection, zero remote code.

## Try it locally (5 min)

From your Mac:

```bash
scp -r fos:~/workspace/projects/lucida-reader/extension ~/Desktop/lucida-reader
```

Then in Chrome:

1. Open `chrome://extensions`.
2. Toggle **Developer mode** (top right).
3. Click **Load unpacked**, choose `~/Desktop/lucida-reader/`.
4. Pin the extension. Open any article. Click the icon or press **Alt+R**.

## What's inside

```
extension/
├── manifest.json         # MV3, permissions: activeTab + storage + scripting
├── src/
│   ├── background.js     # service worker, handles toolbar click
│   ├── content.js        # parses page with Readability, swaps DOM, renders
│   ├── options.html      # settings UI
│   └── options.js
├── styles/
│   └── reader.css        # Mercury-faithful typography (light/sepia/dark)
├── vendor/
│   ├── Readability.js    # mozilla/readability, Apache-2.0
│   └── LICENSE
└── icons/
    ├── icon-16.png       # placeholders — replace before publishing
    ├── icon-48.png
    └── icon-128.png
```

## Update Readability.js

```bash
curl -sSL -o extension/vendor/Readability.js \
  https://raw.githubusercontent.com/mozilla/readability/main/Readability.js
```

## Publishing checklist

See `CLAUDE.md` → Publishing Checklist.

## License

MIT for Lucida code. Readability.js is Apache-2.0 (Mozilla / Arc90).
