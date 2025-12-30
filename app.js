// Main JS Logic
let contentList = JSON.parse(localStorage.getItem('contentList')) || [];
let isMuted = false;

// ------------------------- Populate & Dropdown -------------------------
function populateDropdown() {
    const select = document.getElementById("game-select");
    const searchValue = document.getElementById("game-search").value.toLowerCase();
    select.innerHTML = '<option value="">--Select an option--</option>';

    contentList
        .filter(c => c.name.toLowerCase().includes(searchValue))
        .forEach((content, index) => {
            const option = document.createElement("option");
            option.value = content.url || '';
            option.textContent = content.name;
            select.appendChild(option);
        });
    updateGameList();
}

// ------------------------- Iframe Controls -------------------------
function changeGame() {
    const select = document.getElementById("game-select");
    const iframe = document.getElementById("gameFrame");
    const selectedContent = contentList[select.selectedIndex - 1];
    if (!selectedContent) return;

    if (selectedContent.url) iframe.src = selectedContent.url;
    else if (selectedContent.embed) iframe.srcdoc = selectedContent.embed;

    logToDebugConsole(`Changed to ${selectedContent.name}`);
}

function toggleFullscreen() {
    const iframe = document.getElementById("gameFrame");
    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
    logToDebugConsole("Toggled fullscreen mode");
}

function refreshIframe() {
    const iframe = document.getElementById("gameFrame");
    iframe.src = iframe.src;
    logToDebugConsole("Refreshed iframe content");
}

function playIframe() {
    sendIframeMessage('play');
}
function pauseIframe() {
    sendIframeMessage('pause');
}
function muteIframe() {
    const iframe = document.getElementById("gameFrame");
    isMuted = !isMuted;
    try {
        iframe.contentWindow.document.querySelectorAll('video, audio').forEach(media => media.muted = isMuted);
        logToDebugConsole(`Iframe ${isMuted ? 'muted' : 'unmuted'}`);
    } catch(e) {
        logToDebugConsole('Mute failed (cross-origin restrictions)');
    }
}

function sendIframeMessage(action) {
    const iframe = document.getElementById("gameFrame");
    try {
        const media = iframe.contentWindow.document.querySelectorAll('video, audio');
        media.forEach(m => action === 'play' ? m.play() : m.pause());
        logToDebugConsole(`Iframe ${action} triggered`);
    } catch(e) {
        if (iframe.src.includes("youtube.com")) {
            iframe.contentWindow.postMessage(`{"event":"command","func":"${action}Video","args":""}`, "*");
            logToDebugConsole(`YouTube ${action} triggered`);
        } else {
            logToDebugConsole('Play/Pause failed (cross-origin restrictions)');
        }
    }
}

// ------------------------- Content Management -------------------------
function addGame() {
    const newUrl = document.getElementById("newGameUrl").value.trim();
    const newName = document.getElementById("newGameName").value.trim();
    if (!newUrl || !newName) return alert('Enter both name and URL');

    if (contentList.some(c => c.name === newName)) return alert('Duplicate name');
    contentList.push({ name: newName, url: newUrl });
    saveContent();
    clearInputs();
    logToDebugConsole(`Added game: ${newName}`);
}

function addEmbed() {
    const embedCode = document.getElementById("embedCode").value.trim();
    const embedName = document.getElementById("embedName").value.trim();
    if (!embedCode || !embedName) return alert('Enter both name and embed code');

    if (contentList.some(c => c.name === embedName)) return alert('Duplicate name');
    contentList.push({ name: embedName, embed: embedCode });
    saveContent();
    clearInputs();
    logToDebugConsole(`Added embed: ${embedName}`);
}

function clearInputs() {
    document.getElementById("newGameUrl").value = '';
    document.getElementById("newGameName").value = '';
    document.getElementById("embedCode").value = '';
    document.getElementById("embedName").value = '';
}

// ------------------------- List Management -------------------------
function updateGameList() {
    const list = document.getElementById("gameList");
    list.innerHTML = '';
    contentList.forEach((content, index) => {
        const div = document.createElement('div');
        div.className = 'game-item';
        div.innerHTML = `<span>${content.name}</span>
            <div>
                <button onclick="editContent(${index})">Edit</button>
                <button onclick="deleteContent(${index})">Delete</button>
            </div>`;
        list.appendChild(div);
    });
}

// Drag & Drop
let dragStartIndex;
function dragStart(e) { dragStartIndex = +this.closest('.game-item').getAttribute('data-index'); }
function dragOver(e) { e.preventDefault(); }
function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    const temp = contentList[dragStartIndex];
    contentList[dragStartIndex] = contentList[dragEndIndex];
    contentList[dragEndIndex] = temp;
    saveContent();
}

function editContent(index) {
    const content = contentList[index];
    if (content.url) {
        document.getElementById("newGameUrl").value = content.url;
        document.getElementById("newGameName").value = content.name;
    } else {
        document.getElementById("embedCode").value = content.embed;
        document.getElementById("embedName").value = content.name;
    }
    deleteContent(index);
    logToDebugConsole(`Editing: ${content.name}`);
}

function deleteContent(index) {
    if (!confirm(`Delete "${contentList[index].name}"?`)) return;
    const name = contentList[index].name;
    contentList.splice(index, 1);
    saveContent();
    logToDebugConsole(`Deleted: ${name}`);
}

// ------------------------- JSON Import/Export -------------------------
function importFromJSON(event) {
    const fileReader = new FileReader();
    fileReader.onload = e => {
        try {
            const data = JSON.parse(e.target.result);
            if (!Array.isArray(data)) return alert('Invalid JSON format');
            contentList = data;
            saveContent();
            logToDebugConsole('Imported JSON content');
        } catch (err) { alert('Error parsing JSON'); console.error(err); }
    };
    fileReader.readAsText(event.target.files[0]);
}

function exportToJSON() {
    const blob = new Blob([JSON.stringify(contentList, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contentList.json';
    link.click();
    logToDebugConsole('Exported content as JSON');
}

// ------------------------- Debug Console -------------------------
function logToDebugConsole(msg) {
    const log = document.getElementById("logOutput");
    const timestamp = new Date().toLocaleTimeString();
    log.innerHTML += `[${timestamp}] ${msg}<br>`;
    log.scrollTop = log.scrollHeight;
}

document.getElementById("toggleDebug").onclick = () => {
    const area = document.getElementById("debugArea");
    area.style.display = area.style.display === 'none' ? 'block' : 'none';
};

// ------------------------- Dark/Light Mode -------------------------
document.getElementById("toggleTheme").onclick = () => document.body.classList.toggle('dark');

// ------------------------- Search -------------------------
document.getElementById("game-search").addEventListener('input', populateDropdown);

// ------------------------- Hotkeys -------------------------
document.addEventListener('keydown', e => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    switch(e.key) {
        case 'f': toggleFullscreen(); break;
        case 'r': refreshIframe(); break;
        case 'p': pauseIframe(); break;
        case 'l': playIframe(); break;
        case 'm': muteIframe(); break;
        case 'a': addGame(); break;
        case 'e': addEmbed(); break;
    }
});

// ------------------------- Initialize -------------------------
function saveContent() {
    localStorage.setItem('contentList', JSON.stringify(contentList));
    populateDropdown();
}

window.onload = populateDropdown;
