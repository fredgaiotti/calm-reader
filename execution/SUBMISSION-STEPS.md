---
type: execution-guide
project: calm-reader
version: "1.0.0"
created: 2026-05-08
status: ready
---

# Calm Reader v1.0.0 — Submission Steps

Everything is built. These are the remaining steps Fred completes manually.

---

## Step 1 — Create GitHub repo (2 min)

1. Go to: https://github.com/new
2. Repository name: `calm-reader`
3. Description: `Mercury Reader successor — clean reader view for Chrome. Zero data. Zero ads.`
4. Visibility: **Public**
5. Do NOT initialize with README (repo already has commits)
6. Click **Create repository**

Then run from the FOS terminal:

```bash
cd /home/sensei/workspace/projects/calm-reader
git push -u origin master
```

(SSH key is already configured: `id_ed25519_github` as `fredgaiotti`)

---

## Step 2 — Enable GitHub Pages (2 min)

1. Go to: https://github.com/fredgaiotti/calm-reader/settings/pages
2. Source: **Deploy from a branch**
3. Branch: `master`, folder: `/docs`
4. Click **Save**

Privacy policy will be live at:
```
https://fredgaiotti.github.io/calm-reader/privacy.html
```

(May take 2–5 minutes to propagate.)

---

## Step 3 — Pay Chrome Web Store developer fee (5 min)

One-time $5 fee. Only needed if not already registered.

1. Go to: https://chrome.google.com/webstore/devconsole
2. Click **Register** and pay $5
3. You only do this once — the fee covers all extensions forever

---

## Step 4 — Take screenshots (15 min)

From your Mac, pull the extension:
```bash
scp -r fos:~/workspace/projects/calm-reader/extension ~/Desktop/calm-reader-ext
```

Load it in Chrome (`chrome://extensions` → Developer mode → Load unpacked → select `calm-reader-ext/`).

Take **3–5 screenshots** at 1280×800:
1. An article in reader view (light theme) — try paulgraham.com/avg.html
2. Same article in dark theme
3. The sepia theme with a longer article
4. The options panel (right-click icon → Options)

Save to your Desktop as `screenshot-1.png`, `screenshot-2.png`, etc.

---

## Step 5 — Submit to Chrome Web Store (20 min)

1. Go to: https://chrome.google.com/webstore/devconsole
2. Click **New item**
3. Upload: `/home/sensei/workspace/projects/calm-reader/dist/calm-reader-1.0.0.zip`
   (copy to Mac first: `scp fos:~/workspace/projects/calm-reader/dist/calm-reader-1.0.0.zip ~/Desktop/`)
4. Fill in the store listing — all copy is in `docs/store-listing.md`:
   - Name: `Calm Reader`
   - Short description: copy from store-listing.md
   - Full description: copy from store-listing.md
   - Category: Productivity
5. Upload assets:
   - Store icon: `extension/icons/icon-128.png` (copy from extension/)
   - Screenshots: 3–5 from Step 4
   - Promo tile: export `docs/promo-tile.svg` to PNG at 440×280 (open in browser → screenshot, or use any image editor)
6. Privacy practices section:
   - Privacy policy URL: `https://fredgaiotti.github.io/calm-reader/privacy.html`
   - Select "No" for all data collection questions
7. Permission justifications — paste from `docs/store-listing.md` (Permission justifications section)
8. Click **Submit for review**

---

## What happens next

- Google review typically takes **1–3 business days** for new extensions
- You'll receive an email when approved or if changes are needed
- Common rejection reasons: missing permission justification, policy URL not live yet
  → Both are handled: justifications are in store-listing.md, privacy policy goes live in Step 2

---

## Extension ID

Your extension ID is assigned by the Chrome Web Store after first upload. Update `docs/index.html` with the correct URL once you have it.

---

## Files at a glance

| File | Purpose |
|------|---------|
| `dist/calm-reader-1.0.0.zip` | Upload this to Chrome Web Store |
| `extension/icons/icon-128.png` | Store icon (upload separately) |
| `docs/store-listing.md` | All listing copy, permission justifications, checklist |
| `docs/privacy.html` | Privacy policy (hosted at GitHub Pages after Step 2) |
| `docs/promo-tile.svg` | Promo tile (export to PNG 440×280) |
| `docs/index.html` | Landing page at fredgaiotti.github.io/calm-reader |
