# Quick Test Guide - Code Execution

## 30-Second Quick Test

### 1. JavaScript (Instant - No Wait)
```javascript
// Create: test.js
console.log('Hello from JavaScript!');
console.log('2 + 2 =', 2 + 2);
console.log('Array:', [1, 2, 3, 4, 5]);
```
**Press**: `Ctrl+Enter`
**Expected**: Instant output in Terminal

---

### 2. Python (10-15s First Time, Then Instant)
```python
# Create: test.py
print('Hello from Python!')
print('2 + 2 =', 2 + 2)
print('List:', [1, 2, 3, 4, 5])

import math
print('Square root of 16:', math.sqrt(16))
```
**Press**: `Ctrl+Enter`
**First Run**: Wait 10-15 seconds for "Python runtime loaded!"
**Next Runs**: Instant!

---

### 3. Ruby (1-2 Seconds)
```ruby
# Create: test.rb
puts 'Hello from Ruby!'
puts "2 + 2 = #{2 + 2}"
puts "Array: #{[1, 2, 3, 4, 5]}"
```
**Press**: `Ctrl+Enter`
**Expected**: Output in 1-2 seconds

---

### 4. PHP (1-2 Seconds)
```php
<?php
// Create: test.php
echo "Hello from PHP!\n";
echo "2 + 2 = " . (2 + 2) . "\n";
echo "Array: " . implode(', ', [1, 2, 3, 4, 5]) . "\n";
?>
```
**Press**: `Ctrl+Enter`
**Expected**: Output in 1-2 seconds

---

### 5. Go (1-2 Seconds)
```go
// Create: test.go
package main
import "fmt"

func main() {
    fmt.Println("Hello from Go!")
    fmt.Println("2 + 2 =", 2 + 2)
    fmt.Println("Array:", []int{1, 2, 3, 4, 5})
}
```
**Press**: `Ctrl+Enter`
**Expected**: Output in 1-2 seconds

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Run Code | `Ctrl+Enter` |
| New File | `Ctrl+N` |
| Save Project | `Ctrl+S` |
| Command Palette | `Ctrl+Shift+P` |
| Find | `Ctrl+F` |
| Toggle Terminal | ``Ctrl+` `` |

---

## Expected Results

### Success (Green Text)
```
Running test.js...
Hello from JavaScript!
2 + 2 = 4
Array: 1,2,3,4,5
```

### Error (Red Text)
```
Running test.js...
Error: ReferenceError: undefinedVar is not defined
```

### Python First Load (Blue Text)
```
Loading Python runtime (this may take 10-15 seconds on first run)...
Python runtime loaded!
Running test.py...
Hello from Python!
```

---

## Troubleshooting

**Problem**: Code doesn't run
**Solution**: Make sure you clicked inside the editor and the file has the right extension

**Problem**: Python takes forever
**Solution**: This is normal on first run (10-15s). Subsequent runs are instant.

**Problem**: Piston API timeout
**Solution**: Check your internet connection. Piston API requires network access.

---

## Cost Verification

**Total Cost**: $0/month forever
- ✅ JavaScript: Free (browser)
- ✅ Python: Free (Pyodide CDN)
- ✅ Ruby/PHP/Go/etc: Free (Piston API)
- ✅ No API keys needed
- ✅ No server required

---

## Test Sequence

1. **Visit**: `/code-editor-vscode.html`
2. **Test JavaScript**: Create `test.js`, paste code, `Ctrl+Enter`
3. **Test Python**: Create `test.py`, paste code, `Ctrl+Enter` (wait first time)
4. **Test Ruby**: Create `test.rb`, paste code, `Ctrl+Enter`
5. **Test PHP**: Create `test.php`, paste code, `Ctrl+Enter`
6. **Test Go**: Create `test.go`, paste code, `Ctrl+Enter`

**Total Test Time**: 2-3 minutes (including Python first load)

---

## Success Criteria

✅ All languages execute without errors
✅ Output appears in Terminal panel
✅ Green success messages shown
✅ No red errors (unless testing error handling)
✅ Python instant after first load
✅ Piston API languages complete in 1-2s

---

## Full Test Suite

For comprehensive testing with all features, see:
- **`CODE_EXECUTION_TESTS.md`** - Complete test code for all 10 languages
- **`TEST_RESULTS.md`** - Detailed verification and analysis
- **`VSCODE_EDITOR_GUIDE.md`** - Full user guide

---

**You're Ready!** Start coding at `/code-editor-vscode.html` 🚀
