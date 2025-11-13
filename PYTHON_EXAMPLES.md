# Python Test Examples

These are properly formatted Python examples you can copy and run in the editor.

## Example 1: Hello World
```python
print('Hello from Python!')
print('2 + 2 =', 2 + 2)
```

## Example 2: Function (with colon!)
```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Test it
print('5! =', factorial(5))
```

## Example 3: Lists and Loops
```python
# Lists
numbers = [1, 2, 3, 4, 5]
print('Numbers:', numbers)
print('Sum:', sum(numbers))

# List comprehension
squares = [x**2 for x in range(1, 6)]
print('Squares:', squares)

# For loop
for i in range(5):
    print(f'Count: {i}')
```

## Example 4: If Statements (with colons!)
```python
def check_number(n):
    if n > 0:
        return 'positive'
    elif n < 0:
        return 'negative'
    else:
        return 'zero'

print(check_number(5))
print(check_number(-3))
print(check_number(0))
```

## Example 5: Classes (with colons!)
```python
class Calculator:
    def __init__(self, name):
        self.name = name

    def add(self, a, b):
        return a + b

    def multiply(self, a, b):
        return a * b

calc = Calculator('MyCalc')
print(f'{calc.name}: 5 + 3 =', calc.add(5, 3))
print(f'{calc.name}: 5 * 3 =', calc.multiply(5, 3))
```

## Example 6: Standard Library
```python
import math
import datetime

print('PI =', math.pi)
print('Square root of 16 =', math.sqrt(16))
print('Today:', datetime.date.today())
```

## Common Python Syntax Errors

### ❌ Missing Colon
```python
def hello()  # WRONG - missing :
    print('hello')
```

### ✅ Correct
```python
def hello():  # RIGHT - has :
    print('hello')
```

### ❌ Wrong Indentation
```python
def hello():
print('hello')  # WRONG - needs to be indented
```

### ✅ Correct
```python
def hello():
    print('hello')  # RIGHT - indented 4 spaces
```

### ❌ Missing Colon in If
```python
if x > 0  # WRONG - missing :
    print('positive')
```

### ✅ Correct
```python
if x > 0:  # RIGHT - has :
    print('positive')
```

### ❌ Missing Colon in For
```python
for i in range(5)  # WRONG - missing :
    print(i)
```

### ✅ Correct
```python
for i in range(5):  # RIGHT - has :
    print(i)
```

## Quick Tips

1. **Always use colons (:)** after:
   - Function definitions: `def name():`
   - If statements: `if condition:`
   - Loops: `for item in list:` or `while condition:`
   - Classes: `class Name:`
   - Try/except: `try:` and `except:`

2. **Always indent** (use 4 spaces):
   - Everything inside a function
   - Everything inside if/else
   - Everything inside loops
   - Everything inside classes

3. **Check for typos**:
   - Python is case-sensitive
   - Variable names must match exactly
   - Function names must match exactly

4. **Use the hints**:
   - The editor now shows helpful hints for common errors
   - Read the error message carefully
   - Look for the line number

## How to Use in Editor

1. Press `Ctrl+N` to create new file
2. Name it `test.py`
3. Copy one of the examples above
4. Press `Ctrl+Enter` to run
5. Check Terminal panel for output

## First Time Running Python

When you run Python for the first time:
- Wait 10-15 seconds for "Python runtime loaded!"
- After that, all Python code runs instantly!
- This is normal and only happens once

## If You Get Errors

1. Read the error message
2. Check for the line number
3. Look for missing colons (:)
4. Check indentation (4 spaces)
5. Make sure variables are defined
6. Check spelling and capitalization
