// Calm Reader — content script
// Runs in the page context. Readability.js is injected just before this file.
// Toggles between original page and reader view.

(function () {
  const FLAG = "__calmReaderActive";

  if (window[FLAG]) {
    // Already active — restore original by reloading.
    window.location.reload();
    return;
  }

  const docClone = document.cloneNode(true);
  let article;
  try {
    // eslint-disable-next-line no-undef
    article = new Readability(docClone).parse();
  } catch (e) {
    console.error("Calm Reader: Readability failed", e);
    return;
  }

  if (!article || !article.content) {
    alert("Calm Reader couldn't extract an article from this page.");
    return;
  }

  chrome.storage.sync.get(
    { theme: "light", fontFamily: "serif", fontSize: 18 },
    (prefs) => render(article, prefs)
  );

  function render(article, prefs) {
    const cssURL = chrome.runtime.getURL("styles/reader.css");
    const html = `<!DOCTYPE html>
<html lang="${article.lang || document.documentElement.lang || "en"}">
<head>
  <meta charset="utf-8">
  <title>${escapeHTML(article.title || document.title)}</title>
  <link rel="stylesheet" href="${cssURL}">
</head>
<body data-theme="${prefs.theme}" data-font="${prefs.fontFamily}" style="--calm-font-size:${prefs.fontSize}px">
  <header class="calm-toolbar">
    <button id="calm-close" aria-label="Close reader">×</button>
    <div class="calm-controls">
      <button data-theme-set="light">Light</button>
      <button data-theme-set="sepia">Sepia</button>
      <button data-theme-set="dark">Dark</button>
      <button data-font-step="-1" aria-label="Smaller">A-</button>
      <button data-font-step="1" aria-label="Larger">A+</button>
    </div>
  </header>
  <article class="calm-article">
    <h1 class="calm-title">${escapeHTML(article.title || "")}</h1>
    ${article.byline ? `<p class="calm-byline">${escapeHTML(article.byline)}</p>` : ""}
    ${article.siteName ? `<p class="calm-site">${escapeHTML(article.siteName)}</p>` : ""}
    <div class="calm-content">${article.content}</div>
  </article>
</body>
</html>`;

    document.open();
    document.write(html);
    document.close();
    window[FLAG] = true;
    wireControls();
  }

  function wireControls() {
    document.getElementById("calm-close")?.addEventListener("click", () => {
      window.location.reload();
    });
    document.querySelectorAll("[data-theme-set]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme-set");
        document.body.setAttribute("data-theme", theme);
        chrome.storage.sync.set({ theme });
      });
    });
    document.querySelectorAll("[data-font-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const step = parseInt(btn.getAttribute("data-font-step"), 10);
        chrome.storage.sync.get({ fontSize: 18 }, ({ fontSize }) => {
          const next = Math.max(12, Math.min(28, fontSize + step));
          document.body.style.setProperty("--calm-font-size", `${next}px`);
          chrome.storage.sync.set({ fontSize: next });
        });
      });
    });
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
})();
