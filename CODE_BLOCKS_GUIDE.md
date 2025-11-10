# Code Block Styling Guide

## 🔍 The Issue

Your site is properly configured for syntax highlighting with **Rouge**, but some posts don't show colored code because they're using **indented code blocks** instead of **fenced code blocks with language specification**.

---

## Current Configuration ✅

Your Jekyll site is correctly set up:

```yaml
# _config.yml
markdown: kramdown
highlighter: rouge
kramdown:
  syntax_highlighter: rouge
```

**Syntax highlighting CSS** is included in `_sass/klise/_syntax.scss` with a beautiful dark Gruvbox-inspired theme.

---

## The Problem ❌

### Example from: `2021-08-02-mongodb-basics-with-imdb-movies-extensive-dataset.md`

**What you're currently doing** (indented code blocks):

```
## Many documents at a time

    //Ordered

    db.moviesScratch.insertMany(
    [
    {
    "_id" : "tt0084726",
    "title" : "Star Trek II: The Wrath of Khan",
    "year" : 1982,
    "type" : "movie"
    },
    ...
    ]
    );
```

This creates a plain `<pre><code>` block without syntax highlighting.

---

## The Solution ✅

Use **fenced code blocks with language specification**:

````markdown
## Many documents at a time

```javascript
// Ordered
db.moviesScratch.insertMany([
  {
    "_id": "tt0084726",
    "title": "Star Trek II: The Wrath of Khan",
    "year": 1982,
    "type": "movie"
  },
  {
    "_id": "tt0796366",
    "title": "Star Trek",
    "year": 2009,
    "type": "movie"
  }
]);
```
````

This triggers Rouge to add syntax highlighting classes and colors!

---

## Markdown Code Block Syntax

### 1. Inline Code

For short code snippets within text, use single backticks:

```markdown
Use `db.movies.find()` to query all movies.
The `show dbs` command displays all databases.
```

**Result**: Use `db.movies.find()` to query all movies.

---

### 2. Fenced Code Blocks (Recommended)

Use triple backticks with language specification:

````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

**Supported languages** (common ones):
- `javascript` / `js`
- `python` / `py`
- `bash` / `shell` / `sh`
- `java`
- `ruby`
- `go`
- `rust`
- `sql`
- `html`
- `css`
- `yaml` / `yml`
- `json`
- `markdown` / `md`
- `typescript` / `ts`
- `php`
- `c`
- `cpp` / `c++`

[Full list of supported languages](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers)

---

### 3. Indented Code Blocks (Not Recommended)

Four spaces create plain code blocks without highlighting:

```markdown
    def hello_world():
        print("Hello, World!")
```

**Why avoid**: No syntax highlighting, less readable.

---

## Language-Specific Examples

### JavaScript / MongoDB

````markdown
```javascript
// Connect to MongoDB
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

async function main() {
  await client.connect();
  const db = client.db('video');
  const movies = await db.collection('movies').find().toArray();
  console.log(movies);
}

main();
```
````

### Python

````markdown
```python
import re

# Strip whitespace
text_data = [' Be yourself ', ' So many books ']
strip_whitespace = [string.strip() for string in text_data]

# Remove extra spaces
string = re.sub(" +", " ", my_string)
print(string)
```
````

### Bash / Shell Commands

````markdown
```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl status mongodb
```
````

### SQL

````markdown
```sql
SELECT
  status,
  COUNT(*) as count
FROM newsletter_subscribers
WHERE created_at > '2024-01-01'
GROUP BY status
ORDER BY count DESC;
```
````

### JSON

````markdown
```json
{
  "name": "bakari-mustafa-site",
  "version": "1.0.0",
  "dependencies": {
    "resend": "^3.0.0"
  }
}
```
````

### YAML

````markdown
```yaml
---
title: "My Blog Post"
date: 2024-01-15
categories:
  - Tutorial
tags:
  - Python
  - MongoDB
---
```
````

---

## Advanced Features

### Line Highlighting (if theme supports it)

Some Jekyll themes support highlighting specific lines:

````markdown
```javascript{2,4-6}
const express = require('express');
const app = express();  // This line highlighted

app.get('/', (req, res) => {  // These lines highlighted
  res.send('Hello World!');
});

app.listen(3000);
```
````

### Line Numbers

Some themes support line numbers:

````markdown
```javascript
1| const express = require('express');
2| const app = express();
3| app.listen(3000);
```
````

---

## Code Block Best Practices

### 1. Always Specify Language

❌ **Bad**:
````markdown
```
function hello() {
  console.log("Hello");
}
```
````

✅ **Good**:
````markdown
```javascript
function hello() {
  console.log("Hello");
}
```
````

### 2. Add Comments for Context

````markdown
```javascript
/* Connect to database */
const client = new MongoClient(uri);

/* Query movies collection */
const movies = await db.collection('movies')
  .find({ year: { $gte: 2020 } })  // Movies from 2020 onward
  .toArray();
```
````

### 3. Keep Code Blocks Focused

Break long code into smaller, focused blocks with explanations:

````markdown
First, set up the connection:

```javascript
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
```

Then, query the database:

```javascript
const db = client.db('video');
const movies = await db.collection('movies').find().toArray();
```
````

### 4. Use Proper Indentation

````markdown
```python
def process_data(items):
    """Process a list of items."""
    results = []
    for item in items:
        if item.is_valid():
            results.append(item.transform())
    return results
```
````

### 5. Syntax Highlighting for Commands

For terminal commands, use `bash`:

````markdown
```bash
npm install
npm run dev
```
````

For output, consider using `text` or omitting language:

````markdown
```text
Server running on http://localhost:3000
✓ Compiled successfully
```
````

---

## Inline Code Best Practices

### When to Use Inline Code

✅ **Good uses**:
- Function names: `Array.map()`
- Variable names: `const userEmail`
- File names: `package.json`
- Short commands: `npm install`
- Property names: `user.name`
- Keywords: `async`/`await`

❌ **Avoid for**:
- Multiple lines of code (use code blocks)
- Long code snippets
- Code that needs context

### Inline Code Formatting

```markdown
The `find()` method returns a cursor.
Use `db.collection.insertOne({ name: "John" })` to insert a document.
The configuration is in `_config.yml`.
```

---

## Migrating Your Posts

### Step 1: Identify Posts with Indented Code

Search for posts with 4-space indented code blocks:

```bash
grep -r "^    " _posts/*.md
```

### Step 2: Convert to Fenced Blocks

**Before**:
```markdown
Here's how to use MongoDB:

    use video
    db.movies.find()
```

**After**:
````markdown
Here's how to use MongoDB:

```bash
use video
db.movies.find()
```
````

### Step 3: Add Language Specifications

Review each code block and add appropriate language:

- MongoDB shell commands → `javascript` or `mongodb`
- Terminal commands → `bash` or `shell`
- Code examples → language name (`python`, `javascript`, etc.)

---

## Testing Your Changes

### Local Testing

1. Build your site locally:
   ```bash
   bundle exec jekyll serve
   ```

2. Visit your post in a browser

3. Inspect code blocks - they should have these classes:
   ```html
   <div class="language-javascript highlighter-rouge">
     <div class="highlight">
       <pre class="highlight">
         <code>
           <!-- Code with span.k, span.s, etc. for highlighting -->
         </code>
       </pre>
     </div>
   </div>
   ```

### Visual Check

Properly highlighted code should show:
- **Keywords** in red (`function`, `const`, `if`, etc.)
- **Strings** in green
- **Comments** in gray/brown (italic)
- **Numbers** in purple
- **Functions/Methods** in yellow/orange
- **Dark background** (#1a1b21)

---

## Example Post Conversion

### Before (from your MongoDB post)

```markdown
## One document at a time

Without _id (default id is supplied)

`db.moviesScratch.insertOne({title:"Star Trek II: The Wrath of Khan", year:1982, imdb:"tt0084726"})`

With _id

`db.moviesScratch.insertOne({_id:"tt0084726", title:"Star Trek II: The Wrath of Khan", year:1982, imdb:"tt0084726"})`
```

### After (improved version)

````markdown
## One document at a time

Insert a document without specifying `_id` (MongoDB generates it automatically):

```javascript
db.moviesScratch.insertOne({
  title: "Star Trek II: The Wrath of Khan",
  year: 1982,
  imdb: "tt0084726"
});
```

Insert a document with a custom `_id`:

```javascript
db.moviesScratch.insertOne({
  _id: "tt0084726",
  title: "Star Trek II: The Wrath of Khan",
  year: 1982,
  imdb: "tt0084726"
});
```
````

**Benefits**:
- ✅ Syntax highlighting
- ✅ Better formatting
- ✅ Easier to read
- ✅ Proper JSON structure

---

## Quick Reference

### Code Block Syntax

````markdown
```language
Your code here
```
````

### Common Languages

| Type | Language Tag |
|------|-------------|
| JavaScript | `javascript`, `js` |
| Python | `python`, `py` |
| Shell/Bash | `bash`, `shell`, `sh` |
| MongoDB | `javascript` or `mongodb` |
| JSON | `json` |
| YAML | `yaml`, `yml` |
| SQL | `sql` |
| HTML | `html` |
| CSS | `css` |
| Markdown | `markdown`, `md` |

### Inline Code

```markdown
Use `backticks` for inline code
```

---

## Troubleshooting

### Code Not Highlighted?

1. **Check language tag**: Is it spelled correctly?
   ```markdown
   ```javascript  ✅
   ```javascipt   ❌ (typo)
   ```

2. **Check backticks**: Are there exactly 3 backticks?
   ````markdown
   ```javascript   ✅
   ``javascript    ❌ (only 2)
   ````

3. **Check closing backticks**: Did you close the code block?
   ````markdown
   ```javascript
   const x = 1;
   ```            ✅

   ```javascript
   const x = 1;   ❌ (no closing backticks)
   ````

### Still Not Working?

1. Clear Jekyll cache:
   ```bash
   bundle exec jekyll clean
   bundle exec jekyll serve
   ```

2. Check browser console for CSS errors

3. Verify `_sass/klise/_syntax.scss` exists and is imported

---

## Additional Resources

- [Rouge Syntax Highlighter](https://github.com/rouge-ruby/rouge)
- [Supported Languages](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers)
- [Markdown Guide - Code](https://www.markdownguide.org/extended-syntax/#syntax-highlighting)
- [Jekyll Liquid Syntax](https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting)

---

## Action Items

- [ ] Review posts with code blocks
- [ ] Convert indented code blocks to fenced code blocks
- [ ] Add language specifications to all code blocks
- [ ] Test locally to verify syntax highlighting works
- [ ] Deploy and verify on production site

---

## Summary

**The Problem**: Indented code blocks (4 spaces) don't trigger syntax highlighting

**The Solution**: Use fenced code blocks with language specification:

````markdown
```language
your code here
```
````

**Quick Win**: Update your most popular posts first to see immediate improvement in readability!
