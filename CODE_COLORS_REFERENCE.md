# Code Syntax Highlighting - Color Reference

## ✅ Your Syntax Highlighting Setup

Your site uses **Rouge** with a **Gruvbox-inspired dark theme**. Here's what the code colors look like:

---

## 🎨 Color Palette

### Background
- **Code block background**: `#1a1b21` (dark charcoal)
- **Inline code background** (light mode): `#f6f6f6` (light gray)

### Syntax Colors

| Element | Color | Example |
|---------|-------|---------|
| **Keywords** | 🔴 Red `#fb4934` | `function`, `const`, `if`, `for`, `class` |
| **Strings** | 🟢 Green `#b8bb26` | `"Hello World"`, `'text'` |
| **Comments** | 🟤 Brown `#928374` (italic) | `// comment`, `/* block */` |
| **Numbers** | 🟣 Purple `#d3869b` | `42`, `3.14`, `0xFF` |
| **Functions** | 🟡 Yellow `#fabd2f` | Function names |
| **Operators** | ⚪ White `#fbf1c7` | `+`, `-`, `=`, `=>` |
| **Classes** | 🔵 Cyan `#8ec07c` | Class names |

---

## 📋 What You Should See

### JavaScript/MongoDB Example

```javascript
/* Ordered insert - stops on first error */
db.moviesScratch.insertMany([
  {
    "_id": "tt0084726",
    "title": "Star Trek II: The Wrath of Khan",
    "year": 1982,
    "type": "movie"
  }
]);
```

**Expected colors**:
- `/*` and `*/` → 🟤 Brown (comment)
- `db`, `.moviesScratch`, `.insertMany` → ⚪ White (objects/methods)
- `"_id"`, `"title"`, etc. → 🟢 Green (strings)
- `1982` → 🟣 Purple (number)

### Python Example

```python
import re

# Create text with whitespace
text_data = [' Hello ', ' World ']

# Strip whitespaces
strip_whitespace = [string.strip() for string in text_data]
print(strip_whitespace)
```

**Expected colors**:
- `import`, `for`, `in` → 🔴 Red (keywords)
- `re`, `string` → ⚪ White (variables)
- `' Hello '`, `' World '` → 🟢 Green (strings)
- `# Create text...` → 🟤 Brown (comments)
- `print`, `.strip` → 🟡 Yellow (functions)

### Bash Example

```bash
# Install command line tools
xcode-select --install

# Verify installation
xcode-select -p
```

**Expected colors**:
- `#` comments → 🟤 Brown
- Commands and flags → ⚪ White
- Strings would be → 🟢 Green

---

## 🔍 How to Check if Colors Are Working

### Method 1: Inspect Element in Browser

1. Open one of the fixed posts in your browser
2. Right-click on a code block
3. Select "Inspect Element"
4. Look for classes like:
   ```html
   <div class="language-javascript highlighter-rouge">
     <div class="highlight">
       <pre class="highlight">
         <code>
           <span class="k">const</span>  <!-- keyword in red -->
           <span class="s2">"text"</span>  <!-- string in green -->
           <span class="mi">42</span>  <!-- number in purple -->
         </code>
       </pre>
     </div>
   </div>
   ```

### Method 2: Check Generated HTML

The `<span>` tags with special classes indicate syntax highlighting is working:
- `span.k` → Keywords (red)
- `span.s`, `span.s1`, `span.s2` → Strings (green)
- `span.c`, `span.c1`, `span.cm` → Comments (brown)
- `span.mi`, `span.mf` → Numbers (purple)
- `span.nf` → Functions (yellow)
- `span.nc` → Classes (cyan)

### Method 3: Visual Check

**Without highlighting** (old):
```
db.moviesScratch.insertMany([
  {
    "_id": "tt0084726",
    "title": "Star Trek",
  }
]);
```
Everything appears in the same color (usually white or light gray).

**With highlighting** (new):
The same code will show multiple colors:
- Dark background: `#1a1b21`
- Red keywords, green strings, purple numbers, brown comments

---

## 🚨 Troubleshooting: If Colors Aren't Showing

### Issue 1: Old HTML Cached

**Solution**: Hard refresh your browser
- **Mac**: `Cmd + Shift + R`
- **Windows/Linux**: `Ctrl + Shift + R`
- Or clear browser cache

### Issue 2: Jekyll Not Rebuilding

**Solution**: Clean and rebuild
```bash
bundle exec jekyll clean
bundle exec jekyll serve
```

### Issue 3: CSS Not Loading

**Check**: View page source and look for:
```html
<link rel="stylesheet" href="/assets/css/style.css">
```

Open that CSS file and search for `.highlight` - you should see the color definitions.

### Issue 4: Wrong Code Block Format

**Problem**: Still using indented blocks
```markdown
    # This won't get colored
    code here
```

**Solution**: Use fenced blocks with language
````markdown
```javascript
// This WILL get colored
code here
```
````

---

## 📸 Expected Visual Appearance

### Light Mode (if enabled)
- Inline code: Light gray background `#f6f6f6`
- Code blocks: Dark background `#1a1b21` with colored syntax

### Dark Mode
- Inline code: Dark background `#1b1d25`
- Code blocks: Same dark background `#1a1b21` with colored syntax
- Colors remain vibrant and visible

---

## ✅ Verification Checklist

Open the MongoDB post and check:

- [ ] Code block has dark background (#1a1b21)
- [ ] `db`, `insertMany` appear in white/light color
- [ ] Strings like `"Star Trek"` appear in green
- [ ] Numbers like `1982` appear in purple
- [ ] Comments `/* ... */` appear in brown and italic
- [ ] Code is readable with good contrast

---

## 🎯 Quick Test

Create a simple test post with this content:

````markdown
---
title: "Test Syntax Highlighting"
date: 2024-01-01 12:00:00 +0000
layout: post
---

## JavaScript Test

```javascript
const name = "World"; // This is a comment
const age = 42;
console.log(`Hello ${name}`);
```

## Python Test

```python
import os

# This is a comment
def greet(name):
    """Docstring"""
    return f"Hello {name}"

result = greet("World")
print(result)
```
````

If you see multiple colors (not all white/gray), syntax highlighting is working! 🎉

---

## 📝 Summary

Your syntax highlighting **IS configured correctly**:
- ✅ Rouge highlighter enabled
- ✅ Gruvbox color theme configured
- ✅ CSS files exist in `_sass/klise/_syntax.scss`
- ✅ Posts now use fenced code blocks with language tags

The colors **WILL appear** once you:
1. Build the site with Jekyll
2. View in a browser
3. See the generated HTML with `<span>` tags for each syntax element

**Color scheme**: Dark theme with red keywords, green strings, brown comments, purple numbers, yellow functions!
