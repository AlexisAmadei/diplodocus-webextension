# Diplodocus

A browser extension that automatically replaces "Claude Opus" (and standalone "Opus") with "Diplodocus" on every webpage you visit.

## Installation

### Firefox

1. Download or clone this repository.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on…** and select `manifest.json`.

For permanent installation, submit to [addons.mozilla.org](https://addons.mozilla.org) or sign the extension via `web-ext sign`.

### Chrome / Edge / Brave

1. Download or clone this repository.
2. Open `chrome://extensions` (or the equivalent in your browser).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project folder.

## How it works

A content script runs on every page after the DOM is ready (`document_idle`). It:

1. Walks all text nodes in the document and replaces any match of `claude opus` or `opus` (case-insensitive) with `Diplodocus`.
2. Attaches a `MutationObserver` to catch dynamically added or changed text, so single-page apps and live-updating UIs are covered too.
3. Skips `<script>` and `<style>` node content to avoid breaking page logic.

## Permissions

The extension requests no special permissions beyond running a content script on all URLs. It collects no data.

## Changelog

### 1.1 — 2026-04-28

- Optimized extension icons with size-specific variants (16px, 48px, 128px).
- Added comprehensive documentation and installation guide.
- Improved manifest configuration.

### 1.0 — 2026-04-27

- Initial release.
- Case-insensitive replacement of `claude opus` and `opus` with `Diplodocus` across all pages.
- MutationObserver support for dynamic / SPA content.
- Firefox-first manifest (Manifest V3, gecko ID `diplodocus-replacer@alexisamadei`, minimum Firefox 109).
- Chromium-compatible (Chrome, Edge, Brave).

## License

See [LICENSE](LICENSE).
