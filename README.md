# iFrame WebLoader

A lightweight, fully client-side web application that allows you to load, manage, and play web-based games or embedded content inside a single iframe.  
All data is stored locally in the browser, requiring **no backend, no hosting setup, and no dependencies**.

This project works both **locally** and via an **existing GitHub Pages deployment**.

---

## Live Demo

You can use the application immediately without downloading anything:

**GitHub Pages:**  
[https://blaydeezil.github.io/iFrame-WebLoader/](https://blaydeezil.github.io/iFrame-WebLoader/)

The live demo provides the full feature set:
- Add and manage games or embeds
- Persistent storage using `localStorage`
- JSON import support
- Keyboard shortcuts and iframe controls

> Content is saved per browser and per domain. Data stored on the GitHub Pages site is separate from local file usage.

---

## Features

- Load web games via direct URLs
- Load embedded content using raw `<iframe>` embed code
- Central iframe playback area
- Persistent storage using `localStorage`
- Import content lists from JSON files
- Fullscreen iframe support
- Refresh, play, and pause controls
- Built-in debug console with timestamps
- Keyboard shortcuts for fast control
- No frameworks or external libraries

---

## How It Works

- All content is stored locally in the browser using `localStorage`
- Games are loaded using `iframe.src`
- Embeds are loaded using `iframe.srcdoc`
- The application runs entirely client-side
- No network requests are made except to the loaded game or embed itself

---

## Controls

### Buttons

| Button | Action |
|--------|--------|
| Toggle Fullscreen | Makes the iframe fullscreen |
| Refresh Iframe | Reloads the current iframe |
| Pause Iframe | Pauses YouTube videos only |
| Play Iframe | Plays YouTube videos only |
| Import from JSON | Loads content from a `.json` file |

### Keyboard Shortcuts

| Key | Action |
|-----|-------|
| `F` | Toggle fullscreen |
| `R` | Refresh iframe |
| `P` | Pause YouTube video |
| `L` | Play YouTube video |
| `A` | Add a game |
| `E` | Add an embed |

> Shortcuts are disabled while typing in input fields.

---

## Adding Content

### Add a Game
1. Enter a **Game URL**
2. Enter a **Game Name**
3. Click **Add Game** or press `A`

### Add an Embed
1. Paste a full `<iframe>` embed code
2. Enter an embed name
3. Click **Add Embed** or press `E`

---

## Importing Content

You can import a saved content list from a JSON file.

### JSON Format

```json
[
  {
    "name": "Example Game",
    "url": "https://example.com"
  },
  {
    "name": "Example Embed",
    "embed": "<iframe src='https://example.com'></iframe>"
  }
]
