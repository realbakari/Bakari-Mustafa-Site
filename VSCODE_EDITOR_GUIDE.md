# VS Code Browser Edition - Complete Guide

A full-featured Visual Studio Code-like editor that runs entirely in your browser with support for 40+ programming languages, code execution, and professional IDE features.

## Live Demo

Visit `/code-editor-vscode.html` on your site to access the editor.

---

## Table of Contents

1. [Features Overview](#features-overview)
2. [User Interface](#user-interface)
3. [File Management](#file-management)
4. [Code Editing](#code-editing)
5. [Search & Replace](#search--replace)
6. [Code Execution](#code-execution)
7. [Command Palette](#command-palette)
8. [Settings & Customization](#settings--customization)
9. [Keyboard Shortcuts](#keyboard-shortcuts)
10. [Advanced Features](#advanced-features)
11. [Project Management](#project-management)
12. [Troubleshooting](#troubleshooting)

---

## Features Overview

### Core Features

- **Multi-Language Support**: JavaScript, TypeScript, Python, Ruby, PHP, Go, Rust, Java, C#, C++, HTML, CSS, SQL, YAML, Markdown, and more
- **IntelliSense**: Smart code completion and suggestions
- **Syntax Highlighting**: Beautiful color-coded syntax for all languages
- **Code Execution**: Run code directly in the browser (FREE - no server costs!)
- **Multi-File Projects**: Work with multiple files using tabs
- **Split Editor**: View and edit two files side-by-side
- **File Explorer**: Organize and navigate your project files
- **Search & Replace**: Find and replace across all files with regex support
- **Command Palette**: Quick access to all commands (Ctrl+Shift+P)
- **Problems Panel**: Real-time error detection
- **Integrated Terminal**: See code output and errors
- **Project Save/Load**: Save projects to localStorage
- **Code Sharing**: Share code via URLs
- **Customizable**: Themes, font size, tab size, and more

### Professional Features

- **Minimap**: Navigate large files easily
- **Breadcrumbs**: See your current file location
- **Multiple Cursors**: Edit multiple lines at once
- **Code Formatting**: Auto-format your code
- **Bracket Matching**: Highlight matching brackets
- **Code Folding**: Collapse code blocks
- **Line Numbers**: Always visible with highlighting
- **Word Wrap**: Toggle line wrapping
- **Auto Save**: Automatically save your work

---

## User Interface

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Title Bar (File, Edit, View, Go, Run, Help)                │
├──┬──────┬────────────────────────────────────┬──────────────┤
│  │      │ Breadcrumb                         │              │
│  │      ├────────────────────────────────────┤              │
│A │ Side │ Tabs (Files)                       │ Quick        │
│c │ bar  ├────────────────────────────────────┤ Actions      │
│t │      │                                    │              │
│i │      │ Editor                             │              │
│v │      │                                    │              │
│i │      ├────────────────────────────────────┤              │
│t │      │ Problems / Output / Terminal       │              │
│y │      │                                    │              │
│  │      │                                    │              │
├──┴──────┴────────────────────────────────────┴──────────────┤
│ Status Bar (Errors, Position, Language, etc.)              │
└─────────────────────────────────────────────────────────────┘
```

### Activity Bar (Left Side)

- **Explorer** (Ctrl+Shift+E): File tree and project navigation
- **Search** (Ctrl+Shift+F): Search and replace across files
- **Extensions**: View built-in features
- **Settings** (Ctrl+,): Customize your editor

### Sidebar Panels

Each activity bar icon opens a corresponding sidebar:

1. **Explorer**: Shows all open files with "New File" button
2. **Search**: Find/replace with regex, case-sensitive, whole-word options
3. **Extensions**: Lists all built-in features (IntelliSense, formatting, etc.)
4. **Settings**: Customize theme, font, tab size, minimap, word wrap, auto-save

### Bottom Panel

Toggle with `Ctrl+`` (backtick) or click status bar items:

- **Problems**: Shows errors and warnings
- **Output**: General output messages
- **Terminal**: Code execution output
- **Debug Console**: Debugging information

### Right Panel (Quick Actions)

- Run & Debug section
- File operations (save, load, share)
- Language selector

---

## File Management

### Creating Files

**Method 1: Explorer**
1. Click Explorer icon in activity bar
2. Click "New File" button
3. Enter filename (e.g., `script.py`, `index.html`)

**Method 2: Keyboard**
- Press `Ctrl+N`
- Enter filename when prompted

**Method 3: Tab Bar**
- Click the `+` icon in the tabs area

### Switching Between Files

**Click Method:**
- Click file in Explorer sidebar
- Click tab at the top

**Keyboard Method:**
- `Ctrl+1` through `Ctrl+9`: Switch to file 1-9
- Click file name in breadcrumb

### Closing Files

- Click `×` on the tab
- `Ctrl+W`: Close current file
- Click `×` next to filename in Explorer
- Tab bar: Click "Close All" button

**Note**: Files with unsaved changes show a dot (●) and will prompt before closing.

### File Icons

Files display language-specific icons:
- JavaScript: JS icon
- Python: Python logo
- HTML: HTML5 icon
- CSS: CSS3 icon
- And more...

---

## Code Editing

### IntelliSense (Auto-Complete)

IntelliSense provides smart code suggestions as you type:

**Trigger**:
- Automatically appears as you type
- Press `Ctrl+Space` to manually trigger

**Features**:
- Variable/function suggestions
- Parameter hints
- Type information
- Documentation popups

**Example** (JavaScript):
```javascript
const arr = [1, 2, 3];
arr.  // IntelliSense shows: map, filter, reduce, etc.
```

### Multiple Cursors

Edit multiple locations simultaneously:

**Add Cursor**:
- `Alt+Click`: Add cursor at click position
- `Ctrl+Alt+↓`: Add cursor below
- `Ctrl+Alt+↑`: Add cursor above

**Select All Occurrences**:
- `Ctrl+Shift+L`: Select all occurrences of current word
- `Ctrl+D`: Select next occurrence

**Example**:
```javascript
// Place cursor on "name", press Ctrl+Shift+L
const name = "John";
console.log(name);
alert(name);
// All "name" instances are now editable
```

### Code Formatting

**Auto-Format**:
- `Alt+Shift+F`: Format entire document
- `Ctrl+K Ctrl+F`: Format selection

**Example** (messy JavaScript):
```javascript
function hello(name){return "Hello, "+name+"!";}
```

After formatting:
```javascript
function hello(name) {
    return "Hello, " + name + "!";
}
```

### Code Folding

Collapse/expand code blocks:

- Click `-` icon next to line numbers to collapse
- Click `+` to expand
- Useful for large functions or classes

### Comments

- `Ctrl+/`: Toggle line comment
- `Ctrl+Shift+A`: Toggle block comment

**Example**:
```javascript
console.log('hello');  // Press Ctrl+/
// console.log('hello');  // Now commented!
```

### Bracket Matching

- Click on a bracket `{`, `[`, `(` to highlight its match
- Brackets are colorized in pairs for easy identification

---

## Search & Replace

### Find in Current File

**Keyboard**: `Ctrl+F`

**Features**:
- Case sensitive toggle
- Whole word match
- Regular expressions
- Navigate matches with Enter/Shift+Enter

### Find & Replace in Current File

**Keyboard**: `Ctrl+H`

**Features**:
- All find features +
- Replace one occurrence
- Replace all occurrences

### Search Across All Files

**Keyboard**: `Ctrl+Shift+F`

**Steps**:
1. Click Search icon in activity bar
2. Enter search term
3. Configure options:
   - **Aa**: Case sensitive
   - **Ab|**: Whole word
   - **.***: Regular expression
4. Click "Find All"

**Results**:
- Shows file name and line number
- Preview of matching line
- Click result to jump to that location

**Example**:
```
Search: "function"
Case Sensitive: OFF
Regex: OFF

Results:
main.js:5
    function greet(name) {

utils.js:12
    function calculate() {
```

### Replace Across All Files

**Steps**:
1. Open Search panel (`Ctrl+Shift+F`)
2. Enter search term
3. Enter replacement term
4. Configure options (case, regex, etc.)
5. Click "Replace All"

**Example**:
```
Search: "var "
Replace: "const "
Regex: OFF

→ Replaces all "var " with "const " in all files
```

### Regular Expression Examples

**Find all email addresses**:
```regex
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
```

**Find all function definitions** (JavaScript):
```regex
function\s+\w+\s*\(
```

**Find all TODO comments**:
```regex
//\s*TODO:.*
```

---

## Code Execution

### Supported Languages

**Browser-Based (Free, Instant)**:
- JavaScript
- TypeScript
- Python (via Pyodide WebAssembly)

**API-Based (Free, 1-2 seconds)**:
- Ruby, PHP, Go, Rust, Java, C#, C++, and 30+ more via Piston API

### Running Code

**Method 1: Keyboard**
- `Ctrl+Enter`: Run current file

**Method 2: Click**
- Click "Run Code" in Quick Actions panel
- Use Command Palette: `Ctrl+Shift+P` → "Run: Execute Code"

**Method 3: Menu**
- Title bar: Run → Execute

### Viewing Output

Output appears in the **Terminal** panel at the bottom.

**Example** (JavaScript):
```javascript
console.log('Hello World!');
console.log(2 + 2);
```

**Output**:
```
Running main.js...
Hello World!
4
```

### Handling Errors

Errors appear in red in the Terminal and in the Problems panel.

**Example** (Python):
```python
print(undefined_variable)
```

**Output**:
```
Running main.py...
Error: NameError: name 'undefined_variable' is not defined
```

**Problems Panel**:
```
[X] NameError: name 'undefined_variable' is not defined
    main.py [Ln 1]
```

### Python Execution (Pyodide)

**First Run**: 10-15 seconds to load Python runtime
**Subsequent Runs**: Instant

**Features**:
- Full Python 3.11 standard library
- Runs entirely in browser (no server!)
- Supports most pure Python packages

**Example**:
```python
import math
import datetime

print(f"PI = {math.pi}")
print(f"Square root of 16 = {math.sqrt(16)}")
print(f"Today is {datetime.date.today()}")

# List comprehension
numbers = [x**2 for x in range(10)]
print(f"Squares: {numbers}")
```

### Multi-Language Example

**JavaScript**:
```javascript
const greeting = 'Hello from JavaScript!';
console.log(greeting);
```

**Python**:
```python
greeting = "Hello from Python!"
print(greeting)
```

**Ruby**:
```ruby
greeting = "Hello from Ruby!"
puts greeting
```

All execute with the same "Run" button!

---

## Command Palette

The Command Palette provides quick access to all editor commands.

### Opening

**Keyboard**: `Ctrl+Shift+P`
**Menu**: Click "File" in title bar

### Using

1. Press `Ctrl+Shift+P`
2. Type command name (fuzzy search)
3. Press Enter or click command

### Available Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| File: New File | `Ctrl+N` | Create new file |
| File: Save Project | `Ctrl+S` | Save all files |
| File: Load Project | `Ctrl+O` | Load saved project |
| Edit: Find | `Ctrl+F` | Find in current file |
| Edit: Replace | `Ctrl+H` | Replace in current file |
| Edit: Format Document | `Alt+Shift+F` | Format code |
| View: Toggle Split Editor | - | Split editor view |
| View: Toggle Panel | `Ctrl+`` | Show/hide bottom panel |
| View: Show Explorer | `Ctrl+Shift+E` | Open Explorer sidebar |
| View: Show Search | `Ctrl+Shift+F` | Open Search sidebar |
| Run: Execute Code | `Ctrl+Enter` | Run current file |
| Code: Share | - | Generate shareable link |

### Example Workflow

```
1. Press Ctrl+Shift+P
2. Type "format"
3. Select "Edit: Format Document"
4. Code is auto-formatted!
```

---

## Settings & Customization

Access: Click Settings icon in Activity Bar or press `Ctrl+,`

### Theme

**Available Themes**:
- Dark (Visual Studio) - Default
- Light (Visual Studio)
- High Contrast

**How to Change**:
1. Open Settings
2. Select theme from "Theme" dropdown
3. Theme applies immediately

### Font Size

**Default**: 14px
**Range**: 8-24px

**How to Change**:
1. Open Settings
2. Adjust "Font Size" value
3. Editor updates immediately

**Recommended**:
- Small screens: 12-13px
- Large screens: 14-16px
- Presentations: 18-24px

### Tab Size

**Default**: 4 spaces
**Range**: 2-8 spaces

**How to Change**:
1. Open Settings
2. Adjust "Tab Size" value

**Common Conventions**:
- JavaScript/TypeScript: 2 or 4
- Python: 4 (PEP 8 standard)
- HTML/CSS: 2
- Go: Tabs (8 space width)

### Minimap

**Default**: Enabled

The minimap shows a bird's-eye view of your code on the right side.

**Toggle**:
1. Open Settings
2. Check/uncheck "Minimap"

**Benefits**:
- Quick navigation in large files
- Visual code structure overview
- Fast scrolling

### Word Wrap

**Default**: Off

**Options**:
- Off: Lines extend horizontally
- On: Lines wrap at editor width
- Word Wrap Column: Wrap at specific column

**How to Change**:
1. Open Settings
2. Select from "Word Wrap" dropdown

**When to Use**:
- On: Markdown, plain text, long comments
- Off: Code (to avoid confusion with indentation)

### Auto Save

**Default**: Disabled

When enabled, automatically saves your project every 30 seconds to localStorage.

**How to Enable**:
1. Open Settings
2. Check "Auto Save"

**Benefits**:
- Never lose work
- Automatic backups
- Peace of mind

**Storage**: Uses browser localStorage (typically 5-10MB limit)

---

## Keyboard Shortcuts

### Essential Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Quick Open File | `Ctrl+P` | `Cmd+P` |
| Save Project | `Ctrl+S` | `Cmd+S` |
| New File | `Ctrl+N` | `Cmd+N` |
| Close File | `Ctrl+W` | `Cmd+W` |

### Editing

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Copy Line | `Ctrl+C` | `Cmd+C` |
| Cut Line | `Ctrl+X` | `Cmd+X` |
| Delete Line | `Ctrl+Shift+K` | `Cmd+Shift+K` |
| Move Line Up | `Alt+↑` | `Option+↑` |
| Move Line Down | `Alt+↓` | `Option+↓` |
| Duplicate Line | `Shift+Alt+↓` | `Shift+Option+↓` |
| Comment Line | `Ctrl+/` | `Cmd+/` |
| Format Document | `Alt+Shift+F` | `Option+Shift+F` |

### Navigation

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Go to Line | `Ctrl+G` | `Cmd+G` |
| Go to Start | `Ctrl+Home` | `Cmd+↑` |
| Go to End | `Ctrl+End` | `Cmd+↓` |
| Switch File 1-9 | `Ctrl+1-9` | `Cmd+1-9` |

### Search

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Find | `Ctrl+F` | `Cmd+F` |
| Replace | `Ctrl+H` | `Cmd+H` |
| Find in Files | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Find Next | `F3` | `Cmd+G` |
| Find Previous | `Shift+F3` | `Cmd+Shift+G` |

### View

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Toggle Terminal | `Ctrl+`` | `Cmd+`` |
| Toggle Sidebar | `Ctrl+B` | `Cmd+B` |
| Split Editor | - | - |
| Toggle Explorer | `Ctrl+Shift+E` | `Cmd+Shift+E` |
| Toggle Search | `Ctrl+Shift+F` | `Cmd+Shift+F` |

### Running Code

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Run Code | `Ctrl+Enter` | `Cmd+Enter` |

---

## Advanced Features

### Split Editor

Work on two files side-by-side.

**How to Enable**:
1. Click split icon in tab bar
2. Both files show the same content initially
3. Switch files in either pane independently

**Use Cases**:
- Compare two versions of a file
- Reference one file while editing another
- Copy code between files
- Review code side-by-side

**How to Close**:
- Click split icon again to return to single editor

### Breadcrumbs

Shows your current location in the project.

**Format**: `workspace / filename.ext`

**Features**:
- Displays current file name
- Shows file icon
- Always visible at top of editor

### Status Bar Information

Located at the bottom, displays:

- **Problems Count**: Number of errors/warnings
- **Git Branch**: Current branch (default: main)
- **Cursor Position**: Line and column number
- **Spaces/Tabs**: Current indentation setting
- **Encoding**: File encoding (UTF-8)
- **Language**: Current file language
- **Notifications**: Bell icon for alerts

**Interactive**:
- Click problems to toggle Problems panel
- Click language to change language
- Click position to go to line

### Problems Detection

Automatically detects issues in your code.

**Types**:
- **Errors**: Red X icon (syntax errors, exceptions)
- **Warnings**: Yellow warning icon (potential issues)

**How It Works**:
1. Run code with `Ctrl+Enter`
2. If errors occur, they appear in Problems panel
3. Click problem to jump to location

**Example**:
```javascript
console.log(undefinedVar);  // ReferenceError
```

**Problems Panel**:
```
[X] ReferenceError: undefinedVar is not defined
    main.js [Ln 1]
```

### Code Sharing

Share your code with others via URL.

**Steps**:
1. Click "Share" in Quick Actions panel
2. Copy generated URL
3. Send to collaborators
4. They can load your exact code by visiting the URL

**How It Works**:
- All files are encoded in the URL
- No server storage required
- Works offline (after initial load)

**Example URL**:
```
https://yoursite.com/code-editor-vscode.html?share=eyJma...
```

**Use Cases**:
- Share code snippets
- Teaching/tutorials
- Bug reports
- Code reviews

---

## Project Management

### Saving Projects

**Steps**:
1. Press `Ctrl+S` or click "Save Project"
2. Enter project name
3. Click "Save"

**What Gets Saved**:
- All open files and their content
- Current file selection
- File order in tabs
- Timestamp

**Storage**: Browser localStorage (persistent across sessions)

**Limits**: Typically 5-10MB depending on browser

### Loading Projects

**Steps**:
1. Click "Load Project" in Quick Actions
2. Browse saved projects
3. Click "Load" on desired project

**Project List Shows**:
- Project name
- Number of files
- Last saved timestamp
- Load and Delete buttons

**Example**:
```
My Website Project
3 files • 12/25/2023, 3:45 PM
[Load] [Delete]
```

### Deleting Projects

**Steps**:
1. Open Load Project modal
2. Click "Delete" next to project name
3. Confirm deletion

**Warning**: Deleted projects cannot be recovered!

### Managing Multiple Projects

**Workflow**:
```
1. Work on Project A
2. Save as "ProjectA"
3. Load Project B
4. Work on Project B
5. Save as "ProjectB"
6. Switch between projects anytime
```

**Best Practices**:
- Use descriptive names: "portfolio-website", "python-game"
- Save frequently with `Ctrl+S`
- Enable Auto-Save in settings
- Periodically export important projects via Share feature

---

## Troubleshooting

### Common Issues

#### 1. Python Takes Too Long to Load

**Symptom**: First Python execution takes 10-15 seconds

**Cause**: Pyodide WebAssembly runtime needs to download

**Solution**:
- This is normal for first run
- Subsequent runs are instant
- Wait for "Python runtime loaded!" message

**Tip**: Run a simple `print('test')` when you first open the editor to pre-load Python.

#### 2. Code Execution Fails

**Symptom**: "Failed to execute code" error

**Possible Causes**:
- Network issue with Piston API (for Ruby, PHP, Go, etc.)
- Syntax error in code
- Language not supported for execution

**Solutions**:
- Check your internet connection
- Verify code syntax
- Check browser console for detailed errors
- Supported for execution: JavaScript, Python, Ruby, PHP, Go, Rust, Java, C#, C++

#### 3. Project Won't Save

**Symptom**: "Failed to save project" or nothing happens

**Possible Causes**:
- localStorage is full (5-10MB limit)
- Browser in private/incognito mode
- localStorage disabled

**Solutions**:
- Delete old projects to free space
- Use regular browsing mode (not incognito)
- Check browser settings to enable localStorage
- Try a different browser

#### 4. IntelliSense Not Working

**Symptom**: No autocomplete suggestions appear

**Possible Causes**:
- Wrong language selected
- Monaco Editor not fully loaded

**Solutions**:
- Verify correct language in status bar
- Press `Ctrl+Space` to manually trigger
- Reload page if editor seems unresponsive

#### 5. Split Editor Not Working

**Symptom**: Clicking split icon does nothing

**Possible Cause**: Editor initialization issue

**Solution**:
- Refresh the page
- Try closing some files first
- Check browser console for errors

#### 6. Shared URL Doesn't Work

**Symptom**: Shared code link doesn't load

**Possible Causes**:
- URL was truncated when copying/pasting
- Very large projects exceed URL length limits

**Solutions**:
- Ensure entire URL is copied (check for truncation)
- For large projects, use Save/Load instead
- Share smaller code snippets

#### 7. Keyboard Shortcuts Don't Work

**Symptom**: Pressing `Ctrl+S`, `Ctrl+Enter`, etc. does nothing

**Possible Causes**:
- Browser caught the shortcut first
- Editor doesn't have focus
- Browser extension conflict

**Solutions**:
- Click inside editor to focus it
- Disable conflicting browser extensions
- Use button clicks as alternative
- Try different browser

### Browser Compatibility

**Fully Supported**:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

**Partially Supported** (may have issues):
- Older browser versions
- Mobile browsers (limited keyboard shortcuts)

**Not Supported**:
- Internet Explorer (use modern browser)

### Performance Tips

**For Large Files** (1000+ lines):
- Disable minimap to improve performance
- Use code folding to hide sections
- Consider splitting into multiple files

**For Many Files** (10+ tabs):
- Close unused files
- Use Quick Open (`Ctrl+P`) instead of keeping all tabs open
- Save project and close editor when done

**For Slow Execution**:
- JavaScript/Python run fastest (browser-based)
- Other languages use external API (1-2 second delay normal)
- Check internet connection for API-based execution

### Getting Help

**Resources**:
1. **This Guide**: Comprehensive reference for all features
2. **Command Palette**: Press `Ctrl+Shift+P` to see all available commands
3. **Built-in Examples**: Default file includes feature demonstrations
4. **Browser Console**: Press `F12` to see detailed error messages

**Still Having Issues?**
- Refresh the page and try again
- Clear browser cache and localStorage
- Try a different browser
- Check browser console for specific error messages

---

## Tips & Tricks

### Productivity Hacks

**1. Master the Command Palette**
- `Ctrl+Shift+P` is your best friend
- Type partial command names (fuzzy search works!)
- Example: Type "form" to find "Format Document"

**2. Use Multiple Cursors**
- Select variable name
- Press `Ctrl+D` repeatedly to select all occurrences
- Edit them all at once!

**3. Quick File Switching**
- `Ctrl+1` through `Ctrl+9` for fast tab switching
- No need to click tabs

**4. Auto-Format Before Running**
- Press `Alt+Shift+F` to format
- Then `Ctrl+Enter` to run
- Clean code, every time!

**5. Enable Auto-Save**
- Never lose work again
- Saves every 30 seconds automatically

**6. Use Split View for Learning**
- Put tutorial in left pane
- Write your code in right pane
- No alt-tabbing!

### Code Snippets to Try

**JavaScript - Fetch API**:
```javascript
fetch('https://api.github.com/users/octocat')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

**Python - List Comprehensions**:
```python
# Square even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares)
```

**Python - Data Analysis**:
```python
# Calculate statistics
data = [15, 23, 7, 10, 42, 33, 18, 29]
average = sum(data) / len(data)
maximum = max(data)
minimum = min(data)

print(f"Average: {average}")
print(f"Max: {maximum}")
print(f"Min: {minimum}")
```

**JavaScript - DOM Manipulation**:
```javascript
// Works in browser console too!
const heading = document.createElement('h1');
heading.textContent = 'Created with JavaScript!';
heading.style.color = 'blue';
document.body.appendChild(heading);
```

### Learning Path

**Beginner**:
1. Start with JavaScript (runs instantly)
2. Learn keyboard shortcuts (`Ctrl+S`, `Ctrl+Enter`)
3. Experiment with IntelliSense (type and wait for suggestions)
4. Format your code with `Alt+Shift+F`

**Intermediate**:
1. Try Python with Pyodide
2. Use search & replace across files
3. Work with multiple files
4. Share code with others

**Advanced**:
1. Master command palette
2. Use split editor for comparisons
3. Create multi-file projects
4. Customize all settings to your preference

---

## Comparison: code-editor-pro.html vs code-editor-vscode.html

| Feature | code-editor-pro | code-editor-vscode |
|---------|----------------|-------------------|
| Multi-file tabs | Yes | Yes |
| Code execution | Yes | Yes |
| Save/Load projects | Yes | Yes |
| Share via URL | Yes | Yes |
| **File Explorer** | No | **Yes** |
| **Command Palette** | No | **Yes (Ctrl+Shift+P)** |
| **Split Editor** | No | **Yes** |
| **Search Across Files** | No | **Yes** |
| **Problems Panel** | No | **Yes** |
| **Breadcrumbs** | No | **Yes** |
| **Activity Bar** | No | **Yes** |
| **IntelliSense** | Basic | **Full** |
| **Keyboard Shortcuts** | Limited | **Extensive** |
| **Settings Panel** | No | **Yes** |
| **Multiple Themes** | 3 | 3 |
| **Minimap Toggle** | No | **Yes** |
| **Word Wrap Toggle** | No | **Yes** |
| **Auto Save** | No | **Yes** |

**Recommendation**:
- **Use code-editor-pro.html** for simple, quick code editing
- **Use code-editor-vscode.html** for professional development, multi-file projects, and full IDE experience

---

## Frequently Asked Questions

**Q: Is this really free?**
A: Yes! 100% free forever. Python runs in your browser via WebAssembly, and other languages use the free Piston API.

**Q: Do I need to install anything?**
A: No! Everything runs in your browser. No downloads, no installation, no configuration.

**Q: Can I use this offline?**
A: JavaScript and TypeScript work offline. Python works offline after first load. Other languages require internet for the Piston API.

**Q: How many languages are supported?**
A: 17 languages with syntax highlighting and editing. 40+ languages for code execution.

**Q: Where are my projects saved?**
A: In your browser's localStorage. They persist across browser sessions but are local to your computer.

**Q: Can I export my code?**
A: Yes! Use the Share feature to generate a URL, or copy-paste your code anywhere.

**Q: Is my code private?**
A: Code stays in your browser (localStorage) unless you share it. Shared URLs encode your code in the URL itself (no server storage).

**Q: Can I use this for production?**
A: It's great for learning, prototyping, and code sharing. For production, use a desktop IDE with version control.

**Q: What's the file size limit?**
A: localStorage is typically 5-10MB across all projects. Individual files have no hard limit.

**Q: Can I add more languages?**
A: Monaco Editor supports 60+ languages for syntax highlighting. You can modify the language list in the code.

---

## Conclusion

VS Code Browser Edition brings professional IDE capabilities to your browser with zero setup. Whether you're learning to code, prototyping ideas, sharing snippets, or teaching others, this editor provides a complete development environment.

**Key Takeaways**:
- Full VS Code-like experience in browser
- 40+ languages with free execution
- Professional features: IntelliSense, split view, command palette
- Save, load, and share projects easily
- Extensive keyboard shortcuts for productivity
- Fully customizable settings

**Get Started**:
1. Open `/code-editor-vscode.html`
2. Press `Ctrl+Shift+P` to explore commands
3. Create a new file with `Ctrl+N`
4. Write some code
5. Run it with `Ctrl+Enter`
6. Share with `Ctrl+S` and the Share button!

Happy coding!
