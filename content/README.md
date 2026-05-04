# Diplodocus

A browser extension that automatically replaces "Claude Opus" (and standalone "Opus") with "Diplodocus" on every webpage you visit.


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
