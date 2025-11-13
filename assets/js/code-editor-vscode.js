/* ============================================
   VS Code Browser Edition - Full-Featured IDE
   ============================================ */

let editor = null;
let editor2 = null;
let files = [];
let currentFileIndex = 0;
let pyodideInstance = null;
let isSplitView = false;
let autoSaveInterval = null;

// Default file content
const defaultFiles = {
    'main.js': {
        content: `// Welcome to VS Code Browser Edition!
// This is a full-featured code editor with:
// - Multi-language support (40+ languages)
// - IntelliSense and autocomplete
// - Split editor view
// - Command palette (Ctrl+Shift+P)
// - Search & Replace across files
// - Problems detection
// - Integrated terminal
// - And much more!

console.log('Hello from VS Code!');

function greet(name) {
    return \`Hello, \${name}!\`;
}

// Try running this code with Ctrl+Enter or the Run button
console.log(greet('Developer'));
`,
        language: 'javascript',
        name: 'main.js'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeEditor();
});

// Initialize Monaco Editor
function initializeEditor() {
    require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });

    require(['vs/editor/editor.main'], function () {
        // Initialize first file
        files = [defaultFiles['main.js']];
        currentFileIndex = 0;

        // Create main editor
        editor = monaco.editor.create(document.getElementById('editor'), {
            value: files[0].content,
            language: files[0].language,
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: 'off',
            tabSize: 4,
            insertSpaces: true,
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            quickSuggestions: true,
            parameterHints: { enabled: true },
            folding: true,
            glyphMargin: true,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: true,
            smoothScrolling: true,
            mouseWheelZoom: true,
            bracketPairColorization: { enabled: true },
            guides: {
                bracketPairs: true,
                indentation: true
            }
        });

        // Update UI
        renderTabs();
        renderFilesList();
        updateBreadcrumb();
        updateStatusBar();

        // Event listeners
        editor.onDidChangeModelContent(() => {
            files[currentFileIndex].content = editor.getValue();
            updateStatusBar();
            markFileDirty(currentFileIndex);
        });

        editor.onDidChangeCursorPosition(() => {
            updateCursorPosition();
        });

        // Register keyboard shortcuts
        registerKeyboardShortcuts();

        // Hide loading, show editor
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main-container').style.display = 'grid';

        // Load from URL if shared
        loadFromURL();

        showNotification('VS Code loaded successfully!', 'success');
    });
}

// Register keyboard shortcuts
function registerKeyboardShortcuts() {
    // Command Palette
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, () => {
        showCommandPalette();
    });

    // Run code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        runCode();
    });

    // Save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        openSaveModal();
    });

    // Find
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
        editor.getAction('actions.find').run();
    });

    // Find and Replace
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {
        editor.getAction('editor.action.startFindReplaceAction').run();
    });

    // Format Document
    editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
        formatCode();
    });

    // Toggle Comment
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
        editor.getAction('editor.action.commentLine').run();
    });

    // New File
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyN, () => {
        addNewFile();
    });

    // Close Tab
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyW, () => {
        closeFile(currentFileIndex);
    });

    // Toggle Terminal
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Backquote, () => {
        togglePanel();
    });

    // Switch between files
    for (let i = 1; i <= 9; i++) {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode['Digit' + i], () => {
            if (files[i - 1]) {
                switchFile(i - 1);
            }
        });
    }
}

// File Management
function addNewFile() {
    const fileName = prompt('Enter file name:', `untitled-${files.length + 1}.js`);
    if (!fileName) return;

    const extension = fileName.split('.').pop();
    const language = getLanguageFromExtension(extension);

    files.push({
        content: `// New file: ${fileName}\n`,
        language: language,
        name: fileName,
        dirty: false
    });

    switchFile(files.length - 1);
    renderTabs();
    renderFilesList();
    showNotification(`Created ${fileName}`, 'success');
}

function switchFile(index) {
    if (index < 0 || index >= files.length) return;

    // Save current file content
    if (editor) {
        files[currentFileIndex].content = editor.getValue();
    }

    currentFileIndex = index;
    const file = files[index];

    editor.setValue(file.content);
    monaco.editor.setModelLanguage(editor.getModel(), file.language);

    renderTabs();
    renderFilesList();
    updateBreadcrumb();
    updateStatusBar();
    updateLanguageStatus();
}

function closeFile(index) {
    if (files.length === 1) {
        showNotification('Cannot close the last file', 'error');
        return;
    }

    if (files[index].dirty) {
        if (!confirm(`${files[index].name} has unsaved changes. Close anyway?`)) {
            return;
        }
    }

    files.splice(index, 1);

    if (currentFileIndex >= files.length) {
        currentFileIndex = files.length - 1;
    }

    if (currentFileIndex === index && index > 0) {
        currentFileIndex--;
    }

    switchFile(currentFileIndex);
}

function closeAllTabs() {
    if (confirm('Close all tabs? Unsaved changes will be lost.')) {
        files = [defaultFiles['main.js']];
        currentFileIndex = 0;
        switchFile(0);
    }
}

function markFileDirty(index) {
    files[index].dirty = true;
    renderTabs();
}

// UI Rendering
function renderTabs() {
    const tabsContainer = document.getElementById('tabs');
    tabsContainer.innerHTML = '';

    files.forEach((file, index) => {
        const tab = document.createElement('div');
        tab.className = 'tab' + (index === currentFileIndex ? ' active' : '') + (file.dirty ? ' dirty' : '');
        tab.innerHTML = `
            <i class="${getFileIcon(file.language)}"></i>
            <span class="tab-name">${file.name}</span>
            <span class="tab-close" onclick="event.stopPropagation(); closeFile(${index})">×</span>
        `;
        tab.onclick = () => switchFile(index);
        tabsContainer.appendChild(tab);
    });
}

function renderFilesList() {
    const filesList = document.getElementById('files-list');
    filesList.innerHTML = '';

    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item' + (index === currentFileIndex ? ' active' : '');
        fileItem.innerHTML = `
            <i class="${getFileIcon(file.language)}"></i>
            <span class="file-name">${file.name}</span>
            ${file.dirty ? '<i class="fas fa-circle" style="font-size: 6px; color: #858585;"></i>' : ''}
            <span class="file-close" onclick="event.stopPropagation(); closeFile(${index})">×</span>
        `;
        fileItem.onclick = () => switchFile(index);
        filesList.appendChild(fileItem);
    });
}

function updateBreadcrumb() {
    const breadcrumbFile = document.getElementById('breadcrumb-file');
    if (breadcrumbFile && files[currentFileIndex]) {
        breadcrumbFile.textContent = files[currentFileIndex].name;
    }
}

function updateStatusBar() {
    if (!editor || !files[currentFileIndex]) return;

    const file = files[currentFileIndex];
    const content = editor.getValue();
    const lines = content.split('\n').length;
    const chars = content.length;

    // Update character and line count (if these elements exist)
    const charCount = document.getElementById('char-count');
    const lineCount = document.getElementById('line-count');

    if (charCount) charCount.textContent = `${chars} characters`;
    if (lineCount) lineCount.textContent = `${lines} lines`;
}

function updateCursorPosition() {
    if (!editor) return;

    const position = editor.getPosition();
    const statusPosition = document.getElementById('status-position');
    if (statusPosition && position) {
        statusPosition.textContent = `Ln ${position.lineNumber}, Col ${position.column}`;
    }
}

function updateLanguageStatus() {
    if (!files[currentFileIndex]) return;

    const language = files[currentFileIndex].language;
    const statusLanguage = document.getElementById('status-language');
    if (statusLanguage) {
        statusLanguage.textContent = getLanguageName(language);
    }
}

// Sidebar Management
function switchSidebar(sidebarName) {
    // Update activity bar
    document.querySelectorAll('.activity-bar-item').forEach(item => {
        item.classList.remove('active');
    });

    const sidebarItem = document.querySelector(`[data-sidebar="${sidebarName}"]`);
    if (sidebarItem) {
        sidebarItem.classList.add('active');
    }

    // Show/hide sidebar sections
    document.querySelectorAll('.sidebar-section').forEach(section => {
        section.style.display = 'none';
    });

    const sidebarSection = document.getElementById(`sidebar-${sidebarName}`);
    if (sidebarSection) {
        sidebarSection.style.display = 'flex';
    }

    // Show sidebar if hidden
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('hidden');
    }
}

// Panel Management
function switchPanel(panelName) {
    // Update panel tabs
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    const panelTab = document.querySelector(`[data-panel="${panelName}"]`);
    if (panelTab) {
        panelTab.classList.add('active');
    }

    // Show/hide panel content
    document.querySelectorAll('.panel-content-section').forEach(section => {
        section.classList.remove('active');
    });

    const panelContent = document.getElementById(`panel-${panelName}`);
    if (panelContent) {
        panelContent.classList.add('active');
    }
}

function togglePanel() {
    const panel = document.getElementById('bottom-panel');
    if (panel) {
        panel.classList.toggle('hidden');
    }
}

function clearPanel() {
    const activePanelTab = document.querySelector('.panel-tab.active');
    if (!activePanelTab) return;

    const activePanel = activePanelTab.dataset.panel;

    if (activePanel === 'terminal') {
        const terminalOutput = document.getElementById('terminal-output');
        if (terminalOutput) {
            terminalOutput.innerHTML = '<div class="terminal-line">Terminal cleared</div>';
        }
    } else {
        const panelElement = document.getElementById(`${activePanel}-list`);
        if (panelElement) {
            panelElement.innerHTML = '';

            // Add default message based on panel type
            if (activePanel === 'problems') {
                panelElement.innerHTML = '<div style="color: #858585; font-size: 11px;">No problems detected</div>';
            } else if (activePanel === 'output') {
                panelElement.innerHTML = '<div style="color: #cccccc; font-size: 12px;">Ready to run code...</div>';
            } else if (activePanel === 'console') {
                panelElement.innerHTML = '<div style="color: #cccccc; font-size: 12px;">Debug console ready</div>';
            }
        }
    }
}

function toggleRightPanel() {
    const rightPanel = document.getElementById('right-panel');
    if (rightPanel) {
        rightPanel.classList.toggle('hidden');
    }
}

// Code Execution
async function runCode() {
    if (!editor || !files[currentFileIndex]) return;

    const code = editor.getValue();
    const language = files[currentFileIndex].language;

    // Switch to terminal panel
    switchPanel('terminal');
    const bottomPanel = document.getElementById('bottom-panel');
    if (bottomPanel) {
        bottomPanel.classList.remove('hidden');
    }

    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;

    terminalOutput.innerHTML += `<div class="terminal-line info">Running ${files[currentFileIndex].name}...</div>`;

    try {
        let result = '';

        if (language === 'javascript' || language === 'typescript') {
            result = await executeJavaScript(code);
        } else if (language === 'python') {
            result = await executePythonWithPyodide(code);
        } else {
            result = await executeWithPiston(code, language);
        }

        terminalOutput.innerHTML += `<div class="terminal-line success">${escapeHtml(result)}</div>`;
        updateProblems([]);

    } catch (error) {
        // Parse error message to extract useful info
        let errorMessage = error.message || String(error);
        let errorLine = 1;

        // For Python syntax errors, extract the line number and clean up message
        if (language === 'python' && errorMessage.includes('SyntaxError')) {
            const lineMatch = errorMessage.match(/line (\d+)/);
            if (lineMatch) {
                errorLine = parseInt(lineMatch[1]);
            }

            // Extract just the SyntaxError part
            const syntaxErrorMatch = errorMessage.match(/SyntaxError: (.+)/);
            if (syntaxErrorMatch) {
                const errorType = syntaxErrorMatch[1];
                errorMessage = `Syntax Error on line ${errorLine}: ${errorType}`;
            }
        }

        // For other Python errors, try to extract the actual error
        if (language === 'python' && !errorMessage.includes('SyntaxError')) {
            const lines = errorMessage.split('\n');
            const lastLine = lines[lines.length - 1];
            if (lastLine && (lastLine.includes('Error:') || lastLine.includes('Exception:'))) {
                errorMessage = lastLine;
            }
        }

        terminalOutput.innerHTML += `<div class="terminal-line error">❌ ${escapeHtml(errorMessage)}</div>`;

        // Add helpful hints for common errors
        if (language === 'python') {
            if (errorMessage.includes('expected')) {
                terminalOutput.innerHTML += `<div class="terminal-line warn">💡 Hint: Check for missing colons (:) after function definitions, if statements, loops, etc.</div>`;
            } else if (errorMessage.includes('IndentationError')) {
                terminalOutput.innerHTML += `<div class="terminal-line warn">💡 Hint: Python requires consistent indentation (use 4 spaces).</div>`;
            } else if (errorMessage.includes('NameError')) {
                terminalOutput.innerHTML += `<div class="terminal-line warn">💡 Hint: Variable or function is not defined. Check spelling and scope.</div>`;
            }
        }

        updateProblems([{
            type: 'error',
            message: errorMessage,
            file: files[currentFileIndex].name,
            line: errorLine
        }]);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Execute JavaScript
async function executeJavaScript(code) {
    const logs = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => logs.push(args.join(' '));
    console.error = (...args) => logs.push('Error: ' + args.join(' '));
    console.warn = (...args) => logs.push('Warning: ' + args.join(' '));

    try {
        const result = eval(code);
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;

        if (result !== undefined) {
            logs.push(String(result));
        }

        return logs.join('\n') || 'Code executed successfully (no output)';
    } catch (error) {
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
        throw error;
    }
}

// Execute Python with Pyodide
async function executePythonWithPyodide(code) {
    const terminalOutput = document.getElementById('terminal-output');

    if (!pyodideInstance) {
        if (terminalOutput) {
            terminalOutput.innerHTML += '<div class="terminal-line info">Loading Python runtime (this may take 10-15 seconds on first run)...</div>';
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
        });

        pyodideInstance = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });

        pyodideInstance.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
        `);

        if (terminalOutput) {
            terminalOutput.innerHTML += '<div class="terminal-line success">Python runtime loaded!</div>';
        }
    }

    pyodideInstance.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
    `);

    await pyodideInstance.runPythonAsync(code);

    const stdout = pyodideInstance.runPython('sys.stdout.getvalue()');
    const stderr = pyodideInstance.runPython('sys.stderr.getvalue()');

    if (stderr) {
        throw new Error(stderr);
    }

    return stdout || 'Code executed successfully (no output)';
}

// Execute with Piston API
async function executeWithPiston(code, language) {
    const languageMap = {
        'ruby': 'ruby',
        'php': 'php',
        'go': 'go',
        'rust': 'rust',
        'java': 'java',
        'csharp': 'csharp',
        'cpp': 'cpp',
        'c': 'c',
        'swift': 'swift',
        'kotlin': 'kotlin'
    };

    const pistonLanguage = languageMap[language];
    if (!pistonLanguage) {
        throw new Error(`Language ${language} is not supported for execution. Supported: JavaScript, Python, ${Object.keys(languageMap).join(', ')}`);
    }

    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            language: pistonLanguage,
            version: '*',
            files: [{
                name: 'main.' + getExtensionFromLanguage(language),
                content: code
            }]
        })
    });

    if (!response.ok) {
        throw new Error('Failed to execute code via Piston API');
    }

    const result = await response.json();

    if (result.run.stderr) {
        throw new Error(result.run.stderr);
    }

    return result.run.output || result.run.stdout || 'Code executed successfully (no output)';
}

// Format Code
function formatCode() {
    editor.getAction('editor.action.formatDocument').run();
    showNotification('Document formatted', 'success');
}

// Search & Replace
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const caseSensitiveBtn = document.getElementById('case-sensitive');
    const wholeWordBtn = document.getElementById('whole-word');
    const regexBtn = document.getElementById('regex');

    if (!searchInput) return;

    const searchTerm = searchInput.value;
    const caseSensitive = caseSensitiveBtn ? caseSensitiveBtn.classList.contains('active') : false;
    const wholeWord = wholeWordBtn ? wholeWordBtn.classList.contains('active') : false;
    const regex = regexBtn ? regexBtn.classList.contains('active') : false;

    if (!searchTerm) {
        showNotification('Enter a search term', 'error');
        return;
    }

    let results = [];
    files.forEach((file, fileIndex) => {
        const lines = file.content.split('\n');
        lines.forEach((line, lineIndex) => {
            let matches = false;

            if (regex) {
                try {
                    const re = new RegExp(searchTerm, caseSensitive ? 'g' : 'gi');
                    matches = re.test(line);
                } catch (e) {
                    showNotification('Invalid regex pattern', 'error');
                    return;
                }
            } else {
                const searchIn = caseSensitive ? line : line.toLowerCase();
                const searchFor = caseSensitive ? searchTerm : searchTerm.toLowerCase();

                if (wholeWord) {
                    const re = new RegExp(`\\b${searchFor}\\b`, caseSensitive ? '' : 'i');
                    matches = re.test(line);
                } else {
                    matches = searchIn.includes(searchFor);
                }
            }

            if (matches) {
                results.push({
                    file: file.name,
                    fileIndex: fileIndex,
                    line: lineIndex + 1,
                    content: line.trim()
                });
            }
        });
    });

    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = '<div style="color: #858585;">No results found</div>';
    } else {
        searchResults.innerHTML = `<div style="color: #cccccc; margin-bottom: 10px;">${results.length} results in ${new Set(results.map(r => r.file)).size} files</div>`;
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'file-item';
            resultItem.innerHTML = `
                <div style="color: #cccccc;">${result.file}:${result.line}</div>
                <div style="color: #858585; font-size: 10px; margin-top: 2px;">${escapeHtml(result.content)}</div>
            `;
            resultItem.onclick = () => {
                switchFile(result.fileIndex);
                if (editor) {
                    editor.revealLineInCenter(result.line);
                    editor.setPosition({ lineNumber: result.line, column: 1 });
                }
            };
            searchResults.appendChild(resultItem);
        });
    }
}

function performReplace() {
    const searchInput = document.getElementById('search-input');
    const replaceInput = document.getElementById('replace-input');
    const caseSensitiveBtn = document.getElementById('case-sensitive');
    const regexBtn = document.getElementById('regex');

    if (!searchInput || !replaceInput) return;

    const searchTerm = searchInput.value;
    const replaceTerm = replaceInput.value;

    if (!searchTerm) {
        showNotification('Enter a search term', 'error');
        return;
    }

    const caseSensitive = caseSensitiveBtn ? caseSensitiveBtn.classList.contains('active') : false;
    const regex = regexBtn ? regexBtn.classList.contains('active') : false;

    let totalReplacements = 0;

    files.forEach(file => {
        if (regex) {
            try {
                const re = new RegExp(searchTerm, caseSensitive ? 'g' : 'gi');
                const matches = file.content.match(re);
                if (matches) {
                    totalReplacements += matches.length;
                    file.content = file.content.replace(re, replaceTerm);
                }
            } catch (e) {
                showNotification('Invalid regex pattern', 'error');
                return;
            }
        } else {
            const re = new RegExp(escapeRegex(searchTerm), caseSensitive ? 'g' : 'gi');
            const matches = file.content.match(re);
            if (matches) {
                totalReplacements += matches.length;
                file.content = file.content.replace(re, replaceTerm);
            }
        }
        file.dirty = true;
    });

    if (currentFileIndex >= 0) {
        editor.setValue(files[currentFileIndex].content);
    }

    renderTabs();
    showNotification(`Replaced ${totalReplacements} occurrences`, 'success');
}

// Toggle search options
document.addEventListener('DOMContentLoaded', () => {
    ['case-sensitive', 'whole-word', 'regex'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = () => btn.classList.toggle('active');
        }
    });
});

// Split Editor
function toggleSplitEditor() {
    const editorGrid = document.getElementById('editor-grid');

    if (isSplitView) {
        // Close split
        editorGrid.classList.remove('split');
        if (editor2) {
            editor2.dispose();
            editor2 = null;
        }
        editorGrid.innerHTML = '<div class="editor-pane"><div id="editor"></div></div>';
        isSplitView = false;
        showNotification('Split editor closed', 'info');
    } else {
        // Open split
        editorGrid.classList.add('split');
        editorGrid.innerHTML = `
            <div class="editor-pane"><div id="editor"></div></div>
            <div class="editor-pane"><div id="editor2"></div></div>
        `;

        // Re-create first editor
        const currentContent = editor.getValue();
        const currentLanguage = files[currentFileIndex].language;
        editor.dispose();

        editor = monaco.editor.create(document.getElementById('editor'), {
            value: currentContent,
            language: currentLanguage,
            theme: document.getElementById('theme-setting').value || 'vs-dark',
            automaticLayout: true,
            fontSize: parseInt(document.getElementById('fontsize-setting').value) || 14,
            minimap: { enabled: document.getElementById('minimap-setting').checked },
            scrollBeyondLastLine: false,
            wordWrap: document.getElementById('wordwrap-setting').value || 'off',
            tabSize: parseInt(document.getElementById('tabsize-setting').value) || 4
        });

        // Create second editor
        editor2 = monaco.editor.create(document.getElementById('editor2'), {
            value: currentContent,
            language: currentLanguage,
            theme: document.getElementById('theme-setting').value || 'vs-dark',
            automaticLayout: true,
            fontSize: parseInt(document.getElementById('fontsize-setting').value) || 14,
            minimap: { enabled: document.getElementById('minimap-setting').checked },
            scrollBeyondLastLine: false,
            wordWrap: document.getElementById('wordwrap-setting').value || 'off',
            tabSize: parseInt(document.getElementById('tabsize-setting').value) || 4
        });

        registerKeyboardShortcuts();
        isSplitView = true;
        showNotification('Split editor opened', 'success');
    }
}

// Command Palette
const commands = [
    { id: 'file.new', label: 'File: New File', action: addNewFile, keys: 'Ctrl+N' },
    { id: 'file.save', label: 'File: Save Project', action: openSaveModal, keys: 'Ctrl+S' },
    { id: 'file.open', label: 'File: Load Project', action: openLoadModal, keys: 'Ctrl+O' },
    { id: 'edit.find', label: 'Edit: Find', action: () => editor.getAction('actions.find').run(), keys: 'Ctrl+F' },
    { id: 'edit.replace', label: 'Edit: Replace', action: () => editor.getAction('editor.action.startFindReplaceAction').run(), keys: 'Ctrl+H' },
    { id: 'edit.format', label: 'Edit: Format Document', action: formatCode, keys: 'Alt+Shift+F' },
    { id: 'view.split', label: 'View: Toggle Split Editor', action: toggleSplitEditor, keys: '' },
    { id: 'view.panel', label: 'View: Toggle Panel', action: togglePanel, keys: 'Ctrl+`' },
    { id: 'view.explorer', label: 'View: Show Explorer', action: () => switchSidebar('explorer'), keys: 'Ctrl+Shift+E' },
    { id: 'view.search', label: 'View: Show Search', action: () => switchSidebar('search'), keys: 'Ctrl+Shift+F' },
    { id: 'run.code', label: 'Run: Execute Code', action: runCode, keys: 'Ctrl+Enter' },
    { id: 'code.share', label: 'Code: Share', action: openShareModal, keys: '' }
];

function showCommandPalette() {
    const palette = document.getElementById('command-palette');
    const input = document.getElementById('command-input');
    const results = document.getElementById('command-results');

    palette.classList.add('active');
    input.value = '';
    input.focus();

    renderCommands(commands);
}

function renderCommands(commandsToShow) {
    const results = document.getElementById('command-results');
    results.innerHTML = '';

    commandsToShow.forEach((cmd, index) => {
        const item = document.createElement('div');
        item.className = 'command-item' + (index === 0 ? ' selected' : '');
        item.innerHTML = `
            <i class="fas fa-terminal"></i>
            <span class="command-item-text">${cmd.label}</span>
            ${cmd.keys ? `<span class="command-item-keys">${cmd.keys}</span>` : ''}
        `;
        item.onclick = () => {
            cmd.action();
            closeCommandPalette();
        };
        results.appendChild(item);
    });
}

function closeCommandPalette() {
    document.getElementById('command-palette').classList.remove('active');
}

// Command palette input handler
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    if (input) {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = commands.filter(cmd =>
                cmd.label.toLowerCase().includes(query)
            );
            renderCommands(filtered);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCommandPalette();
            } else if (e.key === 'Enter') {
                const selected = document.querySelector('.command-item.selected');
                if (selected) {
                    selected.click();
                }
            }
        });
    }

    // Close on background click
    document.getElementById('command-palette').addEventListener('click', (e) => {
        if (e.target.id === 'command-palette') {
            closeCommandPalette();
        }
    });
});

// Global keyboard shortcut for command palette
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        showCommandPalette();
    }
});

// Problems Panel
function updateProblems(problems) {
    const problemsList = document.getElementById('problems-list');
    const statusProblems = document.getElementById('status-problems');

    if (statusProblems) {
        statusProblems.textContent = problems.length;
    }

    if (!problemsList) return;

    if (problems.length === 0) {
        problemsList.innerHTML = '<div style="color: #858585; font-size: 11px;">No problems detected</div>';
        return;
    }

    problemsList.innerHTML = '';
    problems.forEach(problem => {
        const item = document.createElement('div');
        item.className = 'problem-item';
        item.innerHTML = `
            <div class="problem-icon ${problem.type}">
                <i class="fas fa-${problem.type === 'error' ? 'times-circle' : 'exclamation-triangle'}"></i>
            </div>
            <div class="problem-details">
                <div class="problem-message">${escapeHtml(problem.message)}</div>
                <div class="problem-location">${problem.file} [Ln ${problem.line}]</div>
            </div>
        `;
        problemsList.appendChild(item);
    });
}

// Settings
function changeTheme(theme) {
    monaco.editor.setTheme(theme);
    if (editor2) {
        monaco.editor.setTheme(theme);
    }
    showNotification(`Theme changed to ${theme}`, 'success');
}

function changeFontSize(size) {
    if (!editor) return;
    editor.updateOptions({ fontSize: parseInt(size) });
    if (editor2) {
        editor2.updateOptions({ fontSize: parseInt(size) });
    }
}

function changeTabSize(size) {
    if (!editor) return;
    editor.updateOptions({ tabSize: parseInt(size) });
    if (editor2) {
        editor2.updateOptions({ tabSize: parseInt(size) });
    }
}

function toggleMinimap(enabled) {
    if (!editor) return;
    editor.updateOptions({ minimap: { enabled } });
    if (editor2) {
        editor2.updateOptions({ minimap: { enabled } });
    }
}

function changeWordWrap(wrap) {
    if (!editor) return;
    editor.updateOptions({ wordWrap: wrap });
    if (editor2) {
        editor2.updateOptions({ wordWrap: wrap });
    }
}

function toggleAutoSave(enabled) {
    if (enabled) {
        autoSaveInterval = setInterval(() => {
            const projectName = 'autosave';
            const projects = JSON.parse(localStorage.getItem('vsCodeProjects') || '{}');
            projects[projectName] = {
                files: files,
                currentFileIndex: currentFileIndex,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('vsCodeProjects', JSON.stringify(projects));
        }, 30000); // Auto-save every 30 seconds
        showNotification('Auto-save enabled', 'success');
    } else {
        if (autoSaveInterval) {
            clearInterval(autoSaveInterval);
            autoSaveInterval = null;
        }
        showNotification('Auto-save disabled', 'info');
    }
}

function changeLanguage(language) {
    if (!editor || !files[currentFileIndex]) return;
    files[currentFileIndex].language = language;
    monaco.editor.setModelLanguage(editor.getModel(), language);
    updateLanguageStatus();
    renderTabs();
}

// Save/Load/Share
function openSaveModal() {
    const saveModal = document.getElementById('save-modal');
    const projectName = document.getElementById('project-name');

    if (saveModal) {
        saveModal.classList.add('active');
    }
    if (projectName) {
        projectName.focus();
    }
}

function openLoadModal() {
    const projects = JSON.parse(localStorage.getItem('vsCodeProjects') || '{}');
    const projectsList = document.getElementById('projects-list');

    if (!projectsList) return;

    if (Object.keys(projects).length === 0) {
        projectsList.innerHTML = '<p style="color: #858585;">No saved projects found.</p>';
    } else {
        projectsList.innerHTML = '';
        Object.keys(projects).forEach(name => {
            const project = projects[name];
            const item = document.createElement('div');
            item.className = 'panel-item';
            item.style.marginBottom = '10px';
            item.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 600;">${escapeHtml(name)}</div>
                        <div style="font-size: 10px; color: #858585; margin-top: 2px;">
                            ${project.files.length} files • ${new Date(project.timestamp).toLocaleString()}
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="loadProject('${name}')" class="primary" style="padding: 4px 8px; font-size: 11px;">Load</button>
                        <button onclick="deleteProject('${name}')" style="padding: 4px 8px; font-size: 11px;">Delete</button>
                    </div>
                </div>
            `;
            projectsList.appendChild(item);
        });
    }

    const loadModal = document.getElementById('load-modal');
    if (loadModal) {
        loadModal.classList.add('active');
    }
}

function openShareModal() {
    const data = {
        files: files,
        currentFileIndex: currentFileIndex
    };
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}${window.location.pathname}?share=${encoded}`;

    const shareUrl = document.getElementById('share-url');
    const shareModal = document.getElementById('share-modal');

    if (shareUrl) {
        shareUrl.value = url;
    }
    if (shareModal) {
        shareModal.classList.add('active');
    }
}

function saveProject() {
    const projectNameInput = document.getElementById('project-name');
    if (!projectNameInput) return;

    const projectName = projectNameInput.value.trim();
    if (!projectName) {
        showNotification('Please enter a project name', 'error');
        return;
    }

    const projects = JSON.parse(localStorage.getItem('vsCodeProjects') || '{}');
    projects[projectName] = {
        files: files,
        currentFileIndex: currentFileIndex,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('vsCodeProjects', JSON.stringify(projects));

    // Mark all files as clean
    files.forEach(file => file.dirty = false);
    renderTabs();

    closeModal('save-modal');
    showNotification(`Project "${projectName}" saved!`, 'success');
}

function loadProject(name) {
    const projects = JSON.parse(localStorage.getItem('vsCodeProjects') || '{}');
    const project = projects[name];

    if (!project) {
        showNotification('Project not found', 'error');
        return;
    }

    files = project.files;
    currentFileIndex = project.currentFileIndex || 0;

    switchFile(currentFileIndex);
    closeModal('load-modal');
    showNotification(`Project "${name}" loaded!`, 'success');
}

function deleteProject(name) {
    if (!confirm(`Delete project "${name}"?`)) return;

    const projects = JSON.parse(localStorage.getItem('vsCodeProjects') || '{}');
    delete projects[name];
    localStorage.setItem('vsCodeProjects', JSON.stringify(projects));

    openLoadModal(); // Refresh the list
    showNotification(`Project "${name}" deleted`, 'info');
}

function copyShareURL() {
    const input = document.getElementById('share-url');
    if (!input) return;

    input.select();
    document.execCommand('copy');
    showNotification('Link copied to clipboard!', 'success');
}

function loadFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const shareData = urlParams.get('share');

    if (shareData) {
        try {
            const decoded = JSON.parse(decodeURIComponent(atob(shareData)));
            files = decoded.files;
            currentFileIndex = decoded.currentFileIndex || 0;
            switchFile(currentFileIndex);
            showNotification('Shared code loaded!', 'success');
        } catch (error) {
            showNotification('Failed to load shared code', 'error');
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Utility Functions
function getLanguageFromExtension(ext) {
    const map = {
        'js': 'javascript', 'ts': 'typescript', 'py': 'python', 'rb': 'ruby',
        'html': 'html', 'css': 'css', 'json': 'json', 'md': 'markdown',
        'sql': 'sql', 'yml': 'yaml', 'yaml': 'yaml', 'sh': 'shell',
        'php': 'php', 'go': 'go', 'rs': 'rust', 'java': 'java',
        'cs': 'csharp', 'cpp': 'cpp', 'c': 'c'
    };
    return map[ext] || 'plaintext';
}

function getExtensionFromLanguage(language) {
    const map = {
        'javascript': 'js', 'typescript': 'ts', 'python': 'py', 'ruby': 'rb',
        'html': 'html', 'css': 'css', 'json': 'json', 'markdown': 'md',
        'sql': 'sql', 'yaml': 'yml', 'shell': 'sh', 'php': 'php',
        'go': 'go', 'rust': 'rs', 'java': 'java', 'csharp': 'cs', 'cpp': 'cpp'
    };
    return map[language] || 'txt';
}

function getFileIcon(language) {
    const icons = {
        'javascript': 'fab fa-js-square', 'typescript': 'fab fa-js-square',
        'python': 'fab fa-python', 'ruby': 'fas fa-gem',
        'html': 'fab fa-html5', 'css': 'fab fa-css3-alt',
        'json': 'fas fa-brackets-curly', 'markdown': 'fab fa-markdown',
        'sql': 'fas fa-database', 'yaml': 'fas fa-cog',
        'shell': 'fas fa-terminal', 'php': 'fab fa-php',
        'go': 'fas fa-code', 'rust': 'fas fa-code',
        'java': 'fab fa-java', 'csharp': 'fas fa-code', 'cpp': 'fas fa-code'
    };
    return icons[language] || 'fas fa-file-code';
}

function getLanguageName(language) {
    const names = {
        'javascript': 'JavaScript', 'typescript': 'TypeScript',
        'python': 'Python', 'ruby': 'Ruby', 'html': 'HTML',
        'css': 'CSS', 'json': 'JSON', 'markdown': 'Markdown',
        'sql': 'SQL', 'yaml': 'YAML', 'shell': 'Shell',
        'php': 'PHP', 'go': 'Go', 'rust': 'Rust',
        'java': 'Java', 'csharp': 'C#', 'cpp': 'C++'
    };
    return names[language] || 'Plain Text';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
        <span>${escapeHtml(message)}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/* ============================================
   RESIZABLE PANELS
   ============================================ */

// Initialize resize handles
function initializeResizeHandles() {
    const sidebarResize = document.getElementById('sidebar-resize');
    const rightPanelResize = document.getElementById('right-panel-resize');
    const sidebar = document.getElementById('sidebar');
    const rightPanel = document.getElementById('right-panel');

    if (sidebarResize && sidebar) {
        makeResizable(sidebarResize, sidebar, 'width', 'next');
    }

    if (rightPanelResize && rightPanel) {
        makeResizable(rightPanelResize, rightPanel, 'width', 'prev');
    }
}

function makeResizable(handle, panel, dimension, direction) {
    let isResizing = false;
    let startPos = 0;
    let startSize = 0;

    handle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startPos = e.clientX;
        startSize = panel.offsetWidth;
        handle.classList.add('resizing');
        document.body.style.cursor = 'col-resize';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const delta = direction === 'next' ? (e.clientX - startPos) : (startPos - e.clientX);
        const newSize = startSize + delta;

        // Get min-width from CSS or use default
        const minWidth = parseInt(getComputedStyle(panel).minWidth) || 150;
        const maxWidth = window.innerWidth * 0.5; // Max 50% of screen

        if (newSize >= minWidth && newSize <= maxWidth) {
            panel.style.width = newSize + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            handle.classList.remove('resizing');
            document.body.style.cursor = 'default';
        }
    });
}

// Call this after Monaco editor initialization
setTimeout(() => {
    initializeResizeHandles();
}, 1000);

/* ============================================
   FILE SYSTEM ACCESS API
   ============================================ */

let fileSystemDirectoryHandle = null;
let fileHandles = new Map(); // Track file handles

// Check if File System Access API is supported
function isFileSystemAccessSupported() {
    return 'showDirectoryPicker' in window;
}

// Open local folder
async function openLocalFolder() {
    if (!isFileSystemAccessSupported()) {
        showNotification('File System Access API is only supported in Chrome and Edge browsers', 'error');
        return;
    }

    try {
        // Request directory access
        const dirHandle = await window.showDirectoryPicker({
            mode: 'readwrite'
        });

        fileSystemDirectoryHandle = dirHandle;
        showNotification(`Opened folder: ${dirHandle.name}`, 'success');

        // Load files from directory
        await loadDirectoryFiles(dirHandle);
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error opening folder:', error);
            showNotification('Failed to open folder: ' + error.message, 'error');
        }
    }
}

// Load files from directory
async function loadDirectoryFiles(dirHandle, path = '') {
    try {
        const filesList = document.getElementById('files-list');
        if (!filesList) return;

        // Clear existing files if loading root
        if (path === '') {
            files = [];
            filesList.innerHTML = '';
        }

        for await (const entry of dirHandle.values()) {
            const fullPath = path ? `${path}/${entry.name}` : entry.name;

            if (entry.kind === 'file') {
                // Skip hidden files and certain file types
                if (entry.name.startsWith('.') ||
                    entry.name.endsWith('.exe') ||
                    entry.name.endsWith('.dll')) {
                    continue;
                }

                // Read file content
                const fileHandle = await dirHandle.getFileHandle(entry.name);
                const file = await fileHandle.getFile();
                const content = await file.text();

                // Detect language from extension
                const language = detectLanguage(entry.name);

                // Add to files array
                files.push({
                    name: entry.name,
                    content: content,
                    language: language,
                    path: fullPath,
                    handle: fileHandle
                });

                // Store file handle for saving
                fileHandles.set(fullPath, fileHandle);
            } else if (entry.kind === 'directory') {
                // Recursively load subdirectories (limit depth to prevent infinite loops)
                const depth = path.split('/').length;
                if (depth < 3) {
                    const subDirHandle = await dirHandle.getDirectoryHandle(entry.name);
                    await loadDirectoryFiles(subDirHandle, fullPath);
                }
            }
        }

        // Update UI
        updateFilesUI();

        // Open the first file
        if (files.length > 0 && path === '') {
            openFile(0);
        }
    } catch (error) {
        console.error('Error loading directory files:', error);
        showNotification('Failed to load some files: ' + error.message, 'error');
    }
}

// Detect language from filename
function detectLanguage(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const languageMap = {
        'js': 'javascript', 'jsx': 'javascript',
        'ts': 'typescript', 'tsx': 'typescript',
        'py': 'python', 'rb': 'ruby',
        'html': 'html', 'htm': 'html',
        'css': 'css', 'scss': 'scss', 'sass': 'sass',
        'json': 'json', 'md': 'markdown',
        'sql': 'sql', 'yaml': 'yaml', 'yml': 'yaml',
        'sh': 'shell', 'bash': 'shell',
        'php': 'php', 'go': 'go', 'rs': 'rust',
        'java': 'java', 'cs': 'csharp', 'cpp': 'cpp', 'c': 'cpp'
    };
    return languageMap[ext] || 'plaintext';
}

// Save current file to disk
async function saveFileToDisk() {
    if (!editor || files.length === 0) return;

    const currentFile = files[currentFileIndex];
    if (!currentFile) return;

    try {
        // If we have a file handle from File System Access API, use it
        if (fileHandles.has(currentFile.path || currentFile.name)) {
            const fileHandle = fileHandles.get(currentFile.path || currentFile.name);
            const writable = await fileHandle.createWritable();
            await writable.write(editor.getValue());
            await writable.close();

            // Update file content
            currentFile.content = editor.getValue();
            markFileSaved(currentFileIndex);
            showNotification(`Saved ${currentFile.name}`, 'success');
        } else {
            // Fallback to download if no file handle
            downloadFile(currentFile.name, editor.getValue());
        }
    } catch (error) {
        console.error('Error saving file:', error);
        showNotification('Failed to save file: ' + error.message, 'error');
    }
}

// Add keyboard shortcut for saving to disk (Ctrl+S)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveFileToDisk();
    }
});

// Helper function to download file
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showNotification(`Downloaded ${filename}`, 'success');
}
