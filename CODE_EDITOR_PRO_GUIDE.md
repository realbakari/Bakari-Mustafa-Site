# Code Editor Pro - Complete Guide

## Overview

**Code Editor Pro** is a full-featured, multi-language code editor for your Jekyll site with advanced capabilities:

- Multi-file projects with tabs
- Save/Load from localStorage
- Share code via URL
- Backend execution for Python/Ruby
- Embeddable in blog posts
- Professional UI (no emojis, icons only)

---

## Features

### 1. Multi-File Projects with Tabs

Work on multiple files simultaneously with a tab-based interface.

**Features:**
- Add new files with the `+` button
- Switch between files by clicking tabs
- Close files (except the last one)
- Each file maintains its own language and content
- Tab shows file name and language icon

**Usage:**
```
Click the + button → New file created
Click tab → Switch to that file
Click X on tab → Close file
```

### 2. Save/Load from localStorage

Projects are automatically saved as you type (auto-save), plus manual save/load.

**Auto-Save:**
- Automatically saves your work every time you edit
- Persists across browser sessions
- Loads automatically when you return

**Manual Save:**
1. Click "Save" button
2. Enter a project name
3. Click "Save"
4. Project stored in localStorage

**Load Projects:**
1. Click "Load" button
2. See list of saved projects with timestamps
3. Click "Load" on any project
4. Your files and tabs are restored

**Delete Projects:**
- Click the trash icon next to any saved project
- Confirms before deleting

### 3. Code Sharing with URLs

Share your code with others via URL - no server storage needed!

**How it works:**
1. Write your code
2. Click "Share" button
3. Copy the generated URL
4. Share with anyone

**Example URL:**
```
https://yoursite.com/code-editor-pro.html?share=eyJmaWxlcyI6W3sibmFtZSI6Im1haW4...
```

The code is encoded in the URL itself using Base64 encoding.

**Features:**
- Includes all open files and tabs
- Works with any modern browser
- No server storage required
- Preserves language settings

### 4. Backend Execution (Python/Ruby)

Execute Python and Ruby code on the server.

**Supported Languages:**
- **JavaScript/TypeScript**: Runs in browser (client-side)
- **Python**: Runs on server via Netlify Function
- **Ruby**: Runs on server via Netlify Function

**Setup Backend Execution:**

#### Step 1: Ensure Python/Ruby is Installed

Your Netlify build environment needs Python 3 and/or Ruby.

Add to `netlify.toml`:
```toml
[build.environment]
  PYTHON_VERSION = "3.11"
  RUBY_VERSION = "3.2"
```

#### Step 2: Deploy

The Netlify Function is already created at:
```
/netlify/functions/execute-code.js
```

Deploy your site to Netlify and the function will be available at:
```
https://yoursite.com/.netlify/functions/execute-code
```

#### Step 3: Test

1. Open Code Editor Pro
2. Select Python or Ruby language
3. Write code:
```python
print("Hello from Python!")
```
4. Click "Run"
5. See output in the panel

**Security Features:**
- 5-second timeout per execution
- 10,000 character code limit
- 1MB output buffer limit
- Sandboxed execution environment

### 5. Embed in Blog Posts

Add interactive code editors to your blog posts!

**Usage in Markdown:**

```markdown
---
title: My Tutorial Post
---

Here's an interactive JavaScript example:

{% include code-editor-embed.html
   id="demo1"
   language="javascript"
   height="300px"
   code="console.log('Hello World!');"
%}

Try Python:

{% include code-editor-embed.html
   id="demo2"
   language="python"
   height="400px"
   code="print('Hello from Python')"
%}
```

**Parameters:**
- `id` (required): Unique identifier for this editor
- `language` (optional): Default language (default: javascript)
- `height` (optional): Editor height (default: 300px)
- `code` (optional): Initial code to display

**Embedded Editor Features:**
- Syntax highlighting
- Language switching
- Run code (JavaScript only)
- Copy to clipboard
- Compact, blog-friendly design

---

## Usage Guide

### Getting Started

1. **Open the Editor:**
   ```
   https://yoursite.com/code-editor-pro.html
   ```

2. **Start Coding:**
   - Select a language from dropdown
   - Start typing in the editor
   - Your work is auto-saved

3. **Run Code:**
   - Click "Run" button
   - See output in the right panel
   - JavaScript runs immediately
   - Python/Ruby requires backend setup

### Keyboard Shortcuts

Monaco Editor includes VS Code shortcuts:

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save |
| `Ctrl/Cmd + F` | Find |
| `Ctrl/Cmd + H` | Replace |
| `Ctrl/Cmd + /` | Comment/uncomment |
| `Alt + Up/Down` | Move line |
| `Ctrl/Cmd + D` | Select next occurrence |
| `Ctrl/Cmd + Shift + K` | Delete line |
| `Alt + Click` | Multi-cursor |

### Working with Multiple Files

**Scenario: Building a Web Project**

1. Create `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>My Website</h1>
    <script src="app.js"></script>
</body>
</html>
```

2. Click `+` to add `styles.css`:
```css
body {
    font-family: Arial, sans-serif;
    background: #f0f0f0;
}

h1 {
    color: #333;
}
```

3. Click `+` to add `app.js`:
```javascript
console.log('Website loaded!');
```

4. Switch between tabs to edit each file
5. Click "Save" and name it "my-website"

### Sharing Code

**Scenario: Sharing a Tutorial**

1. Write your tutorial code
2. Click "Share"
3. Copy the URL
4. Paste in email, chat, or social media
5. Recipients see your exact code

**Example Share Message:**
```
Check out this code:
https://bakarimustafa.com/code-editor-pro.html?share=eyJmaW...

Try running it!
```

### Saving Projects

**Scenario: Working on Multiple Projects**

1. **Project 1: "fibonacci-demo"**
   - Write Fibonacci code
   - Click "Save" → Name: "fibonacci-demo"

2. **Project 2: "api-client"**
   - Write API code
   - Click "Save" → Name: "api-client"

3. **Load Later:**
   - Click "Load"
   - See both projects listed
   - Click "Load" on the one you want

---

## Integration Examples

### Example 1: Tutorial Blog Post

```markdown
---
title: "Learn JavaScript Basics"
---

## Variables and Functions

Try this interactive example:

{% include code-editor-embed.html
   id="variables"
   language="javascript"
   code="let name = 'John';
console.log('Hello, ' + name);"
%}

Now try modifying the code above!
```

### Example 2: Python Tutorial

```markdown
---
title: "Python Functions"
---

## Defining Functions

{% include code-editor-embed.html
   id="python-functions"
   language="python"
   height="350px"
   code="def greet(name):
    return f'Hello, {name}!'

print(greet('World'))"
%}
```

### Example 3: Multiple Editors

```markdown
---
title: "HTML, CSS, JavaScript"
---

HTML:
{% include code-editor-embed.html id="html" language="html" code="<h1>Hello</h1>" %}

CSS:
{% include code-editor-embed.html id="css" language="css" code="h1 { color: blue; }" %}

JavaScript:
{% include code-editor-embed.html id="js" language="javascript" code="console.log('Hi!');" %}
```

---

## API Documentation

### Netlify Function: execute-code

**Endpoint:** `/.netlify/functions/execute-code`

**Method:** POST

**Request Body:**
```json
{
  "code": "print('Hello')",
  "language": "python"
}
```

**Response (Success):**
```json
{
  "success": true,
  "output": "Hello\n"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "SyntaxError: invalid syntax"
}
```

**Supported Languages:**
- `python` - Python 3
- `ruby` - Ruby

**Limits:**
- Max code length: 10,000 characters
- Timeout: 5 seconds
- Max output: 1MB

---

## Customization

### Change Default Code Templates

Edit `assets/js/code-editor-pro.js`:

```javascript
const codeTemplates = {
    javascript: `// Your custom JavaScript template
console.log("Custom default!");`,

    python: `# Your custom Python template
print("Custom default!")`
};
```

### Add More Languages

In `code-editor-pro.html`, add to the language dropdown:

```html
<option value="kotlin">Kotlin</option>
<option value="swift">Swift</option>
```

Monaco Editor supports 60+ languages automatically!

### Customize Theme

```javascript
monaco.editor.defineTheme('myTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: 'C586C0' }
    ],
    colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4'
    }
});

monaco.editor.setTheme('myTheme');
```

---

## Troubleshooting

### Backend Execution Not Working

**Problem:** "Backend execution not configured" error

**Solutions:**

1. **Check Netlify Function deployed:**
   ```bash
   curl -X POST https://yoursite.com/.netlify/functions/execute-code \
     -H "Content-Type: application/json" \
     -d '{"code":"print(1+1)","language":"python"}'
   ```

2. **Check Python/Ruby installed in build:**
   Add to `netlify.toml`:
   ```toml
   [build.environment]
     PYTHON_VERSION = "3.11"
   ```

3. **Check function logs:**
   - Go to Netlify Dashboard
   - Functions → execute-code
   - View logs for errors

### localStorage Not Working

**Problem:** Save/Load not persisting

**Solutions:**

1. **Check browser settings:**
   - Ensure cookies/localStorage enabled
   - Check incognito mode (localStorage disabled)

2. **Check storage quota:**
   - localStorage limit: ~5-10MB per domain
   - Clear old projects if needed

3. **Clear and retry:**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

### Share URL Not Working

**Problem:** Shared URL doesn't load code

**Solutions:**

1. **URL too long:**
   - Browsers have URL length limits (~2000 chars)
   - Split large projects into multiple shares
   - Use Save/Load for large projects

2. **Special characters:**
   - Ensure URL is properly encoded
   - Copy the entire URL including query string

3. **Check for errors:**
   - Open browser console
   - Look for "Failed to load shared code" error

---

## Performance Tips

### Large Files

For files > 5000 lines:
- Disable minimap: `minimap: { enabled: false }`
- Reduce validation: `validate: false`
- Use worker threads

### Multiple Embedded Editors

If you have 5+ embedded editors on one page:
- Use lazy loading
- Initialize on scroll or click
- Share Monaco Editor instance

### Mobile Performance

- Reduce font size to 12px
- Disable minimap
- Limit editor height
- Use touch-friendly buttons

---

## Security Considerations

### Backend Execution

**Risks:**
- Code injection
- Resource exhaustion
- File system access

**Mitigations (built-in):**
- Timeout: 5 seconds max
- Code length limit: 10,000 chars
- Output limit: 1MB
- Sandboxed execution (no file I/O)
- Shell argument escaping

**Additional Security:**

1. **Rate limiting:**
```javascript
// Add to execute-code.js
const rateLimit = new Map();

function checkRateLimit(ip) {
    const now = Date.now();
    const requests = rateLimit.get(ip) || [];
    const recent = requests.filter(t => now - t < 60000);

    if (recent.length >= 10) {
        throw new Error('Rate limit exceeded');
    }

    recent.push(now);
    rateLimit.set(ip, recent);
}
```

2. **Input validation:**
```javascript
// Block dangerous imports
if (code.includes('os.') || code.includes('sys.')) {
    throw new Error('Restricted imports');
}
```

---

## Deployment Checklist

- [ ] Code Editor Pro page deployed (`code-editor-pro.html`)
- [ ] JavaScript file deployed (`assets/js/code-editor-pro.js`)
- [ ] Netlify function deployed (`netlify/functions/execute-code.js`)
- [ ] Embedded editor include created (`_includes/code-editor-embed.html`)
- [ ] Font Awesome CSS loading
- [ ] Monaco Editor CDN accessible
- [ ] Test all features:
  - [ ] Multi-file tabs working
  - [ ] Save/Load functioning
  - [ ] Share URL generates and loads
  - [ ] JavaScript execution works
  - [ ] Python execution works (if backend configured)
  - [ ] Ruby execution works (if backend configured)
  - [ ] Embedded editors display correctly

---

## Support

**Issues:**
- Check browser console for errors
- Verify Monaco Editor loaded
- Test in incognito mode
- Clear localStorage and retry

**Browser Compatibility:**
- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓

**Required:**
- JavaScript enabled
- localStorage enabled
- Modern browser (ES6 support)

---

## Credits

- **Monaco Editor** - Microsoft (VS Code editor)
- **Font Awesome** - Icons
- **Netlify Functions** - Serverless backend

---

## License

This code editor is part of your Jekyll site and follows your site's license.
