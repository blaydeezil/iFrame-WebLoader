# iFrame WebLoader

A lightweight, fully client-side web application to load, manage, and play web-based games or embedded content inside a single iframe. All data is stored locally in the browser — no backend, no hosting, and no external dependencies required.

This repository is intended to be served over HTTP(S). The recommended deployment is GitHub Pages. Opening the app via the file:// protocol (double-clicking index.html) is not supported and will break functionality such as JSON import/export and some iframe behaviors.

---

## Live Demo

Use the app immediately from the published GitHub Pages site:

- GitHub Pages: https://blaydeezil.github.io/iFrame-WebLoader/

The live demo exposes the full feature set:
- Add and manage games or embeds
- Persistent storage using localStorage
- JSON import and export support
- Keyboard shortcuts and iframe controls

> Data is stored per browser and per origin. Content saved on the GitHub Pages site is separate from any self-hosted or locally served instances.

---

## Features

- Load web games via direct URLs
- Load arbitrary iframe embeds using raw iframe HTML (`<iframe>` embed code)
- Central iframe playback area with playback and audio controls (when permitted)
- Persistent library stored in `localStorage`
- Import and export library as JSON
- Fullscreen support for the iframe container
- Refresh, play, pause, and mute controls (subject to cross-origin restrictions)
- Built-in debug console with timestamps
- Keyboard shortcuts for quick control
- Minimal: plain HTML/CSS/JS — no frameworks or external libraries

---

## Requirements & Notes

- A modern browser (Chrome, Firefox, Edge, Safari).
- Must be served over HTTP(S). Do not open via `file://` — many browsers restrict iframe scripting and file access for local files.
- Some third-party content enforces X-Frame-Options or Content-Security-Policy and will refuse to be embedded.
- Cross-origin iframes limit programmatic control (play/pause/mute) — this is a browser/remote-site restriction, not an app bug.

---

## Usage

### Add a Game
1. Enter a Game URL (direct link to the game).
2. Enter a Game Name.
3. Click "Add Game" or press `A`.

### Add an Embed
1. Paste a full iframe HTML snippet (for example):
```html
<iframe src="https://example.com" width="800" height="600"></iframe>
```
2. Enter an Embed Name.
3. Click "Add Embed" or press `E`.

The app accepts either an object with a `url` field (for direct URLs) or an `embed` field (raw iframe HTML).

---

## Import / Export (JSON)

You can export your current library to a JSON file for backup, and import it later to restore your library.

Example JSON format:
```json
[
  {
    "name": "Example Game",
    "url": "https://example.com"
  },
  {
    "name": "Example Embed",
    "embed": "<iframe src='https://example.com' width='800' height='600'></iframe>"
  }
]
```

- Imported JSON must be an array of objects where each object contains either a `url` (game) or `embed` (iframe HTML) field.
- Exported JSON is a plain file you can save and re-import later.

---

## Controls

Buttons
- Toggle Fullscreen — make the iframe container fullscreen
- Refresh Iframe — reload the currently loaded iframe
- Pause Iframe — attempt to pause media inside the iframe (may not work for cross-origin)
- Play Iframe — attempt to play media inside the iframe (may not work for cross-origin)
- Mute / Unmute — toggle audio for supported media in the iframe (subject to cross-origin)
- Import from JSON — load a saved library file
- Export to JSON — download your current library

Keyboard Shortcuts
- F — Toggle fullscreen
- R — Refresh iframe
- P — Pause media in iframe
- L — Play media in iframe
- M — Mute / Unmute
- A — Add a game
- E — Add an embed

Shortcuts are disabled while typing in input fields.

---

## Development / Running Locally (for testing)

For local development or testing, serve the project folder with any simple HTTP server. Example options:

- Python 3:
  - python -m http.server 8000
  - Open: http://localhost:8000/

- VSCode:
  - Install "Live Server" and use "Open with Live Server".

Do not open index.html directly using the `file://` protocol — many browsers restrict features required by the app.

---

## Privacy

All data is stored locally in your browser's `localStorage`. The app does not send or receive any library data to/from any backend by default.

---

## Known Limitations

- Some sites disallow being embedded in an iframe (X-Frame-Options or CSP).
- Cross-origin iframes may prevent the app from controlling playback or volume.
- Functionality depends on what the embedded site allows through the browser.

---

## Contributing

Contributions, bug reports, or suggestions are welcome. Please open an issue or submit a PR.
