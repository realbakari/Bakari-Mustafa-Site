/* Code Editor Pro - FREE Backend Alternatives */

/*
 * FREE EXECUTION OPTIONS:
 * 1. Pyodide - Python in browser (WebAssembly) - COMPLETELY FREE
 * 2. Piston API - 40+ languages via free API - NO ACCOUNT NEEDED
 * 3. No Netlify Functions needed!
 */

let editor;
let currentFileIndex = 0;
let files = [];
let pyodideInstance = null;
let pyodideLoading = false;

/* Configuration */
const BACKEND_CONFIG = {
    /* Use Pyodide for Python (runs in browser, completely free) */
    usePyodide: true,

    /* Use Piston API for other languages (free, no account) */
    usePiston: true,

    /* Piston API endpoint (public, free) */
    pistonApi: 'https://emkc.org/api/v2/piston',

    /* Fallback to Netlify Functions (if you want to use them) */
    useNetlifyFunctions: false
};

/* Code templates */
const codeTemplates = {
    javascript: `// JavaScript Example
console.log('Running in browser...');

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(10):', fibonacci(10));`,

    python: `# Python Example (runs in browser via Pyodide!)
print('Running Python in browser...')

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print('Fibonacci(10):', fibonacci(10))`,

    ruby: `# Ruby Example (via free Piston API)
puts 'Running Ruby via Piston API...'

def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

puts "Fibonacci(10): #{fibonacci(10)}"`,

    typescript: `// TypeScript Example
console.log('Running TypeScript...');

interface Person {
  name: string;
  age: number;
}

const person: Person = { name: 'John', age: 30 };
console.log(person);`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>`,

    css: `.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}`,

    json: `{
  "name": "my-project",
  "version": "1.0.0"
}`,

    sql: `SELECT users.name, COUNT(orders.id) as total
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id;`,

    yaml: `app:
  name: My App
  version: 1.0.0`,

    shell: `#!/bin/bash
echo "Hello from Bash!"
date`,

    php: `<?php
function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}
echo "Fibonacci(10): " . fibonacci(10);
?>`,

    go: `package main
import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    fmt.Println("Fibonacci(10):", fibonacci(10))
}`,

    rust: `fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2)
    }
}

fn main() {
    println!("Fibonacci(10): {}", fibonacci(10));
}`,

    java: `public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.println("Fibonacci(10): " + fibonacci(10));
    }
}`,

    csharp: `using System;

class Program {
    static int Fibonacci(int n) {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }

    static void Main() {
        Console.WriteLine($"Fibonacci(10): {Fibonacci(10)}");
    }
}`,

    cpp: `#include <iostream>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    std::cout << "Fibonacci(10): " << fibonacci(10) << std::endl;
    return 0;
}`
};

/* Initialize editor */
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });

require(['vs/editor/editor.main'], function() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main-container').style.display = 'flex';

    files = [{
        name: 'main.js',
        language: 'javascript',
        content: codeTemplates.javascript
    }];

    loadFromURL();

    editor = monaco.editor.create(document.getElementById('editor'), {
        value: files[0].content,
        language: files[0].language,
        theme: 'vs-dark',
        fontSize: 14,
        minimap: { enabled: true },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: 'on'
    });

    renderTabs();
    updateStatusBar();

    editor.onDidChangeModelContent(() => {
        files[currentFileIndex].content = editor.getValue();
        updateStatusBar();
        autoSave();
    });

    setupEventListeners();
    loadAutoSave();
});

/* Setup event listeners */
function setupEventListeners() {
    document.getElementById('language-select').addEventListener('change', (e) => {
        const language = e.target.value;
        files[currentFileIndex].language = language;
        const model = editor.getModel();
        monaco.editor.setModelLanguage(model, language);
        renderTabs();
    });

    document.getElementById('theme-select').addEventListener('change', (e) => {
        monaco.editor.setTheme(e.target.value);
    });

    document.getElementById('run-code').addEventListener('click', runCode);
    document.getElementById('save-code').addEventListener('click', () => openModal('save-modal'));
    document.getElementById('load-code').addEventListener('click', openLoadModal);
    document.getElementById('share-code').addEventListener('click', generateShareURL);
    document.getElementById('clear-output').addEventListener('click', clearOutput);
    document.getElementById('add-tab').addEventListener('click', addNewFile);
}

/* Render tabs */
function renderTabs() {
    const tabsContainer = document.getElementById('tabs');
    tabsContainer.innerHTML = '';

    files.forEach((file, index) => {
        const tab = document.createElement('button');
        tab.className = 'tab' + (index === currentFileIndex ? ' active' : '');
        tab.innerHTML = `
            <i class="fas fa-file-code"></i>
            <span>${file.name}</span>
            ${files.length > 1 ? `<span class="close-tab" onclick="event.stopPropagation(); closeFile(${index})">
                <i class="fas fa-times"></i>
            </span>` : ''}
        `;
        tab.onclick = () => switchFile(index);
        tabsContainer.appendChild(tab);
    });
}

/* Switch file */
function switchFile(index) {
    if (index === currentFileIndex) return;

    currentFileIndex = index;
    const file = files[index];

    editor.setValue(file.content);
    const model = editor.getModel();
    monaco.editor.setModelLanguage(model, file.language);

    document.getElementById('language-select').value = file.language;
    document.getElementById('current-file').textContent = file.name;

    renderTabs();
}

/* Add new file */
function addNewFile() {
    const language = 'javascript';
    const extension = getFileExtension(language);
    const number = files.length + 1;

    files.push({
        name: `file${number}.${extension}`,
        language: language,
        content: codeTemplates[language] || '// New file'
    });

    switchFile(files.length - 1);
}

/* Close file */
function closeFile(index) {
    if (files.length === 1) {
        showNotification('Cannot close the last file', 'error');
        return;
    }

    files.splice(index, 1);

    if (currentFileIndex >= files.length) {
        currentFileIndex = files.length - 1;
    }

    switchFile(currentFileIndex);
}

/* Get file extension */
function getFileExtension(language) {
    const extensions = {
        javascript: 'js', typescript: 'ts', python: 'py', ruby: 'rb',
        html: 'html', css: 'css', json: 'json', markdown: 'md',
        sql: 'sql', yaml: 'yml', shell: 'sh', php: 'php',
        go: 'go', rust: 'rs', java: 'java', csharp: 'cs', cpp: 'cpp'
    };
    return extensions[language] || 'txt';
}

/* Update status bar */
function updateStatusBar() {
    const content = editor.getValue();
    const lines = content.split('\n').length;
    const chars = content.length;

    document.getElementById('current-file').textContent = files[currentFileIndex].name;
    document.getElementById('line-count').textContent = `${lines} lines`;
    document.getElementById('char-count').textContent = `${chars} characters`;
}

/* Add output */
function addOutput(message, type = 'info') {
    const outputDiv = document.getElementById('output-content');
    const logDiv = document.createElement('div');
    logDiv.className = `output-log ${type}`;

    const icons = {
        info: 'fa-info-circle',
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warn: 'fa-exclamation-triangle'
    };

    logDiv.innerHTML = `<i class="fas ${icons[type]}"></i> ${escapeHtml(message)}`;
    outputDiv.appendChild(logDiv);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

/* Clear output */
function clearOutput() {
    document.getElementById('output-content').innerHTML =
        '<div class="output-log info"><i class="fas fa-info-circle"></i> Output cleared.</div>';
}

/* ========== CODE EXECUTION (FREE BACKENDS) ========== */

async function runCode() {
    const code = editor.getValue();
    const language = files[currentFileIndex].language;

    clearOutput();
    addOutput('Running code...', 'info');

    try {
        if (language === 'javascript' || language === 'typescript') {
            /* Run JavaScript/TypeScript in browser */
            executeJavaScript(code);
        } else if (language === 'python' && BACKEND_CONFIG.usePyodide) {
            /* Run Python in browser using Pyodide (FREE!) */
            await executePythonWithPyodide(code);
        } else if (BACKEND_CONFIG.usePiston) {
            /* Run other languages using Piston API (FREE!) */
            await executeWithPiston(code, language);
        } else {
            addOutput(`Execution not configured for ${language}`, 'warn');
            addOutput('Enable Pyodide or Piston in config', 'info');
        }
    } catch (error) {
        addOutput(`Execution error: ${error.message}`, 'error');
    }
}

/* Execute JavaScript in browser */
function executeJavaScript(code) {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => addOutput(args.join(' '), 'info');
    console.error = (...args) => addOutput('ERROR: ' + args.join(' '), 'error');
    console.warn = (...args) => addOutput('WARN: ' + args.join(' '), 'warn');

    try {
        const result = eval(code);
        if (result !== undefined) {
            addOutput('Return: ' + JSON.stringify(result), 'success');
        }
        addOutput('Execution completed (browser)', 'success');
    } catch (error) {
        addOutput(error.message, 'error');
    } finally {
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
    }
}

/* Execute Python using Pyodide (runs in browser, FREE!) */
async function executePythonWithPyodide(code) {
    try {
        /* Load Pyodide if not loaded */
        if (!pyodideInstance) {
            if (pyodideLoading) {
                addOutput('Pyodide is loading, please wait...', 'warn');
                return;
            }

            addOutput('Loading Python interpreter (first time only)...', 'info');
            addOutput('This may take 10-15 seconds...', 'info');
            pyodideLoading = true;

            /* Load Pyodide from CDN */
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

            /* Redirect Python stdout to our output */
            pyodideInstance.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
            `);

            pyodideLoading = false;
            addOutput('Python interpreter loaded!', 'success');
        }

        /* Clear previous output */
        pyodideInstance.runPython('sys.stdout = io.StringIO(); sys.stderr = io.StringIO()');

        /* Execute code */
        await pyodideInstance.runPythonAsync(code);

        /* Get output */
        const stdout = pyodideInstance.runPython('sys.stdout.getvalue()');
        const stderr = pyodideInstance.runPython('sys.stderr.getvalue()');

        if (stdout) {
            addOutput(stdout, 'info');
        }
        if (stderr) {
            addOutput(stderr, 'error');
        }

        addOutput('Execution completed (browser - FREE!)', 'success');
    } catch (error) {
        addOutput(error.message, 'error');
        addOutput('Python error in browser', 'error');
    }
}

/* Execute using Piston API (FREE, 40+ languages) */
async function executeWithPiston(code, language) {
    try {
        /* Map language names to Piston format */
        const languageMap = {
            python: 'python',
            ruby: 'ruby',
            php: 'php',
            go: 'go',
            rust: 'rust',
            java: 'java',
            csharp: 'csharp',
            cpp: 'cpp',
            c: 'c',
            shell: 'bash',
            bash: 'bash'
        };

        const pistonLanguage = languageMap[language];

        if (!pistonLanguage) {
            addOutput(`${language} not supported by Piston API`, 'error');
            return;
        }

        addOutput(`Executing ${language} via free Piston API...`, 'info');

        /* Call Piston API */
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
            throw new Error(`Piston API error: ${response.statusText}`);
        }

        const result = await response.json();

        /* Display output */
        if (result.run) {
            if (result.run.stdout) {
                addOutput(result.run.stdout, 'info');
            }
            if (result.run.stderr) {
                addOutput(result.run.stderr, 'error');
            }
            if (!result.run.stdout && !result.run.stderr) {
                addOutput('(no output)', 'info');
            }

            addOutput('Execution completed (Piston API - FREE!)', 'success');
        } else {
            addOutput('Execution failed', 'error');
        }
    } catch (error) {
        addOutput(`Piston API error: ${error.message}`, 'error');
        addOutput('Piston API may be unavailable', 'warn');
    }
}

/* ========== SAVE/LOAD/SHARE ========== */

function saveProject() {
    const projectName = document.getElementById('project-name').value.trim();

    if (!projectName) {
        showNotification('Please enter a project name', 'error');
        return;
    }

    const projects = JSON.parse(localStorage.getItem('codeEditorProjects') || '{}');
    projects[projectName] = {
        files: files,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('codeEditorProjects', JSON.stringify(projects));

    closeModal('save-modal');
    showNotification('Project saved successfully', 'success');
}

function openLoadModal() {
    const projects = JSON.parse(localStorage.getItem('codeEditorProjects') || '{}');
    const projectsList = document.getElementById('projects-list');

    if (Object.keys(projects).length === 0) {
        projectsList.innerHTML = '<p style="color: #969696;">No saved projects found.</p>';
    } else {
        projectsList.innerHTML = '';

        Object.keys(projects).forEach(name => {
            const project = projects[name];
            const div = document.createElement('div');
            div.style.cssText = 'padding: 10px; margin-bottom: 10px; background: #3c3c3c; border-radius: 3px; display: flex; justify-content: space-between; align-items: center;';
            div.innerHTML = `
                <div>
                    <div style="font-weight: 600; margin-bottom: 5px;">${escapeHtml(name)}</div>
                    <div style="font-size: 11px; color: #969696;">${new Date(project.timestamp).toLocaleString()}</div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button onclick="loadProject('${escapeHtml(name)}')" style="padding: 6px 12px; background: #007acc; color: white; border: none; border-radius: 3px; cursor: pointer;">
                        <i class="fas fa-folder-open"></i> Load
                    </button>
                    <button onclick="deleteProject('${escapeHtml(name)}')" style="padding: 6px 12px; background: #c5000b; color: white; border: none; border-radius: 3px; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            projectsList.appendChild(div);
        });
    }

    openModal('load-modal');
}

function loadProject(name) {
    const projects = JSON.parse(localStorage.getItem('codeEditorProjects') || '{}');
    const project = projects[name];

    if (project) {
        files = project.files;
        currentFileIndex = 0;
        switchFile(0);
        closeModal('load-modal');
        showNotification(`Loaded: ${name}`, 'success');
    }
}

function deleteProject(name) {
    if (!confirm(`Delete project "${name}"?`)) return;

    const projects = JSON.parse(localStorage.getItem('codeEditorProjects') || '{}');
    delete projects[name];
    localStorage.setItem('codeEditorProjects', JSON.stringify(projects));

    openLoadModal();
    showNotification('Project deleted', 'info');
}

function autoSave() {
    localStorage.setItem('codeEditorAutoSave', JSON.stringify({
        files: files,
        currentFileIndex: currentFileIndex
    }));
}

function loadAutoSave() {
    const autoSave = localStorage.getItem('codeEditorAutoSave');
    if (autoSave) {
        try {
            const data = JSON.parse(autoSave);
            if (data.files && data.files.length > 0) {
                files = data.files;
                currentFileIndex = data.currentFileIndex || 0;
                switchFile(currentFileIndex);
            }
        } catch (e) {
            console.error('Failed to load auto-save:', e);
        }
    }
}

function generateShareURL() {
    const data = {
        files: files,
        currentFileIndex: currentFileIndex
    };

    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}${window.location.pathname}?share=${encoded}`;

    document.getElementById('share-url').value = url;
    openModal('share-modal');
}

function copyShareURL() {
    const input = document.getElementById('share-url');
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
        showNotification('Link copied to clipboard', 'success');
    });
}

function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get('share');

    if (shared) {
        try {
            const decoded = JSON.parse(decodeURIComponent(atob(shared)));
            if (decoded.files && decoded.files.length > 0) {
                files = decoded.files;
                currentFileIndex = decoded.currentFileIndex || 0;
                showNotification('Loaded shared code', 'success');
            }
        } catch (e) {
            console.error('Failed to load shared code:', e);
            showNotification('Invalid share link', 'error');
        }
    }
}

/* Modal functions */
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

/* Show notification */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icons = {
        info: 'fa-info-circle',
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle'
    };

    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${escapeHtml(message)}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* Utility */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* Close modals on click outside */
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
