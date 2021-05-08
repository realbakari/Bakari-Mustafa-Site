---
title: Strip whitespace
date: 2021-05-07 14:00:00 +0000
tags:
- Python
- Whitespace
description: How to strip whitespace to clean unstructured text data for machine learning
  in Python.
image: ''

---
There are various ways to remove spaces from a string in Python. This tutorial is aimed to provide a short example of various functions you can use to remove whitespaces from a string.

#### Create Text

``` python
# Create text 
text_data = [' Be yourself; everyone else is already taken ', ' So many books, so little time.', ' You only live once '] 
``` 

#### Remove Whitespace

``` python
# Strip whitespaces 
strip_whitespace = [string.strip() for string in text_data] 

# Show text 
strip_whitespace
```

#### Output:
``` python
[' Be yourself; everyone else is already taken ', ' So many books, so little time. ', ' You only live once ']
``` 

How to Remove Extra Space Between Text in Python **(re.sub Operation)**

So far, we have used only functions of the strip-family. However, to get rid of duplicate blank characters between the words of our sentence we need to apply the re.sub operation: [https://docs.python.org/2/library/re.html](https://docs.python.org/2/library/re.html "e.sub operation")


import **re** Import regular expressions 
``` python
string = re.sub(" +", " ",my_string) # Apply sub function 
print(string) # Print updated string |
# " This sentence contains many redundant whitespaces ! "
``` 

### Further Reading

1. [How Python parses whitespace](https://jayconrod.com/posts/101/how-python-parses-white-space)
2. [Splitting and Joining Strings](https://www.pitt.edu/\~naraehan/python3/split_join.html)
3. [How to use Split in Python](http://net-informations.com/python/file/split.htm)
4. [Remove consecutive spaces in a string](https://blog.softhints.com/python-3-how-to-remove-multiple-spaces-in-a-string/)
