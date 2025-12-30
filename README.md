[README.md](https://github.com/user-attachments/files/24386810/README.md)
\# iFrame WebLoader



A lightweight, fully client-side web application that allows you to load, manage, and play web-based games or embedded content inside a single iframe.  

All data is stored locally in the browser, requiring \*\*no backend, no hosting setup, and no dependencies\*\*.



This project works both \*\*locally\*\* and via an \*\*existing GitHub Pages deployment\*\*.



---



\## Live Demo



You can use the application immediately without downloading anything:



\*\*GitHub Pages:\*\*  

`https://blaydeezil.github.io/iFrame-WebLoader/`



The live demo provides the full feature set:



\- Add and manage games or embeds  

\- Persistent storage using `localStorage`  

\- JSON import and export support  

\- Keyboard shortcuts and iframe controls



> Content is saved per browser and per domain. Data stored on the GitHub Pages site is separate from local file usage.



---



\## Features



\- Load web games via direct URLs  

\- Load embedded content using raw iframe HTML (`<iframe>` embed code)  

\- Central iframe playback area  

\- Persistent storage using `localStorage`  

\- Import and export content lists as JSON files  

\- Fullscreen iframe support  

\- Refresh, play, pause, and mute controls  

\- Built-in debug console with timestamps  

\- Keyboard shortcuts for fast control  

\- Fully client-side — no frameworks or external libraries



---



\## How It Works



\- All content is stored locally in the browser using `localStorage`.  

\- Games are loaded using `iframe.src`.  

\- Embeds are loaded using `iframe.srcdoc`.  

\- The application runs entirely client-side.  

\- No network requests are made except to the loaded game or embed itself.



> Some third-party content may have cross-origin restrictions, preventing JavaScript controls from working (for example, certain YouTube or other iframe embeds).



---



\## Controls



\### Buttons



| Button | Action |

|--------|--------|

| Toggle Fullscreen | Makes the iframe fullscreen |

| Refresh Iframe | Reloads the current iframe |

| Pause Iframe | Pauses supported media (YouTube or HTML5 video/audio) |

| Play Iframe | Plays supported media (YouTube or HTML5 video/audio) |

| Mute/Unmute | Toggles audio for supported media in the iframe |

| Import from JSON | Loads content from a `.json` file |

| Export to JSON | Saves your current content list to a `.json` file |



\### Keyboard Shortcuts



| Key | Action |

|-----|--------|

| `F` | Toggle fullscreen |

| `R` | Refresh iframe |

| `P` | Pause media in iframe |

| `L` | Play media in iframe |

| `M` | Mute/Unmute iframe |

| `A` | Add a game |

| `E` | Add an embed |



> Shortcuts are disabled while typing in input fields.



---



\## Adding Content



\### Add a Game

1\. Enter a \*\*Game URL\*\* (direct link to the game).  

2\. Enter a \*\*Game Name\*\*.  

3\. Click \*\*Add Game\*\* or press `A`.



\### Add an Embed

1\. Paste a full iframe HTML snippet, for example:



```html

<iframe src="https://example.com" width="800" height="600"></iframe>



&nbsp;   Enter an Embed Name.



&nbsp;   Click Add Embed or press E.



Importing \& Exporting Content



You can import a saved content list from a JSON file or export your current content list for backup.

JSON Format



\[

&nbsp; {

&nbsp;   "name": "Example Game",

&nbsp;   "url": "https://example.com"

&nbsp; },

&nbsp; {

&nbsp;   "name": "Example Embed",

&nbsp;   "embed": "<iframe src='https://example.com' width='800' height='600'></iframe>"

&nbsp; }

]



&nbsp;   Imported JSON must be an array of objects with either a "url" (game) or "embed" (iframe embed) field.



&nbsp;   Exported JSON can be downloaded and re-imported later to restore your library.



Running Locally

Option 1: Open Directly in Browser



&nbsp;   Place index.html, style.css, and app.js in the same folder.



&nbsp;   Double-click index.html to open in your default browser.



&nbsp;   Some browsers (notably Chrome) may restrict local iframe scripts or JSON import/export when opened via file://. For full functionality, use a local server.



Option 2: Use a Local Server (Recommended)

VSCode + Live Server



&nbsp;   Open the project folder in Visual Studio Code.



&nbsp;   Install the Live Server extension.



&nbsp;   Right-click index.html → Open with Live Server.



Python Simple Server



&nbsp;   Open a terminal in your project folder.



&nbsp;   Run:



python -m http.server 8000



&nbsp;   Open your browser and navigate to:



http://localhost:8000/index.html



Notes



&nbsp;   Data is saved per browser using localStorage.



&nbsp;   Cross-origin restrictions may prevent some iframe interactions (play/pause/mute) for third-party content.



&nbsp;   Works fully locally when served over HTTP (local server) or when hosted on GitHub Pages.

