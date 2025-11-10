---
title: "Strip Whitespace in Python"
date: 2021-05-07 14:00:00 +0000
layout: post
description: "Learn how to strip whitespace and clean unstructured text data for machine learning in Python using various string methods and regular expressions."
excerpt: "A quick guide to removing whitespace from strings in Python, including leading/trailing spaces and duplicate spaces between words."
categories:
  - Python
  - Tutorials
tags:
  - Python
  - String Manipulation
  - Data Cleaning
  - Text Processing
comments: true
reading_time: 3
---

There are various ways to remove spaces from a string in Python. This tutorial is aimed to provide a short example of various functions you can use to remove whitespaces from a string.

## Create Text

```python
# Create text with leading and trailing whitespace
text_data = [
    ' Be yourself; everyone else is already taken ',
    ' So many books, so little time.',
    ' You only live once '
]
```

## Remove Whitespace

Use list comprehension with the `strip()` method to remove leading and trailing whitespace:

```python
# Strip whitespaces
strip_whitespace = [string.strip() for string in text_data]

# Show text
print(strip_whitespace)
```

### Output:

```python
[
    'Be yourself; everyone else is already taken',
    'So many books, so little time.',
    'You only live once'
]
```

## Remove Extra Space Between Text

So far, we have used only functions of the strip-family. However, to get rid of duplicate blank characters between the words of our sentence we need to apply the `re.sub` operation: [https://docs.python.org/2/library/re.html](https://docs.python.org/2/library/re.html "re.sub operation")

Import the **re** module for regular expressions:

```python
import re

# Example string with multiple spaces
my_string = " This   sentence   contains   many   redundant    whitespaces ! "

# Apply sub function to replace multiple spaces with single space
string = re.sub(" +", " ", my_string)

# Strip leading and trailing spaces
string = string.strip()

print(string)
# Output: "This sentence contains many redundant whitespaces !"
```

### Alternative Methods

#### Using split() and join()

```python
# Remove all extra whitespace by splitting and joining
text = "  This   has   lots   of   spaces  "
cleaned = " ".join(text.split())
print(cleaned)
# Output: "This has lots of spaces"
```

#### Using strip() methods

```python
text = "  Hello World  "

# Remove leading and trailing spaces
print(text.strip())        # "Hello World"

# Remove only leading spaces
print(text.lstrip())       # "Hello World  "

# Remove only trailing spaces
print(text.rstrip())       # "  Hello World"
```

## Further Reading

1. [How Python parses whitespace](https://jayconrod.com/posts/101/how-python-parses-white-space)
2. [Splitting and Joining Strings](https://www.pitt.edu/~naraehan/python3/split_join.html)
3. [How to use Split in Python](http://net-informations.com/python/file/split.htm)
4. [Remove consecutive spaces in a string](https://blog.softhints.com/python-3-how-to-remove-multiple-spaces-in-a-string/)
