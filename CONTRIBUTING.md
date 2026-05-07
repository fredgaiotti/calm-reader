# Contributing to Calm Reader

Thanks for your interest. Calm Reader is intentionally minimal — contributions that preserve that quality are welcome.

---

## Principles

Before contributing, read the core constraints:

1. **No remote code.** Everything must be bundled inside the extension. Manifest V3 and Chrome reviewers both require this.
2. **No data collection.** Zero analytics, zero telemetry, zero phone-home. Privacy is the product.
3. **Minimum permissions.** `activeTab` + `storage` + `scripting` only. Do not add permissions.
4. **Single purpose.** Reader mode only. Feature requests that expand scope will be declined.
5. **Vendored parser.** Readability.js comes from Mozilla. Don't replace it with a custom parser.

---

## Getting started

```bash
git clone https://github.com/fredgaiotti/calm-reader.git
cd calm-reader
```

Load the extension locally:

1. `chrome://extensions` → Developer mode → Load unpacked → select `extension/`
2. Test on real article pages across multiple sites

---

## Running the smoke test

```bash
cd tests/smoke
npm install
node run.mjs
```

All 9 tests must pass before submitting a pull request.

---

## What's in scope

- Bug fixes in `content.js`, `background.js`, `options.js`, `reader.css`
- Readability.js version updates
- Accessibility improvements (keyboard nav, ARIA)
- Rendering fixes for specific site layouts
- Performance improvements to the parse/render pipeline

## What's out of scope

- New permissions
- Remote code of any kind
- Analytics or usage tracking
- AI summarization or any non-reader feature
- Support for browsers other than Chrome (forks welcome)

---

## Submitting a pull request

1. Fork the repo and create a branch from `master`
2. Make your changes
3. Run the smoke test — all 9 must pass
4. Open a PR with a clear description of the problem and solution
5. Keep PRs focused — one fix or improvement per PR

---

## Reporting bugs

Open an issue at [github.com/fredgaiotti/calm-reader/issues](https://github.com/fredgaiotti/calm-reader/issues).

Include:
- The URL where the issue occurs (if reproducible on a public page)
- What happened vs. what you expected
- Chrome version and OS
