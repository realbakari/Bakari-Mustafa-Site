# FREE Backend Execution Guide

## No Costs, No API Limits!

This guide shows you how to run Python, Ruby, and other languages **completely free** without paying for Netlify Functions or any other service.

---

## Three FREE Options

### Option 1: Pyodide (Python in Browser) - RECOMMENDED

**What:** Python 3.11 running directly in your browser using WebAssembly

**Cost:** FREE - Runs client-side, no server needed

**Speed:** Fast after initial load (10-15 seconds first time)

**Pros:**
- Completely free
- No API limits
- No server needed
- Works offline after loading
- Full Python standard library
- Can install packages with micropip

**Cons:**
- ~10-15 second initial load time
- Some packages not available

**Status:** Already integrated in code-editor-pro.html!

### Option 2: Piston API - RECOMMENDED

**What:** Free code execution API supporting 40+ languages

**Cost:** FREE - No account needed, no API key required

**Languages Supported:**
- Python, Ruby, PHP, Java, C, C++, C#
- Go, Rust, Swift, Kotlin, Scala
- JavaScript, TypeScript, Bash
- and 25+ more!

**Limits:**
- Fair use policy (no specific limit published)
- 5-second execution timeout
- ~1MB output limit

**Pros:**
- No setup required
- Works immediately
- 40+ languages
- Actively maintained
- Open source

**Cons:**
- Requires internet connection
- Depends on external service
- Fair use limits (generous)

**Status:** Already integrated in code-editor-pro.html!

### Option 3: Self-Hosted (Advanced)

**What:** Run your own execution server

**Cost:** FREE (if you have a server) or $5/month for basic VPS

**Options:**
- Judge0 CE (Docker container)
- Piston (Self-hosted)
- Simple Flask/Express API

**Pros:**
- Full control
- No external dependencies
- Unlimited usage
- Custom configurations

**Cons:**
- Requires technical setup
- Need to maintain server
- Need to handle security

---

## How It Works

### Current Configuration

In `assets/js/code-editor-free-backend.js`:

```javascript
const BACKEND_CONFIG = {
    /* Python runs in browser (FREE!) */
    usePyodide: true,

    /* Other languages use Piston API (FREE!) */
    usePiston: true,

    /* Don't use Netlify Functions (save your quota) */
    useNetlifyFunctions: false
};
```

### Execution Flow

```
User clicks "Run" →

├─ JavaScript/TypeScript → Browser (eval)
│
├─ Python → Pyodide (Browser WebAssembly)
│   └─ First run: Load Pyodide (~10-15 seconds)
│   └─ Subsequent runs: Instant
│
└─ Ruby/PHP/Go/etc → Piston API (Free)
    └─ Send code to https://emkc.org/api/v2/piston
    └─ Get results back
    └─ Display output
```

---

## Usage Examples

### Python (Pyodide)

**First run:**
```
Click "Run"
→ "Loading Python interpreter (first time only)..."
→ "This may take 10-15 seconds..."
→ Pyodide loads from CDN
→ "Python interpreter loaded!"
→ Code executes
→ "Execution completed (browser - FREE!)"
```

**Subsequent runs:**
```
Click "Run"
→ Code executes instantly
→ Output shown immediately
```

**Example Code:**
```python
# This runs in your browser!
import math

def calculate_circle(radius):
    area = math.pi * radius ** 2
    circumference = 2 * math.pi * radius
    return area, circumference

area, circ = calculate_circle(5)
print(f"Area: {area:.2f}")
print(f"Circumference: {circ:.2f}")
```

### Ruby (Piston API)

```ruby
# This runs via free Piston API
def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

(0..10).each do |i|
  puts "F(#{i}) = #{fibonacci(i)}"
end
```

**Output:**
```
Executing ruby via free Piston API...
F(0) = 0
F(1) = 1
F(2) = 1
...
Execution completed (Piston API - FREE!)
```

### PHP (Piston API)

```php
<?php
$fruits = ['apple', 'banana', 'cherry'];

foreach ($fruits as $index => $fruit) {
    echo ($index + 1) . ". $fruit\n";
}

echo "Total: " . count($fruits) . " fruits";
?>
```

---

## Cost Comparison

| Backend | JavaScript | Python | Ruby | PHP | Go | Cost/Month |
|---------|-----------|--------|------|-----|-----|------------|
| **Pyodide + Piston** | Browser | Browser | Piston | Piston | Piston | **$0** |
| Netlify Functions | Browser | Netlify | Netlify | N/A | N/A | $0 then $25+ |
| AWS Lambda | Browser | AWS | AWS | AWS | AWS | $0 then usage |
| Heroku | Browser | Heroku | Heroku | Heroku | Heroku | $7+ |
| Self-Hosted VPS | Browser | VPS | VPS | VPS | VPS | $5-10 |

**Winner:** Pyodide + Piston = $0 forever!

---

## Detailed Setup (Already Done!)

Your code editor is already configured with both free backends. Here's how it works:

### 1. Pyodide Integration

**Location:** `assets/js/code-editor-free-backend.js`

```javascript
async function executePythonWithPyodide(code) {
    /* Load Pyodide from CDN (first time only) */
    if (!pyodideInstance) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        document.head.appendChild(script);

        pyodideInstance = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });
    }

    /* Execute Python code */
    await pyodideInstance.runPythonAsync(code);

    /* Get output */
    const output = pyodideInstance.runPython('sys.stdout.getvalue()');
}
```

**Features:**
- Loads only once per session
- Caches in browser
- Full Python 3.11 support
- Standard library included
- Can install packages: `await pyodideInstance.loadPackage('numpy')`

### 2. Piston API Integration

```javascript
async function executeWithPiston(code, language) {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: language,
            version: '*',
            files: [{
                name: 'main.ext',
                content: code
            }]
        })
    });

    const result = await response.json();
    /* Display stdout and stderr */
}
```

**No API Key Required!** Just call the endpoint.

---

## Advanced Features

### Installing Python Packages (Pyodide)

```python
# In your code
import micropip
await micropip.install('numpy')

import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print(f"Mean: {np.mean(arr)}")
```

**Available packages:**
- numpy, pandas, matplotlib
- scipy, scikit-learn
- requests, beautifulsoup4
- [Full list](https://pyodide.org/en/stable/usage/packages-in-pyodide.html)

### Supported Piston Languages

```javascript
const pistonLanguages = [
    'python', 'ruby', 'php', 'java', 'c', 'cpp', 'csharp',
    'go', 'rust', 'swift', 'kotlin', 'scala', 'dart',
    'bash', 'lua', 'perl', 'r', 'typescript',
    'haskell', 'elixir', 'clojure', 'racket',
    'ocaml', 'fsharp', 'nim', 'crystal', 'zig',
    'v', 'nasm', 'awk', 'd', 'groovy', 'julia',
    'cobol', 'fortran', 'pascal', 'prolog', 'sql'
];
```

**Check available versions:**
```bash
curl https://emkc.org/api/v2/piston/runtimes
```

---

## Troubleshooting

### Pyodide Issues

**Problem:** "Loading Python interpreter..." takes forever

**Solutions:**
1. Check internet connection
2. Try different CDN: `https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js`
3. Clear browser cache
4. Disable ad blocker

**Problem:** Package not found

**Solution:**
```python
# Check available packages
import micropip
await micropip.list()

# Install if available
await micropip.install('package-name')
```

### Piston API Issues

**Problem:** "Piston API may be unavailable"

**Solutions:**
1. Check https://emkc.org/api/v2/piston/runtimes (should return JSON)
2. Try again (might be temporary)
3. Check language is supported
4. Verify code syntax

**Problem:** Rate limit

**Solution:**
- Piston has generous fair-use limits
- If you hit limits, wait a few minutes
- Or switch to self-hosted option

### General Issues

**Problem:** Code doesn't run

**Checklist:**
1. Select correct language
2. Check code syntax
3. Look for errors in output
4. Try in browser console (F12)
5. Check network tab for API errors

---

## Switching Backends

### Disable Pyodide, Use Piston for Python

```javascript
const BACKEND_CONFIG = {
    usePyodide: false,  // Disable browser Python
    usePiston: true,    // Use Piston for Python too
    useNetlifyFunctions: false
};
```

### Use Only JavaScript (No External APIs)

```javascript
const BACKEND_CONFIG = {
    usePyodide: false,
    usePiston: false,
    useNetlifyFunctions: false
};
```

Only JavaScript will execute.

### Use Netlify Functions (Costs Apply)

```javascript
const BACKEND_CONFIG = {
    usePyodide: false,
    usePiston: false,
    useNetlifyFunctions: true  // Uses your Netlify quota
};
```

Requires `netlify/functions/execute-code.js` deployed.

---

## Self-Hosting Option

If you want complete control, here's how to self-host:

### Option A: Piston (Recommended)

```bash
# Clone Piston
git clone https://github.com/engineer-man/piston
cd piston

# Start with Docker
docker-compose up -d

# Your API is now at:
# http://localhost:2000
```

**Update your config:**
```javascript
const BACKEND_CONFIG = {
    pistonApi: 'http://localhost:2000/api/v2/piston'
};
```

### Option B: Judge0

```bash
# Clone Judge0
git clone https://github.com/judge0/judge0
cd judge0

# Start with Docker Compose
docker-compose up -d

# API at: http://localhost:2358
```

### Option C: Simple Flask API

```python
# server.py
from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/execute', methods=['POST'])
def execute():
    data = request.json
    code = data['code']
    language = data['language']

    if language == 'python':
        result = subprocess.run(
            ['python3', '-c', code],
            capture_output=True,
            text=True,
            timeout=5
        )
        return jsonify({
            'success': True,
            'output': result.stdout,
            'error': result.stderr
        })

if __name__ == '__main__':
    app.run(port=5000)
```

**Update config:**
```javascript
const BACKEND_CONFIG = {
    useCustomBackend: true,
    customBackendUrl: 'http://localhost:5000/execute'
};
```

---

## Performance Comparison

| Backend | First Run | Subsequent | Offline | Languages |
|---------|-----------|------------|---------|-----------|
| **Pyodide** | 10-15s | <100ms | Yes (cached) | Python only |
| **Piston API** | ~1-2s | ~1-2s | No | 40+ |
| **Self-Hosted** | ~1s | ~1s | Yes | All configured |
| **Netlify Functions** | ~1-2s | ~1-2s | No | Custom |

---

## Recommended Configuration

**For most users (FREE):**
```javascript
const BACKEND_CONFIG = {
    usePyodide: true,    // Python in browser
    usePiston: true,     // Other languages
    useNetlifyFunctions: false  // Save your quota!
};
```

This gives you:
- Python: FREE (browser)
- Ruby, PHP, Go, etc: FREE (Piston)
- JavaScript: FREE (browser)
- No costs ever!

---

## FAQ

**Q: Is Piston really free forever?**
A: Yes, it's open-source and community-run. Fair use applies.

**Q: What if Piston goes down?**
A: Pyodide still works for Python. You can self-host Piston or switch backends.

**Q: Can I use Pyodide packages?**
A: Yes, most Python packages work. Install with `await micropip.install('package')`.

**Q: Is this secure?**
A: Pyodide runs sandboxed in browser. Piston runs in isolated containers. Both safe for user code.

**Q: What about API rate limits?**
A: Pyodide has no limits (runs in browser). Piston has fair-use limits (very generous).

**Q: Can I monetize my site using this?**
A: Yes! Both Pyodide and Piston are free to use, even commercially.

---

## Summary

You now have **FREE code execution** for:

**In Browser (Pyodide):**
- Python with full standard library
- No API calls
- No costs
- Works offline

**Via Piston API:**
- 40+ languages
- Free forever
- No account needed
- No API key

**Total Cost:** **$0/month**

No Netlify Function costs!
No AWS Lambda costs!
No server costs!

Just pure, free code execution!

---

## Support

**Pyodide:**
- Docs: https://pyodide.org
- GitHub: https://github.com/pyodide/pyodide

**Piston:**
- API Docs: https://github.com/engineer-man/piston
- Status: https://emkc.org/api/v2/piston/runtimes

**Issues?**
- Check browser console (F12)
- Verify internet connection
- Try different browser
- Clear cache and retry
