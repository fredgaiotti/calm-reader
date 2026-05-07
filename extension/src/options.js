const fields = ["theme", "fontFamily", "fontSize"];
const defaults = { theme: "light", fontFamily: "serif", fontSize: 18 };

function load() {
  chrome.storage.sync.get(defaults, (prefs) => {
    fields.forEach((f) => (document.getElementById(f).value = prefs[f]));
  });
}

function save() {
  const prefs = {
    theme: document.getElementById("theme").value,
    fontFamily: document.getElementById("fontFamily").value,
    fontSize: parseInt(document.getElementById("fontSize").value, 10) || 18,
  };
  chrome.storage.sync.set(prefs, () => {
    const el = document.getElementById("saved");
    el.textContent = "Saved.";
    setTimeout(() => (el.textContent = ""), 1200);
  });
}

document.addEventListener("DOMContentLoaded", load);
fields.forEach((f) => document.getElementById(f).addEventListener("change", save));
