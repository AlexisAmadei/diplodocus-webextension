# Release Notes — Diplodocus

## v1.1 (2026-04-28)

### Improvements

- **Icon Optimization**: Replaced single-size icon with size-specific variants for better display across different browser interfaces (16px, 48px, 128px).
- **Documentation**: Added comprehensive README with installation instructions, feature overview, and permission details.
- **Configuration**: Refined manifest configuration for improved cross-browser compatibility.

### Technical Details

- Manifest V3 compliant
- Firefox 109+ support
- Chromium-based browsers (Chrome, Edge, Brave) compatible
- No permissions required beyond content script access
- Zero data collection

---

## v1.0 (2026-04-27)

### Initial Release

- Case-insensitive text replacement of "Claude Opus" and "Opus" with "Diplodocus" on all webpages
- Real-time content script that processes initial page load and dynamically added content
- MutationObserver support for single-page applications and live-updating interfaces
- Excludes script and style tags to prevent breaking page functionality
- Firefox and Chromium browser support
