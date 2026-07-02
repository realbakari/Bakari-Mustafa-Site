/* Code Workspace */

let editor = null;
let currentFileIndex = 0;
let files = [];
let pyodideInstance = null;
let pyodideLoadingPromise = null;
let yamlLibraryPromise = null;
let markdownLibraryPromise = null;
let isHydratingModel = false;
let startupNotice = null;
let currentTheme = 'sublime-warm';
let layoutState = null;

const DEFAULT_LAYOUT_STATE = {
    sidebarCollapsed: false,
    panelVisible: true,
    panelPosition: 'bottom',
    panelMaximized: false,
    sidebarWidth: 220,
    panelBottomSize: 220,
    panelRightSize: 360
};

const STORAGE_KEYS = {
    projects: 'codeEditorProProjectsV2',
    autoSave: 'codeEditorProAutoSaveV2'
};

const BACKEND_CONFIG = {
    pistonApi: 'https://emkc.org/api/v2/piston'
};

const LANGUAGE_EXTENSIONS = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    ruby: 'rb',
    html: 'html',
    css: 'css',
    json: 'json',
    markdown: 'md',
    yaml: 'yml',
    sql: 'sql',
    shell: 'sh',
    php: 'php',
    go: 'go',
    rust: 'rs',
    java: 'java',
    csharp: 'cs',
    cpp: 'cpp'
};

const EXTENSION_LANGUAGES = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    rb: 'ruby',
    html: 'html',
    htm: 'html',
    css: 'css',
    json: 'json',
    md: 'markdown',
    markdown: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
    sql: 'sql',
    sh: 'shell',
    bash: 'shell',
    php: 'php',
    go: 'go',
    rs: 'rust',
    java: 'java',
    cs: 'csharp',
    cpp: 'cpp',
    cxx: 'cpp',
    cc: 'cpp'
};

const LANGUAGE_ACCENTS = {
    javascript: '#d1a14a',
    typescript: '#4f7bd8',
    python: '#5b8c6a',
    ruby: '#9c5044',
    html: '#ba6b3f',
    css: '#5b7bd4',
    json: '#8e6f41',
    markdown: '#7f5a98',
    yaml: '#857a6a',
    sql: '#7d8f59',
    shell: '#6d8a76',
    php: '#7a6cb0',
    go: '#4e8aa3',
    rust: '#85593d',
    java: '#a85f42',
    csharp: '#6e8b4d',
    cpp: '#5e72ad'
};

const codeTemplates = {
    javascript: `const entries = [
  { place: "Dzaleka", visitors: 12 },
  { place: "Lilongwe", visitors: 7 }
];

const total = entries.reduce((sum, item) => sum + item.visitors, 0);
console.log("Total visitors:", total);
console.log("First entry:", entries[0]);`,

    typescript: `type Event = {
  title: string;
  year: number;
};

const keynote: Event = {
  title: "Planning a community workshop",
  year: 2026
};

console.log(\`\${keynote.title} (\${keynote.year})\`);`,

    python: `from statistics import mean

scores = [82, 91, 88, 95]
print("Average score:", mean(scores))`,

    ruby: `cities = ["Dzaleka", "Blantyre", "Mzuzu"]
puts "Known places:"
cities.each { |city| puts "- #{city}" }`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>
</head>
<body>
  <main class="card">
    <p class="eyebrow">Field notes</p>
    <h1>Workshop notes</h1>
    <p>This preview uses the active HTML file plus any open CSS files.</p>
  </main>
</body>
</html>`,

    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f6f7f9;
  color: #20242a;
  font-family: "Avenir Next", "Segoe UI", sans-serif;
}

.card {
  width: min(520px, calc(100vw - 48px));
  padding: 2.5rem;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(32, 36, 42, 0.12);
  box-shadow: 0 16px 42px rgba(32, 36, 42, 0.12);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  color: #52616f;
}

h1 {
  margin: 0.6rem 0 1rem;
  font: 600 2.5rem/1 Georgia, serif;
}`,

    json: `{
  "name": "visit-dzaleka",
  "founded": 2025,
  "focus": ["culture", "history", "community"],
  "active": true
}`,

    markdown: `# Editor Notes

This workspace supports:

- JavaScript in the browser
- Python with Pyodide
- Remote execution for Ruby, Go, Rust, Java, C#, PHP, Shell, and more

> Use Console for execution output and Preview for rendered files.`,

    yaml: `site:
  name: Bakari Mustafa
  location: Australia
projects:
  - name: Visit Dzaleka
    active: true
  - name: Dzaleka Digital Heritage
    active: true`,

    sql: `SELECT project_name, founded_year
FROM heritage_projects
WHERE active = true
ORDER BY founded_year DESC;`,

    shell: `echo "Deploy check"
echo "Current environment looks healthy"`,

    php: `<?php
$numbers = [4, 8, 15, 16, 23, 42];
echo "Count: " . count($numbers) . PHP_EOL;
echo "Largest: " . max($numbers) . PHP_EOL;
?>`,

    go: `package main

import "fmt"

func main() {
    places := []string{"Dzaleka", "Mchinji", "Lilongwe"}
    fmt.Println("Places:", places)
}`,

    rust: `fn main() {
    let values = [3, 5, 8, 13];
    let total: i32 = values.iter().sum();
    println!("Total: {}", total);
}`,

    java: `public class Main {
    public static void main(String[] args) {
        String[] names = {"Bakari", "Amina", "Sam"};
        System.out.println("People: " + String.join(", ", names));
    }
}`,

    csharp: `using System;

class Program {
    static void Main() {
        var title = "Dzaleka Digital Heritage";
        Console.WriteLine(title);
    }
}`,

    cpp: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> values = {2, 4, 6, 8};
    int total = 0;
    for (int value : values) total += value;
    std::cout << "Total: " << total << std::endl;
    return 0;
}`
};

const runtimeProfiles = {
    javascript: {
        label: 'Browser runtime',
        description: 'JavaScript executes directly in the page and captures console output.',
        short: 'Browser console'
    },
    typescript: {
        label: 'Remote runtime',
        description: 'TypeScript runs through a remote execution service.',
        short: 'Remote execution'
    },
    python: {
        label: 'Pyodide runtime',
        description: 'Python runs in-browser through Pyodide, with no backend required.',
        short: 'Local Python'
    },
    ruby: {
        label: 'Remote runtime',
        description: 'Ruby runs through a remote execution service.',
        short: 'Remote execution'
    },
    html: {
        label: 'Live preview',
        description: 'HTML renders in the preview pane and can include open CSS files.',
        short: 'Preview mode'
    },
    css: {
        label: 'Style preview',
        description: 'CSS renders against a sample layout or the first open HTML file.',
        short: 'Preview mode'
    },
    json: {
        label: 'Validation mode',
        description: 'JSON is parsed and prettified locally so you can confirm structure quickly.',
        short: 'Validation'
    },
    markdown: {
        label: 'Preview mode',
        description: 'Markdown is converted into readable HTML in the preview pane.',
        short: 'Preview mode'
    },
    yaml: {
        label: 'Validation mode',
        description: 'YAML is parsed locally and rendered as a structured JSON view.',
        short: 'Validation'
    },
    sql: {
        label: 'Inspection mode',
        description: 'SQL is formatted for review and analyzed for statement type and tables.',
        short: 'Inspection'
    },
    shell: {
        label: 'Remote runtime',
        description: 'Shell scripts run through a remote execution service.',
        short: 'Remote execution'
    },
    php: {
        label: 'Remote runtime',
        description: 'PHP runs through a remote execution service.',
        short: 'Remote execution'
    },
    go: {
        label: 'Remote runtime',
        description: 'Go runs through a remote execution service.',
        short: 'Remote execution'
    },
    rust: {
        label: 'Remote runtime',
        description: 'Rust runs through a remote execution service.',
        short: 'Remote execution'
    },
    java: {
        label: 'Remote runtime',
        description: 'Java runs through a remote execution service.',
        short: 'Remote execution'
    },
    csharp: {
        label: 'Remote runtime',
        description: 'C# runs through a remote execution service.',
        short: 'Remote execution'
    },
    cpp: {
        label: 'Remote runtime',
        description: 'C++ runs through a remote execution service.',
        short: 'Remote execution'
    }
};

require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });

require(['vs/editor/editor.main'], initializeEditor);

function initializeEditor() {
    registerEditorThemes();

    const initialState = getInitialState();
    files = initialState.files;
    currentFileIndex = initialState.currentFileIndex;
    currentTheme = initialState.theme || currentTheme;
    layoutState = normalizeLayoutState(initialState.layout);
    document.getElementById('theme-select').value = currentTheme;

    editor = monaco.editor.create(document.getElementById('editor'), {
        value: files[currentFileIndex].content,
        language: files[currentFileIndex].language,
        theme: currentTheme,
        fontSize: 14,
        minimap: { enabled: true },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        lineNumbers: 'on',
        renderLineHighlight: 'line',
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        bracketPairColorization: { enabled: true }
    });

    registerKeyboardShortcuts();

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        runCode();
    });

    editor.onDidChangeModelContent(() => {
        if (isHydratingModel || !files[currentFileIndex]) {
            return;
        }

        files[currentFileIndex].content = editor.getValue();
        files[currentFileIndex].dirty = true;
        renderTabs();
        updateStatusBar();
        autoSave();
    });

    editor.onDidChangeCursorPosition(() => {
        updateCursorPosition();
    });

    setupEventListeners();
    applyLayoutState();
    hydrateCurrentFile();
    initSplitters();

    document.getElementById('loading').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';

    if (startupNotice) {
        showNotification(startupNotice, 'success');
    }
}

function registerEditorThemes() {
    monaco.editor.defineTheme('sublime-warm', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '75715E' },
            { token: 'keyword', foreground: 'F92672' },
            { token: 'number', foreground: 'AE81FF' },
            { token: 'string', foreground: 'E6DB74' },
            { token: 'delimiter', foreground: 'F8F8F2' },
            { token: 'type.identifier', foreground: '66D9EF' },
            { token: 'identifier', foreground: 'F8F8F2' }
        ],
        colors: {
            'editor.background': '#272822',
            'editor.foreground': '#F8F8F2',
            'editorLineNumber.foreground': '#6F745F',
            'editorLineNumber.activeForeground': '#F8F8F2',
            'editorCursor.foreground': '#F8F8F0',
            'editor.selectionBackground': '#49483E',
            'editor.inactiveSelectionBackground': '#3E3D32',
            'editor.lineHighlightBackground': '#3A3D32',
            'editorIndentGuide.background1': '#414339',
            'editorIndentGuide.activeBackground1': '#75715E',
            'editorWhitespace.foreground': '#49483E'
        }
    });

    monaco.editor.defineTheme('sublime-light', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '8E908C' },
            { token: 'keyword', foreground: '8959A8' },
            { token: 'number', foreground: 'F5871F' },
            { token: 'string', foreground: '718C00' },
            { token: 'type.identifier', foreground: '4271AE' },
            { token: 'identifier', foreground: '2F3337' }
        ],
        colors: {
            'editor.background': '#F7F5EE',
            'editor.foreground': '#2F3337',
            'editorLineNumber.foreground': '#A9A29A',
            'editorLineNumber.activeForeground': '#2F3337',
            'editorCursor.foreground': '#2F3337',
            'editor.selectionBackground': '#D9D6CC',
            'editor.inactiveSelectionBackground': '#E7E3D9',
            'editor.lineHighlightBackground': '#ECE8DE',
            'editorIndentGuide.background1': '#DED9CE',
            'editorIndentGuide.activeBackground1': '#B9B2A8',
            'editorWhitespace.foreground': '#D1CBC0'
        }
    });
}

function getInitialState() {
    const sharedState = parseSharedState();
    if (sharedState) {
        startupNotice = 'Loaded shared workspace.';
        return sharedState;
    }

    const autoSavedState = parseAutoSavedState();
    if (autoSavedState) {
        startupNotice = 'Restored your last local session.';
        return autoSavedState;
    }

    return {
        files: [createFile('main.js', 'javascript', codeTemplates.javascript)],
        currentFileIndex: 0,
        theme: currentTheme,
        layout: DEFAULT_LAYOUT_STATE
    };
}

function createFile(name, language, content) {
    return {
        name,
        language,
        content,
        dirty: false
    };
}

function normalizeFiles(candidateFiles) {
    if (!Array.isArray(candidateFiles) || candidateFiles.length === 0) {
        return [createFile('main.js', 'javascript', codeTemplates.javascript)];
    }

    return candidateFiles.map((file, index) => {
        const language = LANGUAGE_EXTENSIONS[file && file.language] ? file.language : 'javascript';
        const fallbackName = index === 0 ? 'main.js' : `file-${index + 1}.${getFileExtension(language)}`;
        const name = typeof file?.name === 'string' && file.name.trim() ? file.name.trim() : fallbackName;
        const content = typeof file?.content === 'string' ? file.content : (codeTemplates[language] || '');

        return {
            name,
            language,
            content,
            dirty: Boolean(file?.dirty)
        };
    });
}

function parseSharedState() {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get('share');

    if (!shared) {
        return null;
    }

    try {
        const decoded = JSON.parse(decodeURIComponent(atob(shared)));
        const normalizedFiles = normalizeFiles(decoded.files);
        const nextIndex = clampIndex(decoded.currentFileIndex, normalizedFiles.length);
        return {
            files: normalizedFiles,
            currentFileIndex: nextIndex,
            theme: typeof decoded.theme === 'string' ? decoded.theme : currentTheme,
            layout: decoded.layout
        };
    } catch (error) {
        showNotification('Invalid share link. Starting with a clean workspace.', 'warn');
        return null;
    }
}

function parseAutoSavedState() {
    const raw = localStorage.getItem(STORAGE_KEYS.autoSave);

    if (!raw) {
        return null;
    }

    try {
        const parsed = JSON.parse(raw);
        const normalizedFiles = normalizeFiles(parsed.files);
        const nextIndex = clampIndex(parsed.currentFileIndex, normalizedFiles.length);
        return {
            files: normalizedFiles,
            currentFileIndex: nextIndex,
            theme: typeof parsed.theme === 'string' ? parsed.theme : currentTheme,
            layout: parsed.layout
        };
    } catch (error) {
        return null;
    }
}

function clampIndex(value, length) {
    const index = Number.isInteger(value) ? value : 0;
    if (index < 0) return 0;
    if (index >= length) return length - 1;
    return index;
}

function clampNumber(value, min, max, fallback) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
        return fallback;
    }

    return Math.min(max, Math.max(min, numericValue));
}

function normalizeLayoutState(candidate = {}) {
    const nextState = {
        sidebarCollapsed: Boolean(candidate?.sidebarCollapsed),
        panelVisible: candidate?.panelVisible !== false,
        panelPosition: candidate?.panelPosition === 'right' ? 'right' : 'bottom',
        panelMaximized: Boolean(candidate?.panelMaximized),
        sidebarWidth: clampNumber(candidate?.sidebarWidth, 180, 420, DEFAULT_LAYOUT_STATE.sidebarWidth),
        panelBottomSize: clampNumber(
            candidate?.panelBottomSize ?? candidate?.panelSize,
            160,
            520,
            DEFAULT_LAYOUT_STATE.panelBottomSize
        ),
        panelRightSize: clampNumber(
            candidate?.panelRightSize ?? candidate?.panelSize,
            260,
            760,
            DEFAULT_LAYOUT_STATE.panelRightSize
        )
    };

    if (!nextState.panelVisible) {
        nextState.panelMaximized = false;
    }

    return nextState;
}

function setupEventListeners() {
    document.getElementById('language-select').addEventListener('change', event => {
        const language = event.target.value;
        const file = files[currentFileIndex];
        const previousLanguage = file.language;
        file.language = language;

        if (isGeneratedFileName(file.name, previousLanguage)) {
            file.name = generatedFileName(currentFileIndex, language);
        }

        monaco.editor.setModelLanguage(editor.getModel(), language);
        updateEditorContext();
        updateRuntimeUI();
        updateStatusBar();
        renderTabs();
        autoSave();
    });

    document.getElementById('theme-select').addEventListener('change', event => {
        currentTheme = event.target.value;
        monaco.editor.setTheme(currentTheme);
        updateSidebarInfo();
        autoSave();
    });

    document.getElementById('run-code').addEventListener('click', runCode);
    document.getElementById('save-code').addEventListener('click', () => openModal('save-modal'));
    document.getElementById('load-code').addEventListener('click', openLoadModal);
    document.getElementById('share-code').addEventListener('click', generateShareURL);
    document.getElementById('clear-output').addEventListener('click', () => clearOutput(true));
    document.getElementById('add-tab').addEventListener('click', addNewFile);
    document.getElementById('sidebar-new-file').addEventListener('click', () => addNewFile({ promptForName: true }));
    document.getElementById('sidebar-rename-file').addEventListener('click', renameCurrentFile);
    document.getElementById('sidebar-duplicate-file').addEventListener('click', duplicateCurrentFile);
    document.getElementById('sidebar-import-file').addEventListener('click', triggerImportFile);
    document.getElementById('sidebar-download-file').addEventListener('click', downloadCurrentFile);
    document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);
    document.getElementById('panel-toggle').addEventListener('click', togglePanelVisibility);
    document.getElementById('panel-position-toggle').addEventListener('click', togglePanelPosition);
    document.getElementById('panel-maximize-toggle').addEventListener('click', togglePanelMaximize);
    document.getElementById('import-file-input').addEventListener('change', importFilesFromInput);
    document.getElementById('sidebar-file-filter').addEventListener('input', renderSidebarFiles);

    document.querySelectorAll('.panel-tab').forEach(button => {
        button.addEventListener('click', () => {
            activatePanel(button.dataset.panelTarget);
        });
    });

    document.addEventListener('click', event => {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
            event.target.setAttribute('aria-hidden', 'true');
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
            });
        }
    });

    window.addEventListener('resize', () => {
        applyLayoutState();
    });
}

function hydrateCurrentFile() {
    const file = files[currentFileIndex];
    if (!file) {
        return;
    }

    isHydratingModel = true;
    editor.setValue(file.content);
    monaco.editor.setModelLanguage(editor.getModel(), file.language);
    isHydratingModel = false;

    document.getElementById('language-select').value = file.language;
    updateEditorContext();
    updateRuntimeUI();
    renderTabs();
    renderSidebarFiles();
    updateSidebarInfo();
    updateStatusBar();
    updateCursorPosition();
}

function registerKeyboardShortcuts() {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        openModal('save-modal');
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyN, () => {
        addNewFile({ promptForName: true });
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyW, () => {
        closeFile(currentFileIndex);
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyR, () => {
        renameCurrentFile();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyD, () => {
        duplicateCurrentFile();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO, () => {
        triggerImportFile();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
        editor.getAction('actions.find').run();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {
        editor.getAction('editor.action.startFindReplaceAction').run();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
        editor.getAction('editor.action.commentLine').run();
    });
}

function saveCurrentEditorContent() {
    if (!editor || !files[currentFileIndex]) {
        return;
    }

    files[currentFileIndex].content = editor.getValue();
}

function renderSidebarFiles() {
    const sidebarList = document.getElementById('sidebar-file-list');
    if (!sidebarList) {
        return;
    }

    sidebarList.innerHTML = '';
    const filterValue = (document.getElementById('sidebar-file-filter')?.value || '').trim().toLowerCase();
    const matchingFiles = files
        .map((file, index) => ({ file, index }))
        .filter(({ file }) => {
            if (!filterValue) {
                return true;
            }

            return file.name.toLowerCase().includes(filterValue) || file.language.toLowerCase().includes(filterValue);
        });

    if (!matchingFiles.length) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = 'No matching files.';
        sidebarList.appendChild(empty);
        return;
    }

    matchingFiles.forEach(({ file, index }) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `sidebar-file${index === currentFileIndex ? ' active' : ''}`;

        const nameRow = document.createElement('div');
        nameRow.className = 'sidebar-file-name-row';

        const dot = document.createElement('span');
        dot.className = 'sidebar-file-dot';
        dot.style.backgroundColor = LANGUAGE_ACCENTS[file.language] || '#f89d1b';

        const name = document.createElement('span');
        name.className = 'sidebar-file-name';
        name.textContent = file.name;

        nameRow.appendChild(dot);
        nameRow.appendChild(name);

        if (file.dirty) {
            const dirty = document.createElement('span');
            dirty.className = 'sidebar-file-dirty';
            dirty.textContent = '•';
            nameRow.appendChild(dirty);
        }

        const meta = document.createElement('div');
        meta.className = 'sidebar-file-meta';
        meta.textContent = file.language;

        button.appendChild(nameRow);
        button.appendChild(meta);
        button.addEventListener('click', () => {
            switchFile(index);
        });
        sidebarList.appendChild(button);
    });
}

function updateSidebarInfo() {
    const file = files[currentFileIndex];
    if (!file) {
        return;
    }

    document.getElementById('sidebar-active-file').textContent = file.name;
    document.getElementById('sidebar-open-count').textContent = String(files.length);
    document.getElementById('sidebar-active-language').textContent = file.language;
    document.getElementById('sidebar-theme-name').textContent = getThemeLabel(currentTheme);
}

function isCompactLayout() {
    return window.matchMedia('(max-width: 900px)').matches;
}

function getPanelSizeForCurrentLayout() {
    if (layoutState.panelPosition === 'right' && !isCompactLayout()) {
        return layoutState.panelRightSize;
    }

    return layoutState.panelBottomSize;
}

function updateLayoutControls() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const panelToggle = document.getElementById('panel-toggle');
    const panelPositionToggle = document.getElementById('panel-position-toggle');
    const panelMaximizeToggle = document.getElementById('panel-maximize-toggle');
    const panelLocationLabel = document.getElementById('panel-location-label');

    if (!sidebarToggle || !panelToggle || !panelPositionToggle || !panelMaximizeToggle || !panelLocationLabel) {
        return;
    }

    const compact = isCompactLayout();

    sidebarToggle.textContent = compact
        ? 'Files hidden'
        : layoutState.sidebarCollapsed ? 'Show files' : 'Hide files';
    sidebarToggle.disabled = compact;

    panelToggle.textContent = layoutState.panelVisible ? 'Hide output' : 'Show output';

    panelPositionToggle.textContent = compact
        ? 'Docked bottom'
        : layoutState.panelPosition === 'right' ? 'Dock bottom' : 'Dock right';
    panelPositionToggle.disabled = compact;

    panelMaximizeToggle.textContent = layoutState.panelMaximized ? 'Restore editor' : 'Maximize output';
    panelMaximizeToggle.disabled = !layoutState.panelVisible;

    let label = layoutState.panelPosition === 'right' && !compact ? 'Docked right' : 'Docked bottom';
    if (!layoutState.panelVisible) {
        label = 'Output hidden';
    } else if (layoutState.panelMaximized) {
        label = 'Output maximized';
    }

    panelLocationLabel.textContent = label;
}

function applyLayoutState() {
    const workspace = document.getElementById('workspace');
    const workspaceMain = document.getElementById('workspace-main');

    if (!workspace || !workspaceMain || !layoutState) {
        return;
    }

    workspace.classList.toggle('sidebar-collapsed', layoutState.sidebarCollapsed);
    workspace.style.setProperty('--sidebar-width', `${layoutState.sidebarWidth}px`);

    workspaceMain.classList.remove('panel-bottom', 'panel-right', 'panel-hidden', 'panel-maximized');
    workspaceMain.classList.add(layoutState.panelPosition === 'right' ? 'panel-right' : 'panel-bottom');

    if (!layoutState.panelVisible) {
        workspaceMain.classList.add('panel-hidden');
    } else if (layoutState.panelMaximized) {
        workspaceMain.classList.add('panel-maximized');
    }

    workspaceMain.style.setProperty('--panel-size', `${getPanelSizeForCurrentLayout()}px`);
    updateLayoutControls();

    if (editor) {
        window.requestAnimationFrame(() => {
            editor.layout();
        });
    }
}

function toggleSidebar() {
    if (isCompactLayout()) {
        return;
    }

    layoutState.sidebarCollapsed = !layoutState.sidebarCollapsed;
    applyLayoutState();
    autoSave();
}

function togglePanelVisibility() {
    layoutState.panelVisible = !layoutState.panelVisible;

    if (!layoutState.panelVisible) {
        layoutState.panelMaximized = false;
    }

    applyLayoutState();
    autoSave();
}

function togglePanelPosition() {
    if (isCompactLayout()) {
        return;
    }

    layoutState.panelPosition = layoutState.panelPosition === 'right' ? 'bottom' : 'right';
    applyLayoutState();
    autoSave();
}

function togglePanelMaximize() {
    if (!layoutState.panelVisible) {
        layoutState.panelVisible = true;
    }

    layoutState.panelMaximized = !layoutState.panelMaximized;
    applyLayoutState();
    autoSave();
}

function initSplitters() {
    const sidebarSplitter = document.getElementById('sidebar-splitter');
    const panelSplitter = document.getElementById('panel-splitter');

    if (sidebarSplitter && !sidebarSplitter.dataset.bound) {
        sidebarSplitter.dataset.bound = 'true';
        sidebarSplitter.addEventListener('pointerdown', event => {
            startResize(event, 'sidebar');
        });
    }

    if (panelSplitter && !panelSplitter.dataset.bound) {
        panelSplitter.dataset.bound = 'true';
        panelSplitter.addEventListener('pointerdown', event => {
            startResize(event, 'panel');
        });
    }
}

function startResize(event, kind) {
    if (!layoutState || (event.button !== undefined && event.button !== 0)) {
        return;
    }

    if (kind === 'sidebar' && (layoutState.sidebarCollapsed || isCompactLayout())) {
        return;
    }

    if (kind === 'panel' && (!layoutState.panelVisible || layoutState.panelMaximized)) {
        return;
    }

    event.preventDefault();

    const splitter = event.currentTarget;
    const workspace = document.getElementById('workspace');
    const workspaceMain = document.getElementById('workspace-main');

    if (!workspace || !workspaceMain) {
        return;
    }

    const workspaceRect = workspace.getBoundingClientRect();
    const workspaceMainRect = workspaceMain.getBoundingClientRect();
    const panelUsesRightDock = layoutState.panelPosition === 'right' && !isCompactLayout();
    const dragCursor = kind === 'sidebar' || panelUsesRightDock ? 'col-resize' : 'row-resize';

    splitter.classList.add('dragging');
    document.body.style.userSelect = 'none';
    document.body.style.cursor = dragCursor;

    const onPointerMove = moveEvent => {
        if (kind === 'sidebar') {
            const maxSidebarWidth = Math.max(240, Math.min(460, workspaceRect.width - 360));
            layoutState.sidebarWidth = clampNumber(
                moveEvent.clientX - workspaceRect.left,
                180,
                maxSidebarWidth,
                layoutState.sidebarWidth
            );
            workspace.style.setProperty('--sidebar-width', `${layoutState.sidebarWidth}px`);
        } else if (panelUsesRightDock) {
            const maxRightPanel = Math.max(320, Math.min(760, workspaceMainRect.width - 240));
            layoutState.panelRightSize = clampNumber(
                workspaceMainRect.right - moveEvent.clientX,
                260,
                maxRightPanel,
                layoutState.panelRightSize
            );
            workspaceMain.style.setProperty('--panel-size', `${layoutState.panelRightSize}px`);
        } else {
            const maxBottomPanel = Math.max(220, Math.min(560, workspaceMainRect.height - 180));
            layoutState.panelBottomSize = clampNumber(
                workspaceMainRect.bottom - moveEvent.clientY,
                160,
                maxBottomPanel,
                layoutState.panelBottomSize
            );
            workspaceMain.style.setProperty('--panel-size', `${layoutState.panelBottomSize}px`);
        }

        if (editor) {
            window.requestAnimationFrame(() => {
                editor.layout();
            });
        }
    };

    const stopResize = () => {
        splitter.classList.remove('dragging');
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', stopResize);
        window.removeEventListener('pointercancel', stopResize);
        applyLayoutState();
        autoSave();
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', stopResize);
    window.addEventListener('pointercancel', stopResize);
}

function renderTabs() {
    const tabsContainer = document.getElementById('tabs');
    tabsContainer.innerHTML = '';

    files.forEach((file, index) => {
        const tab = document.createElement('div');
        tab.className = `tab${index === currentFileIndex ? ' active' : ''}`;
        tab.tabIndex = 0;
        tab.setAttribute('role', 'button');
        tab.setAttribute('aria-label', `Open ${file.name}`);

        const dot = document.createElement('span');
        dot.className = 'tab-language';
        dot.style.backgroundColor = LANGUAGE_ACCENTS[file.language] || '#a16439';

        const name = document.createElement('span');
        name.className = 'tab-name';
        name.textContent = `${file.name}${file.dirty ? ' •' : ''}`;

        tab.appendChild(dot);
        tab.appendChild(name);

        if (files.length > 1) {
            const close = document.createElement('button');
            close.type = 'button';
            close.className = 'close-tab';
            close.setAttribute('aria-label', `Close ${file.name}`);
            close.textContent = '×';
            close.addEventListener('click', event => {
                event.stopPropagation();
                closeFile(index);
            });
            tab.appendChild(close);
        }

        tab.addEventListener('click', () => {
            switchFile(index);
        });
        tab.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                switchFile(index);
            }
        });

        tabsContainer.appendChild(tab);
    });
}

function switchFile(index) {
    if (index < 0 || index >= files.length) {
        return;
    }

    saveCurrentEditorContent();
    currentFileIndex = index;
    hydrateCurrentFile();
    autoSave();
    editor.focus();
}

function addNewFile(options = {}) {
    saveCurrentEditorContent();

    const fallbackLanguage = document.getElementById('language-select').value || 'javascript';
    let language = fallbackLanguage;
    let fileName = generatedFileName(files.length, language);

    if (options.promptForName) {
        const suggestedName = generatedFileName(files.length, fallbackLanguage);
        const requestedName = window.prompt('Name the new file:', suggestedName);

        if (requestedName === null) {
            return;
        }

        fileName = normalizeFileName(requestedName, fallbackLanguage) || suggestedName;
        language = getLanguageFromFileName(fileName) || fallbackLanguage;
    }

    const newFile = createFile(
        fileName,
        language,
        codeTemplates[language] || ''
    );

    files.push(newFile);
    currentFileIndex = files.length - 1;
    hydrateCurrentFile();
    autoSave();
    showNotification(`Created ${newFile.name}.`, 'success');
}

function closeFile(index) {
    if (files.length === 1) {
        showNotification('Keep at least one file open.', 'warn');
        return;
    }

    const closingCurrent = index === currentFileIndex;
    files.splice(index, 1);

    if (closingCurrent) {
        currentFileIndex = Math.max(0, index - 1);
    } else if (index < currentFileIndex) {
        currentFileIndex -= 1;
    }

    currentFileIndex = clampIndex(currentFileIndex, files.length);
    hydrateCurrentFile();
    autoSave();
}

function generatedFileName(index, language) {
    const extension = getFileExtension(language);
    const nextNumber = index + 1;
    return `untitled-${nextNumber}.${extension}`;
}

function getLanguageFromFileName(fileName) {
    const extension = fileName.includes('.') ? fileName.split('.').pop().toLowerCase() : '';
    return EXTENSION_LANGUAGES[extension] || null;
}

function normalizeFileName(fileName, fallbackLanguage = 'javascript') {
    const trimmed = String(fileName || '').trim().replace(/[\\/:*?"<>|]+/g, '-');

    if (!trimmed) {
        return '';
    }

    if (trimmed.includes('.')) {
        return trimmed;
    }

    return `${trimmed}.${getFileExtension(fallbackLanguage)}`;
}

function createCopyName(fileName) {
    const lastDot = fileName.lastIndexOf('.');

    if (lastDot === -1) {
        return `${fileName}-copy`;
    }

    return `${fileName.slice(0, lastDot)}-copy${fileName.slice(lastDot)}`;
}

function renameCurrentFile() {
    const file = files[currentFileIndex];
    if (!file) {
        return;
    }

    const requestedName = window.prompt('Rename file:', file.name);
    if (requestedName === null) {
        return;
    }

    const nextName = normalizeFileName(requestedName, file.language);
    if (!nextName) {
        showNotification('File name cannot be empty.', 'warn');
        return;
    }

    file.name = nextName;

    const nextLanguage = getLanguageFromFileName(nextName);
    if (nextLanguage) {
        file.language = nextLanguage;
        monaco.editor.setModelLanguage(editor.getModel(), nextLanguage);
        document.getElementById('language-select').value = nextLanguage;
    }

    hydrateCurrentFile();
    autoSave();
    showNotification(`Renamed to ${nextName}.`, 'success');
}

function duplicateCurrentFile() {
    saveCurrentEditorContent();
    const file = files[currentFileIndex];
    if (!file) {
        return;
    }

    const suggestedName = createCopyName(file.name);
    const requestedName = window.prompt('Duplicate file as:', suggestedName);
    if (requestedName === null) {
        return;
    }

    const nextName = normalizeFileName(requestedName, file.language);
    if (!nextName) {
        showNotification('File name cannot be empty.', 'warn');
        return;
    }

    const nextLanguage = getLanguageFromFileName(nextName) || file.language;
    files.push(createFile(nextName, nextLanguage, file.content));
    currentFileIndex = files.length - 1;
    hydrateCurrentFile();
    autoSave();
    showNotification(`Duplicated as ${nextName}.`, 'success');
}

function triggerImportFile() {
    const input = document.getElementById('import-file-input');
    if (!input) {
        return;
    }

    input.value = '';
    input.click();
}

async function importFilesFromInput(event) {
    const importedFiles = Array.from(event.target.files || []);
    if (!importedFiles.length) {
        return;
    }

    saveCurrentEditorContent();

    for (const importedFile of importedFiles) {
        const content = await importedFile.text();
        const name = normalizeFileName(importedFile.name, 'javascript');
        const language = getLanguageFromFileName(name) || 'javascript';
        files.push(createFile(name, language, content));
    }

    currentFileIndex = files.length - 1;
    hydrateCurrentFile();
    autoSave();
    showNotification(`Imported ${importedFiles.length} file${importedFiles.length === 1 ? '' : 's'}.`, 'success');
}

function downloadCurrentFile() {
    saveCurrentEditorContent();
    const file = files[currentFileIndex];
    if (!file) {
        return;
    }

    const blob = new Blob([file.content], { type: `${getMimeType(file.language)};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = file.name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showNotification(`Downloaded ${file.name}.`, 'success');
}

function getMimeType(language) {
    const mimeTypes = {
        javascript: 'application/javascript',
        typescript: 'application/typescript',
        python: 'text/x-python',
        ruby: 'application/x-ruby',
        html: 'text/html',
        css: 'text/css',
        json: 'application/json',
        markdown: 'text/markdown',
        yaml: 'application/x-yaml',
        sql: 'application/sql',
        shell: 'application/x-sh',
        php: 'application/x-httpd-php',
        go: 'text/plain',
        rust: 'text/plain',
        java: 'text/x-java-source',
        csharp: 'text/plain',
        cpp: 'text/plain'
    };

    return mimeTypes[language] || 'text/plain';
}

function getThemeLabel(themeValue) {
    const labels = {
        'sublime-warm': 'Sublime Warm',
        'sublime-light': 'Sublime Light',
        'hc-black': 'High Contrast'
    };

    return labels[themeValue] || themeValue;
}

function isGeneratedFileName(name, language) {
    const expectedExtension = getFileExtension(language);
    return /^untitled-\d+\.[a-z0-9]+$/i.test(name) || name === `main.${expectedExtension}`;
}

function getFileExtension(language) {
    return LANGUAGE_EXTENSIONS[language] || 'txt';
}

function updateEditorContext() {
    const file = files[currentFileIndex];
    const profile = runtimeProfiles[file.language] || runtimeProfiles.javascript;

    document.getElementById('current-file').textContent = file.name;
    document.getElementById('editor-context').textContent = `${file.name} • ${file.language}`;
    document.getElementById('execution-mode').textContent = profile.short;
}

function updateRuntimeUI() {
    const file = files[currentFileIndex];
    const profile = runtimeProfiles[file.language] || runtimeProfiles.javascript;

    document.getElementById('runtime-badge').textContent = profile.label;
    document.getElementById('runtime-description').textContent = profile.short;
}

function updateStatusBar() {
    const content = editor ? editor.getValue() : (files[currentFileIndex]?.content || '');
    const lines = content.length ? content.split('\n').length : 1;
    const chars = content.length;

    document.getElementById('line-count').textContent = String(lines);
    document.getElementById('char-count').textContent = String(chars);
    document.getElementById('current-file').textContent = files[currentFileIndex]?.name || 'untitled';
    updateSidebarInfo();
}

function updateCursorPosition() {
    if (!editor) {
        return;
    }

    const position = editor.getPosition();
    if (!position) {
        return;
    }

    document.getElementById('cursor-position').textContent = `Ln ${position.lineNumber}, Col ${position.column}`;
}

function clearOutput(resetPreview = false) {
    document.getElementById('output-content').innerHTML =
        '<div class="output-log info">Console cleared. Run the active file when you are ready.</div>';

    if (resetPreview) {
        resetPreviewPanel();
    }
}

function addOutput(message, type = 'info') {
    const outputDiv = document.getElementById('output-content');
    const logDiv = document.createElement('div');
    logDiv.className = `output-log ${type}`;
    logDiv.textContent = message;
    outputDiv.appendChild(logDiv);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function activatePanel(panelId) {
    if (!layoutState.panelVisible) {
        layoutState.panelVisible = true;
        applyLayoutState();
        autoSave();
    }

    document.querySelectorAll('.panel-tab').forEach(button => {
        button.classList.toggle('active', button.dataset.panelTarget === panelId);
    });

    document.querySelectorAll('.panel-view').forEach(view => {
        view.classList.toggle('active', view.id === panelId);
    });
}

function resetPreviewPanel() {
    const frame = document.getElementById('preview-frame');
    const empty = document.getElementById('preview-empty');
    frame.removeAttribute('srcdoc');
    frame.style.display = 'none';
    empty.style.display = 'block';
}

function renderPreviewDocument(html) {
    const frame = document.getElementById('preview-frame');
    const empty = document.getElementById('preview-empty');
    frame.srcdoc = html;
    frame.style.display = 'block';
    empty.style.display = 'none';
    activatePanel('preview-panel');
}

async function runCode() {
    saveCurrentEditorContent();
    const file = files[currentFileIndex];
    const code = file.content;
    const language = file.language;
    const previewLanguages = new Set(['html', 'css', 'markdown', 'json', 'yaml', 'sql']);

    clearOutput(false);
    addOutput(`Running ${file.name}...`, 'info');

    if (!previewLanguages.has(language)) {
        resetPreviewPanel();
    }

    try {
        switch (language) {
            case 'javascript':
                activatePanel('console-panel');
                await executeJavaScript(code);
                break;
            case 'python':
                activatePanel('console-panel');
                await executePythonWithPyodide(code);
                break;
            case 'html':
                renderHtmlPreview(code);
                addOutput('HTML preview updated.', 'success');
                break;
            case 'css':
                renderCssPreview(code);
                addOutput('CSS preview updated.', 'success');
                break;
            case 'markdown':
                await renderMarkdownPreview(code);
                addOutput('Markdown preview updated.', 'success');
                break;
            case 'json':
                renderJsonPreview(code);
                addOutput('JSON parsed successfully.', 'success');
                break;
            case 'yaml':
                await renderYamlPreview(code);
                addOutput('YAML parsed successfully.', 'success');
                break;
            case 'sql':
                renderSqlInspection(code);
                addOutput('SQL inspection updated.', 'success');
                break;
            default:
                activatePanel('console-panel');
                await executeWithPiston(code, language);
                break;
        }
    } catch (error) {
        activatePanel('console-panel');
        addOutput(error.message || 'Something went wrong while running the file.', 'error');
    }
}

async function executeJavaScript(code) {
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

    const browserConsole = {
        log: (...args) => addOutput(formatArgs(args), 'info'),
        info: (...args) => addOutput(formatArgs(args), 'info'),
        warn: (...args) => addOutput(formatArgs(args), 'warn'),
        error: (...args) => addOutput(formatArgs(args), 'error')
    };

    try {
        const runner = new AsyncFunction('console', code);
        const result = await runner(browserConsole);

        if (typeof result !== 'undefined') {
            addOutput(`Return value: ${formatValue(result)}`, 'success');
        }

        addOutput('JavaScript execution finished.', 'success');
    } catch (error) {
        addOutput(error.stack || error.message, 'error');
    }
}

async function ensurePyodide() {
    if (pyodideInstance) {
        return pyodideInstance;
    }

    if (!pyodideLoadingPromise) {
        pyodideLoadingPromise = (async () => {
            addOutput('Loading Pyodide for Python support. This can take a few seconds the first time.', 'info');
            await loadScriptOnce('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js');

            pyodideInstance = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });

            pyodideInstance.runPython(`
import io
import sys
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
            `);

            return pyodideInstance;
        })();
    }

    return pyodideLoadingPromise;
}

async function executePythonWithPyodide(code) {
    const pyodide = await ensurePyodide();

    pyodide.runPython(`
import io
import sys
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
    `);

    await pyodide.runPythonAsync(code);

    const stdout = pyodide.runPython('sys.stdout.getvalue()');
    const stderr = pyodide.runPython('sys.stderr.getvalue()');

    if (stdout) {
        addOutput(stdout.trimEnd(), 'info');
    }

    if (stderr) {
        addOutput(stderr.trimEnd(), 'error');
    }

    addOutput('Python execution finished.', 'success');
}

async function executeWithPiston(code, language) {
    const languageMap = {
        typescript: 'typescript',
        ruby: 'ruby',
        shell: 'bash',
        php: 'php',
        go: 'go',
        rust: 'rust',
        java: 'java',
        csharp: 'csharp',
        cpp: 'cpp'
    };

    const pistonLanguage = languageMap[language];
    if (!pistonLanguage) {
        throw new Error(`No runtime is configured for ${language}.`);
    }

    addOutput(`Running ${language} remotely...`, 'info');

    const response = await fetch(`${BACKEND_CONFIG.pistonApi}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: pistonLanguage,
            version: '*',
            files: [{
                name: `main.${getFileExtension(language)}`,
                content: code
            }]
        })
    });

    if (!response.ok) {
        throw new Error(`Remote runtime returned ${response.status}.`);
    }

    const result = await response.json();
    const run = result.run || {};

    if (run.stdout) {
        addOutput(run.stdout.trimEnd(), 'info');
    }

    if (run.stderr) {
        addOutput(run.stderr.trimEnd(), 'error');
    }

    if (!run.stdout && !run.stderr && !run.output) {
        addOutput('Execution completed with no printed output.', 'info');
    }

    if (run.output && !run.stdout) {
        addOutput(run.output.trimEnd(), 'info');
    }

    addOutput('Remote execution finished.', 'success');
}

function renderHtmlPreview(code) {
    const cssBlocks = files
        .filter(file => file.language === 'css')
        .map(file => file.content)
        .join('\n\n');

    let documentHtml = code;

    if (cssBlocks.trim()) {
        if (/<\/head>/i.test(documentHtml)) {
            documentHtml = documentHtml.replace(/<\/head>/i, `<style>${cssBlocks}</style></head>`);
        } else {
            documentHtml = `<!DOCTYPE html><html><head><style>${cssBlocks}</style></head><body>${documentHtml}</body></html>`;
        }
    }

    renderPreviewDocument(documentHtml);
}

function renderCssPreview(code) {
    const htmlFile = files.find(file => file.language === 'html');
    const htmlMarkup = htmlFile ? htmlFile.content : `
<main class="card">
  <p class="eyebrow">Style preview</p>
  <h1>Sample layout</h1>
  <p>This block shows spacing, type, links, and button treatments.</p>
  <p><a href="#">A sample link</a></p>
</main>`;

    const previewDocument = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${code}</style>
</head>
<body>
    ${htmlMarkup}
</body>
</html>`;

    renderPreviewDocument(previewDocument);
}

async function renderMarkdownPreview(code) {
    const marked = await ensureMarked();
    const html = marked.parse(code);
    renderPreviewDocument(buildPreviewDocument({
        title: 'Markdown Preview',
        body: `<article class="prose">${html}</article>`,
        extraStyles: previewStyles()
    }));
}

function renderJsonPreview(code) {
    const parsed = JSON.parse(code);
    renderPreviewDocument(buildPreviewDocument({
        title: 'JSON Preview',
        body: `<pre>${escapeHtml(JSON.stringify(parsed, null, 2))}</pre>`,
        extraStyles: previewStyles(true)
    }));
}

async function renderYamlPreview(code) {
    const yaml = await ensureYaml();
    const parsed = yaml.load(code);
    renderPreviewDocument(buildPreviewDocument({
        title: 'YAML Preview',
        body: `<pre>${escapeHtml(JSON.stringify(parsed, null, 2))}</pre>`,
        extraStyles: previewStyles(true)
    }));
}

function renderSqlInspection(code) {
    const formatted = formatSql(code);
    const statementMatch = code.trim().match(/^([a-z]+)/i);
    const statement = statementMatch ? statementMatch[1].toUpperCase() : 'UNKNOWN';
    const tableMatches = [...code.matchAll(/\b(?:FROM|JOIN|INTO|UPDATE|TABLE)\s+([a-zA-Z0-9_."`-]+)/gi)];
    const tables = [...new Set(tableMatches.map(match => match[1].replace(/["`]/g, '')))];

    addOutput(`Statement type: ${statement}`, 'info');
    addOutput(`Referenced tables: ${tables.length ? tables.join(', ') : 'None detected'}`, 'info');
    addOutput('SQL preview mode formats and inspects the query without executing it.', 'warn');

    renderPreviewDocument(buildPreviewDocument({
        title: 'SQL Inspection',
        body: `<pre>${escapeHtml(formatted)}</pre>`,
        extraStyles: previewStyles(true)
    }));
}

function formatSql(code) {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'LIMIT', 'VALUES', 'SET'];
    let formatted = code.trim().replace(/\s+/g, ' ');

    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.replace(' ', '\\s+')}\\b`, 'gi');
        formatted = formatted.replace(regex, `\n${keyword}`);
    });

    return formatted.trim();
}

function buildPreviewDocument({ title, body, extraStyles = '' }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>${previewStyles()}${extraStyles}</style>
</head>
<body>
    ${body}
</body>
</html>`;
}

function previewStyles(preformatted = false) {
    return `
body {
    margin: 0;
    padding: 28px;
    background: #f6f7f9;
    color: #20242a;
    font-family: "Avenir Next", "Segoe UI", sans-serif;
}

.prose,
pre {
    width: min(760px, 100%);
    margin: 0 auto;
    padding: 28px;
    border-radius: 12px;
    background: #ffffff;
    border: 1px solid rgba(32, 36, 42, 0.1);
    box-shadow: 0 14px 36px rgba(32, 36, 42, 0.1);
}

.prose h1,
.prose h2,
.prose h3 {
    font-family: "Iowan Old Style", Georgia, serif;
    letter-spacing: 0;
}

.prose p,
.prose li,
.prose blockquote {
    line-height: 1.75;
    color: #4f5863;
}

.prose a {
    color: #355c8a;
}

.prose blockquote {
    margin: 1.2rem 0;
    padding-left: 1rem;
    border-left: 3px solid rgba(53, 92, 138, 0.3);
}

pre {
    white-space: ${preformatted ? 'pre-wrap' : 'pre-wrap'};
    word-break: break-word;
    font-family: "SFMono-Regular", Menlo, Monaco, Consolas, monospace;
    font-size: 0.9rem;
    line-height: 1.65;
}
`;
}

async function ensureMarked() {
    if (window.marked) {
        return window.marked;
    }

    if (!markdownLibraryPromise) {
        markdownLibraryPromise = loadScriptOnce('https://cdn.jsdelivr.net/npm/marked/marked.min.js').then(() => window.marked);
    }

    return markdownLibraryPromise;
}

async function ensureYaml() {
    if (window.jsyaml) {
        return window.jsyaml;
    }

    if (!yamlLibraryPromise) {
        yamlLibraryPromise = loadScriptOnce('https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js').then(() => window.jsyaml);
    }

    return yamlLibraryPromise;
}

function loadScriptOnce(src) {
    const existing = document.querySelector(`script[data-runtime-src="${src}"]`);
    if (existing) {
        if (existing.dataset.loaded === 'true') {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            existing.addEventListener('load', () => resolve(), { once: true });
            existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
        });
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.dataset.runtimeSrc = src;
        script.addEventListener('load', () => {
            script.dataset.loaded = 'true';
            resolve();
        }, { once: true });
        script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
        document.head.appendChild(script);
    });
}

function saveProject() {
    saveCurrentEditorContent();
    const projectName = document.getElementById('project-name').value.trim();

    if (!projectName) {
        showNotification('Give the project a name before saving.', 'warn');
        return;
    }

    const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || '{}');
    projects[projectName] = {
        files,
        currentFileIndex,
        theme: currentTheme,
        layout: layoutState,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    document.getElementById('project-name').value = '';
    closeModal('save-modal');
    showNotification(`Saved ${projectName}.`, 'success');
}

function openLoadModal() {
    const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || '{}');
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';

    const names = Object.keys(projects).sort((left, right) => {
        return new Date(projects[right].timestamp) - new Date(projects[left].timestamp);
    });

    if (!names.length) {
        projectsList.innerHTML = '<div class="empty-state">No saved projects yet.</div>';
    } else {
        names.forEach(name => {
            const project = projects[name];
            const card = document.createElement('div');
            card.className = 'project-card';

            const info = document.createElement('div');
            const title = document.createElement('h3');
            title.textContent = name;
            const meta = document.createElement('p');
            const fileCount = Array.isArray(project.files) ? project.files.length : 0;
            meta.textContent = `${fileCount} file${fileCount === 1 ? '' : 's'} • ${new Date(project.timestamp).toLocaleString()}`;

            info.appendChild(title);
            info.appendChild(meta);

            const actions = document.createElement('div');
            actions.className = 'project-actions';

            const loadButton = document.createElement('button');
            loadButton.type = 'button';
            loadButton.textContent = 'Load';
            loadButton.addEventListener('click', () => {
                loadProject(name);
            });

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'button-danger';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteProject(name);
            });

            actions.appendChild(loadButton);
            actions.appendChild(deleteButton);
            card.appendChild(info);
            card.appendChild(actions);
            projectsList.appendChild(card);
        });
    }

    openModal('load-modal');
}

function loadProject(name) {
    const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || '{}');
    const project = projects[name];

    if (!project) {
        showNotification('That saved project could not be found.', 'error');
        return;
    }

    files = normalizeFiles(project.files);
    currentFileIndex = clampIndex(project.currentFileIndex, files.length);
    currentTheme = typeof project.theme === 'string' ? project.theme : currentTheme;
    layoutState = normalizeLayoutState(project.layout);
    document.getElementById('theme-select').value = currentTheme;
    monaco.editor.setTheme(currentTheme);
    applyLayoutState();
    hydrateCurrentFile();
    autoSave();
    closeModal('load-modal');
    showNotification(`Loaded ${name}.`, 'success');
}

function deleteProject(name) {
    if (!window.confirm(`Delete "${name}" from this browser?`)) {
        return;
    }

    const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || '{}');
    delete projects[name];
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    openLoadModal();
    showNotification(`Deleted ${name}.`, 'success');
}

function autoSave() {
    saveCurrentEditorContent();
    localStorage.setItem(STORAGE_KEYS.autoSave, JSON.stringify({
        files,
        currentFileIndex,
        theme: currentTheme,
        layout: layoutState
    }));
}

function generateShareURL() {
    saveCurrentEditorContent();

    const encoded = btoa(encodeURIComponent(JSON.stringify({
        files,
        currentFileIndex,
        theme: currentTheme,
        layout: layoutState
    })));

    const url = `${window.location.origin}${window.location.pathname}?share=${encoded}`;
    document.getElementById('share-url').value = url;
    openModal('share-modal');
}

async function copyShareURL() {
    const input = document.getElementById('share-url');

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(input.value);
        } else {
            input.select();
            document.execCommand('copy');
        }

        showNotification('Share link copied.', 'success');
    } catch (error) {
        showNotification('Clipboard access failed. You can still copy the link manually.', 'warn');
    }
}

function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

function showNotification(message, type = 'info') {
    const stack = document.getElementById('notification-stack');
    if (!stack) {
        return;
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    stack.appendChild(notification);

    window.setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-4px)';
        window.setTimeout(() => notification.remove(), 240);
    }, 3200);
}

function formatArgs(args) {
    return args.map(formatValue).join(' ');
}

function formatValue(value) {
    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'undefined') {
        return 'undefined';
    }

    if (typeof value === 'function') {
        return '[Function]';
    }

    try {
        return JSON.stringify(value, null, 2);
    } catch (error) {
        return String(value);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
