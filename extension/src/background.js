// Calm Reader — service worker
// Toolbar click or Alt+R triggers content script injection on the active tab.

const PROTECTED = /^(chrome|edge|about|chrome-extension|moz-extension|file|view-source):/i;

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id || !tab.url || PROTECTED.test(tab.url)) {
    return; // can't inject into chrome:// or store pages
  }
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["vendor/Readability.js", "src/content.js"],
    });
  } catch (err) {
    console.error("Calm Reader injection failed:", err);
  }
});
