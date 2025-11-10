# Building an Internal Code Editor

## Overview

You can add an interactive code editor to your Jekyll site that supports multiple programming languages. Here are your options, from simple to advanced:

---

## 🏆 Option 1: Monaco Editor (Recommended)

**Monaco Editor** is the same editor that powers VS Code. It's feature-rich and supports 60+ languages.

### Features
- ✅ Syntax highlighting for 60+ languages
- ✅ IntelliSense (autocomplete)
- ✅ Multi-cursor editing
- ✅ Find & Replace
- ✅ Minimap
- ✅ Theme support (VS Code themes)
- ✅ Diff editor
- ✅ Great TypeScript support

### Installation

**Option A: CDN (Easiest)**

Create a new page or include in your layout:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Code Editor</title>
    <style>
        body { margin: 0; padding: 0; }
        #editor-container {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        #toolbar {
            background: #1e1e1e;
            padding: 10px;
            display: flex;
            gap: 10px;
            align-items: center;
        }
        #toolbar select, #toolbar button {
            background: #2d2d30;
            color: #cccccc;
            border: 1px solid #3e3e42;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
        }
        #toolbar button:hover {
            background: #3e3e42;
        }
        #editor {
            flex: 1;
            border: 1px solid #3e3e42;
        }
    </style>
</head>
<body>
    <div id="editor-container">
        <div id="toolbar">
            <label style="color: #cccccc;">Language:</label>
            <select id="language-select">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="typescript">TypeScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
                <option value="markdown">Markdown</option>
                <option value="sql">SQL</option>
                <option value="yaml">YAML</option>
                <option value="shell">Shell/Bash</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
            </select>

            <label style="color: #cccccc;">Theme:</label>
            <select id="theme-select">
                <option value="vs-dark">Dark (VS Code)</option>
                <option value="vs">Light</option>
                <option value="hc-black">High Contrast</option>
            </select>

            <button id="run-code">▶ Run Code</button>
            <button id="clear-editor">🗑️ Clear</button>
            <button id="copy-code">📋 Copy</button>
        </div>
        <div id="editor"></div>
    </div>

    <!-- Monaco Editor from CDN -->
    <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js"></script>
    <script>
        require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });

        let editor;

        require(['vs/editor/editor.main'], function() {
            // Create editor
            editor = monaco.editor.create(document.getElementById('editor'), {
                value: `// Welcome to the Code Editor!\n// Select a language and start coding...\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("World"));`,
                language: 'javascript',
                theme: 'vs-dark',
                fontSize: 14,
                minimap: { enabled: true },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                wordWrap: 'on'
            });

            // Language selector
            document.getElementById('language-select').addEventListener('change', (e) => {
                const model = editor.getModel();
                monaco.editor.setModelLanguage(model, e.target.value);
            });

            // Theme selector
            document.getElementById('theme-select').addEventListener('change', (e) => {
                monaco.editor.setTheme(e.target.value);
            });

            // Run code button (basic - just logs to console)
            document.getElementById('run-code').addEventListener('click', () => {
                const code = editor.getValue();
                const language = document.getElementById('language-select').value;

                if (language === 'javascript') {
                    try {
                        // Execute JavaScript
                        eval(code);
                        alert('✅ Code executed! Check the console for output.');
                    } catch (error) {
                        alert('❌ Error: ' + error.message);
                    }
                } else {
                    alert('Code execution is only supported for JavaScript in this demo.');
                }
            });

            // Clear button
            document.getElementById('clear-editor').addEventListener('click', () => {
                editor.setValue('');
            });

            // Copy button
            document.getElementById('copy-code').addEventListener('click', () => {
                const code = editor.getValue();
                navigator.clipboard.writeText(code).then(() => {
                    alert('✅ Code copied to clipboard!');
                });
            });
        });
    </script>
</body>
</html>
```

**Save as**: `code-editor.html` in your root directory or create as Jekyll page.

### Sample Code Templates for Different Languages

```javascript
// JavaScript template
const languageTemplates = {
    javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,

    python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
</body>
</html>`,

    css: `/* CSS Example */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}`,

    sql: `-- SQL Example
SELECT
    u.name,
    u.email,
    COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id
ORDER BY order_count DESC
LIMIT 10;`
};
```

---

## 🎨 Option 2: CodeMirror 6 (Modern & Lightweight)

CodeMirror 6 is more lightweight than Monaco and highly customizable.

### Features
- ✅ Excellent performance
- ✅ Modular architecture
- ✅ 100+ language modes
- ✅ Vim/Emacs keybindings
- ✅ Mobile-friendly
- ✅ Smaller bundle size than Monaco

### Installation

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>CodeMirror Editor</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: system-ui, -apple-system, sans-serif;
            background: #1e1e1e;
        }
        #editor {
            height: 600px;
            border: 1px solid #333;
            border-radius: 4px;
        }
        .toolbar {
            background: #252526;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 4px;
            display: flex;
            gap: 10px;
        }
        .toolbar select, .toolbar button {
            padding: 8px 12px;
            background: #3c3c3c;
            color: #ccc;
            border: 1px solid #555;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <select id="language">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="sql">SQL</option>
        </select>
        <button id="copy">Copy Code</button>
    </div>
    <div id="editor"></div>

    <script type="module">
        import { EditorView, basicSetup } from "https://cdn.jsdelivr.net/npm/codemirror@6.0.1/dist/index.js";
        import { javascript } from "https://cdn.jsdelivr.net/npm/@codemirror/lang-javascript@6.2.1/dist/index.js";
        import { python } from "https://cdn.jsdelivr.net/npm/@codemirror/lang-python@6.1.3/dist/index.js";
        import { html } from "https://cdn.jsdelivr.net/npm/@codemirror/lang-html@6.4.6/dist/index.js";
        import { css } from "https://cdn.jsdelivr.net/npm/@codemirror/lang-css@6.2.1/dist/index.js";
        import { sql } from "https://cdn.jsdelivr.net/npm/@codemirror/lang-sql@6.5.4/dist/index.js";
        import { oneDark } from "https://cdn.jsdelivr.net/npm/@codemirror/theme-one-dark@6.1.2/dist/index.js";

        let view = new EditorView({
            doc: "// Start coding...\nconsole.log('Hello World!');",
            extensions: [
                basicSetup,
                javascript(),
                oneDark
            ],
            parent: document.getElementById('editor')
        });

        const languages = {
            javascript: javascript(),
            python: python(),
            html: html(),
            css: css(),
            sql: sql()
        };

        document.getElementById('language').addEventListener('change', (e) => {
            const lang = e.target.value;
            view.destroy();
            view = new EditorView({
                doc: view.state.doc.toString(),
                extensions: [
                    basicSetup,
                    languages[lang],
                    oneDark
                ],
                parent: document.getElementById('editor')
            });
        });

        document.getElementById('copy').addEventListener('click', () => {
            const text = view.state.doc.toString();
            navigator.clipboard.writeText(text);
            alert('Copied!');
        });
    </script>
</body>
</html>
```

---

## ⚡ Option 3: Ace Editor (Battle-Tested)

Ace Editor has been around for years and is very stable.

### Features
- ✅ 120+ language modes
- ✅ 20+ themes
- ✅ Search & Replace
- ✅ Code folding
- ✅ Multiple cursors
- ✅ Vim/Emacs bindings

### Installation

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ace Editor</title>
    <style>
        #editor {
            height: 600px;
            width: 100%;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div id="editor">function hello() {
    console.log("Hello World!");
}</div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.2/ace.js"></script>
    <script>
        const editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");

        // Options
        editor.setOptions({
            fontSize: "14px",
            showPrintMargin: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        });
    </script>
</body>
</html>
```

---

## 🚀 Option 4: Simple Prism + ContentEditable (Lightweight)

For basic syntax highlighting without heavy libraries:

```html
<!DOCTYPE html>
<html>
<head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
    <style>
        .editor-container {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 20px auto;
        }
        #code-editor {
            width: 100%;
            min-height: 400px;
            padding: 20px;
            font-family: 'Consolas', monospace;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 4px;
            outline: none;
            background: #2d2d2d;
            color: #ccc;
            overflow: auto;
        }
        #code-output {
            margin-top: 10px;
            padding: 20px;
            background: #1e1e1e;
            border-radius: 4px;
            min-height: 100px;
        }
    </style>
</head>
<body>
    <div class="editor-container">
        <select id="lang-select">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="markup">HTML</option>
            <option value="css">CSS</option>
        </select>
        <pre><code id="code-editor" contenteditable="true" class="language-javascript">function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));</code></pre>
        <button onclick="runCode()">Run</button>
        <div id="code-output"></div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>

    <script>
        const editor = document.getElementById('code-editor');

        editor.addEventListener('input', function() {
            Prism.highlightElement(editor);
        });

        document.getElementById('lang-select').addEventListener('change', function(e) {
            editor.className = 'language-' + e.target.value;
            Prism.highlightElement(editor);
        });

        function runCode() {
            const code = editor.textContent;
            try {
                const result = eval(code);
                document.getElementById('code-output').innerHTML =
                    '<pre><code>' + String(result) + '</code></pre>';
            } catch (error) {
                document.getElementById('code-output').innerHTML =
                    '<pre style="color: #ff6b6b;"><code>' + error.message + '</code></pre>';
            }
        }
    </script>
</body>
</html>
```

---

## 🎯 Integration with Your Jekyll Site

### As a Jekyll Page

Create `code-editor.md` in your root:

```markdown
---
layout: page
title: Code Editor
permalink: /code-editor/
---

<div id="editor-container">
    <!-- Insert Monaco/CodeMirror/Ace code here -->
</div>

<script>
    // Insert editor JavaScript here
</script>
```

### As a Reusable Include

Create `_includes/code-editor.html`:

```html
<div class="embedded-editor" data-language="{{ include.language | default: 'javascript' }}">
    <div id="editor-{{ include.id | default: 'default' }}" style="height: 400px;"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js"></script>
<script>
    require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
    require(['vs/editor/editor.main'], function() {
        monaco.editor.create(document.getElementById('editor-{{ include.id | default: "default" }}'), {
            value: `{{ include.code | default: "// Start coding..." }}`,
            language: '{{ include.language | default: "javascript" }}',
            theme: 'vs-dark'
        });
    });
</script>
```

**Use in posts**:
```markdown
{% include code-editor.html id="example1" language="python" code="print('Hello')" %}
```

---

## 📊 Comparison Table

| Feature | Monaco | CodeMirror 6 | Ace | Prism |
|---------|--------|-------------|-----|-------|
| **Size** | ~3MB | ~500KB | ~1MB | ~50KB |
| **Languages** | 60+ | 100+ | 120+ | 270+ |
| **IntelliSense** | ✅ Yes | ❌ No | Limited | ❌ No |
| **Performance** | Good | Excellent | Good | Basic |
| **Mobile** | Good | Excellent | Good | Good |
| **Themes** | VS Code | Custom | 20+ | 20+ |
| **Learning Curve** | Medium | Medium | Easy | Very Easy |
| **Best For** | Full IDE | Modern apps | Classic | Display only |

---

## 🎨 Advanced Features

### Add Code Execution (JavaScript only)

```javascript
function executeCode(code, language) {
    if (language === 'javascript') {
        // Capture console.log
        const logs = [];
        const originalLog = console.log;
        console.log = (...args) => logs.push(args.join(' '));

        try {
            eval(code);
            console.log = originalLog;
            return { success: true, output: logs.join('\n') };
        } catch (error) {
            console.log = originalLog;
            return { success: false, error: error.message };
        }
    }
    return { success: false, error: 'Language not supported' };
}
```

### Add File Upload/Download

```javascript
// Download code as file
function downloadCode(code, filename) {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Upload file to editor
function uploadFile(input, editor) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        editor.setValue(e.target.result);
    };
    reader.readAsText(file);
}
```

### Add Collaboration (WebRTC/WebSockets)

```javascript
// Using Y.js for real-time collaboration
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';

const ydoc = new Y.Doc();
const provider = new WebrtcProvider('my-room-name', ydoc);
const ytext = ydoc.getText('monaco');
const binding = new MonacoBinding(ytext, editor.getModel(), new Set([editor]));
```

---

## 🚀 Recommended Implementation

For your Jekyll site, I recommend **Monaco Editor** because:

1. ✅ Professional look and feel (VS Code)
2. ✅ Excellent syntax highlighting
3. ✅ Great TypeScript/JavaScript support
4. ✅ Easy CDN integration (no build step)
5. ✅ Active development and maintenance
6. ✅ Familiar to developers

---

## 📝 Next Steps

1. **Choose your editor** (Monaco recommended)
2. **Create a page**: `code-editor.html` or `code-editor.md`
3. **Copy the example code** from this guide
4. **Customize** colors, languages, features
5. **Test** in your Jekyll site
6. **Deploy** and share!

Want me to create a complete, production-ready implementation for your site?
