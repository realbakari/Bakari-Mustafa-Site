#!/usr/bin/env python3
"""
Fetch clean portrait book covers from Open Library and Google Books APIs
for every book in _data/books.yml, save verified JPEG covers into
assets/img/books/<slug>.jpg, and update _data/books.yml with cover paths.
"""

import concurrent.futures
import json
import os
import re
import subprocess
import tempfile
import urllib.parse
import urllib.request

BOOKS_YML = "_data/books.yml"
OUT_DIR = "assets/img/books"
USER_AGENT = "BakariMustafaSite/1.0 (https://bakarimustafa.com)"

# Explicit ISBN fallbacks for titles with alternate author formatting or indie editions
KNOWN_ISBNS = {
    "ball-lightning": ["9780765394071", "9781250213532", "9781788540490"],
    "before-the-exit": ["9781980628828", "1980628823"],
    "dream-teams": ["9780735217508", "9780735217515"],
    "org-design-for-design-orgs": ["9781491938409", "1491938404"],
    "pro-sumer-power": ["9781931109246", "9781891279089"],
    "resplendent-light": ["9780967021614", "0967021618"],
    "superhuman-by-habit": ["9781503295599", "1503295591"],
    "two-minutes-from-the-abyss": ["9781934550137", "9798875133046"],
}

DIRECT_COVER_URLS = {
    "org-design-for-design-orgs": [
        "https://learning.oreilly.com/library/cover/9781491938409/360h/",
    ],
}


def parse_books(path):
    """Minimal parser for our structured _data/books.yml entries."""
    books = []
    current = None
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()
            if not stripped or stripped.startswith("#"):
                continue
            if stripped.startswith("- slug:"):
                if current:
                    books.append(current)
                current = {"slug": stripped.split(":", 1)[1].strip().strip('"\'')}
            elif current is not None and ":" in stripped:
                k, v = stripped.split(":", 1)
                current[k.strip()] = v.strip().strip('"\'')
    if current:
        books.append(current)
    return books


def http_get(url, timeout=15):
    proc = subprocess.run(
        ["curl", "-fsSL", "--max-time", str(timeout), "-A", USER_AGENT, url],
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        check=True,
    )
    return proc.stdout, ""


def check_image_dims(path):
    """Return (width, height) using macOS sips, or (0, 0) if invalid."""
    try:
        out = subprocess.check_output(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", path],
            stderr=subprocess.DEVNULL,
            text=True,
        )
        w = re.search(r"pixelWidth:\s*(\d+)", out)
        h = re.search(r"pixelHeight:\s*(\d+)", out)
        if w and h:
            return int(w.group(1)), int(h.group(1))
    except Exception:
        pass
    return 0, 0


def save_verified_cover(img_bytes, out_path):
    """Verify image is valid, reasonably sized, portrait-ish, and normalize to JPEG."""
    if not img_bytes or len(img_bytes) < 2500:
        return False, "too small bytes"

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(img_bytes)
        tmp_path = tmp.name

    try:
        w, h = check_image_dims(tmp_path)
        if w < 100 or h < 130:
            return False, f"tiny dims {w}x{h}"
        ratio = w / h
        # Reject extreme banners or ultra-narrow strips; allow square-ish photo books up to 1.25
        if ratio > 1.3 or ratio < 0.45:
            return False, f"bad aspect {w}x{h}"

        # Convert to JPEG and resize max dimension to 420px for crisp Retina thumbnails without bloat
        cmd = ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "84"]
        if max(w, h) > 420:
            cmd += ["-Z", "420"]
        cmd += [tmp_path, "--out", out_path]
        subprocess.check_call(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        fw, fh = check_image_dims(out_path)
        if fw >= 80 and fh >= 100:
            return True, f"{fw}x{fh}"
        if os.path.exists(out_path):
            os.remove(out_path)
        return False, "post-convert invalid"
    except Exception as e:
        if os.path.exists(out_path):
            os.remove(out_path)
        return False, str(e)
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)


def normalize_words(text):
    return set(re.findall(r"[a-z0-9]+", (text or "").lower()))


def is_good_match(req_title, req_author, cand_title, cand_author):
    """Ensure candidate matches requested book and isn't a third-party summary/study guide."""
    ct_low = (cand_title or "").lower()
    rt_low = (req_title or "").lower()
    if any(bad in ct_low for bad in ("summary of", "workbook", "study guide", "book summary", "trivia", "quiz")):
        if "summary" not in rt_low:
            return False

    stop = {"the", "a", "an", "of", "and", "in", "to", "for", "on", "by", "with", "is", "how", "your"}
    rt_words = normalize_words(req_title) - stop or normalize_words(req_title)
    ct_words = normalize_words(cand_title)
    if not rt_words:
        return False
    title_overlap = len(rt_words & ct_words) / len(rt_words)
    if title_overlap < 0.6:
        return False

    # Check author surname overlap when candidate author is present
    first_author = re.split(r"[,&]", req_author)[0].strip()
    author_tokens = [w for w in re.findall(r"[a-z0-9]+", first_author.lower()) if len(w) > 2]
    if cand_author and author_tokens:
        ca_low = cand_author.lower()
        surname = author_tokens[-1]
        if surname not in ca_low and not any(t in ca_low for t in author_tokens):
            return False
    return True


def fetch_from_openlibrary(title, author):
    first_author = re.split(r"[,&]", author)[0].strip()
    params = urllib.parse.urlencode(
        {"title": title, "author": first_author, "limit": 6, "fields": "cover_i,isbn,title,author_name"}
    )
    url = f"https://openlibrary.org/search.json?{params}"
    try:
        data, _ = http_get(url, timeout=15)
        docs = json.loads(data).get("docs", [])
    except Exception:
        docs = []

    if not docs:
        params = urllib.parse.urlencode({"q": f"{title} {first_author}", "limit": 6, "fields": "cover_i,isbn,title,author_name"})
        try:
            data, _ = http_get(f"https://openlibrary.org/search.json?{params}", timeout=15)
            docs = json.loads(data).get("docs", [])
        except Exception:
            docs = []

    candidates = []
    for doc in docs:
        cand_title = doc.get("title", "")
        cand_author = " ".join(doc.get("author_name") or [])
        if not is_good_match(title, author, cand_title, cand_author):
            continue
        if doc.get("cover_i"):
            candidates.append(f"https://covers.openlibrary.org/b/id/{doc['cover_i']}-L.jpg?default=false")
        for isbn in (doc.get("isbn") or [])[:2]:
            candidates.append(f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg?default=false")
    return candidates


def fetch_from_google_books(title, author):
    first_author = re.split(r"[,&]", author)[0].strip()
    q = f'intitle:"{title}" inauthor:"{first_author}"'
    candidates = []
    for query in (q, f"{title} {first_author}"):
        params = urllib.parse.urlencode({"q": query, "maxResults": 5})
        url = f"https://www.googleapis.com/books/v1/volumes?{params}"
        try:
            data, _ = http_get(url, timeout=15)
            items = json.loads(data).get("items", [])
            for item in items:
                info = item.get("volumeInfo", {})
                cand_title = info.get("title", "")
                cand_author = " ".join(info.get("authors") or [])
                if not is_good_match(title, author, cand_title, cand_author):
                    continue
                links = info.get("imageLinks", {})
                for key in ("medium", "small", "thumbnail"):
                    if key in links:
                        img_url = links[key].replace("http://", "https://").replace("&edge=curl", "")
                        if "zoom=1" in img_url:
                            candidates.append(img_url.replace("zoom=1", "zoom=2"))
                        candidates.append(img_url)
            if candidates:
                break
        except Exception:
            continue
    return candidates


def fetch_from_itunes(title, author):
    """Apple Books Search API often has crisp official covers."""
    first_author = re.split(r"[,&]", author)[0].strip()
    params = urllib.parse.urlencode({"term": f"{title} {first_author}", "media": "ebook", "limit": 5})
    url = f"https://itunes.apple.com/search?{params}"
    candidates = []
    try:
        data, _ = http_get(url, timeout=15)
        for item in json.loads(data).get("results", []):
            if not is_good_match(title, author, item.get("trackName", ""), item.get("artistName", "")):
                continue
            art = item.get("artworkUrl100") or item.get("artworkUrl60")
            if art:
                candidates.append(re.sub(r"\d+x\d+bb", "400x600bb", art))
    except Exception:
        pass
    return candidates


def fetch_from_known_isbns(slug):
    urls = list(DIRECT_COVER_URLS.get(slug, []))
    for isbn in KNOWN_ISBNS.get(slug, []):
        urls.append(f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg?default=false")
        # Query Longitood open Goodreads-backed bookcover API by ISBN
        try:
            data, _ = http_get(f"https://bookcover.longitood.com/bookcover/{isbn}", timeout=15)
            cover_url = json.loads(data).get("url")
            if cover_url:
                urls.append(cover_url)
        except Exception:
            pass
        # Also query Google Books by ISBN
        try:
            data, _ = http_get(f"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}", timeout=15)
            for item in json.loads(data).get("items", []):
                links = item.get("volumeInfo", {}).get("imageLinks", {})
                for key in ("medium", "small", "thumbnail"):
                    if key in links:
                        u = links[key].replace("http://", "https://").replace("&edge=curl", "")
                        if "zoom=1" in u:
                            urls.append(u.replace("zoom=1", "zoom=2"))
                        urls.append(u)
        except Exception:
            pass
    return urls


def process_book(book):
    slug = book["slug"]
    title = book["title"]
    author = book["author"]
    out_path = os.path.join(OUT_DIR, f"{slug}.jpg")

    if os.path.exists(out_path):
        w, h = check_image_dims(out_path)
        if w >= 80 and h >= 100:
            return slug, True, f"cached {w}x{h}"

    # Try explicit ISBNs first when present, then Apple Books, Open Library, and Google Books
    sources = [
        ("isbn", lambda t, a: fetch_from_known_isbns(slug)),
        ("itunes", fetch_from_itunes),
        ("openlibrary", fetch_from_openlibrary),
        ("google", fetch_from_google_books),
    ]
    for source_name, fn in sources:
        for url in fn(title, author)[:6]:
            try:
                img_bytes, _ = http_get(url, timeout=15)
                if not img_bytes[:4].startswith((b"\xff\xd8", b"\x89PNG", b"RIFF", b"GIF8")):
                    continue
                ok, info = save_verified_cover(img_bytes, out_path)
                if ok:
                    return slug, True, f"{source_name} {info}"
            except Exception:
                continue

    return slug, False, "not found"


def update_yaml_covers(found_slugs):
    with open(BOOKS_YML, "r", encoding="utf-8") as f:
        lines = f.readlines()

    out_lines = []
    current_slug = None
    has_cover_line = False

    def flush_cover():
        nonlocal has_cover_line
        if current_slug and current_slug in found_slugs and not has_cover_line:
            out_lines.append(f"  cover: /assets/img/books/{current_slug}.jpg\n")
        has_cover_line = False

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("- slug:"):
            flush_cover()
            current_slug = stripped.split(":", 1)[1].strip().strip('"\'')
            out_lines.append(line)
        elif stripped.startswith("cover:") and current_slug:
            if current_slug in found_slugs:
                out_lines.append(f"  cover: /assets/img/books/{current_slug}.jpg\n")
                has_cover_line = True
            else:
                has_cover_line = False
        else:
            out_lines.append(line)
    flush_cover()

    with open(BOOKS_YML, "w", encoding="utf-8") as f:
        f.writelines(out_lines)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    books = parse_books(BOOKS_YML)
    print(f"Processing {len(books)} books...")

    found = {}
    missing = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
        futures = {ex.submit(process_book, b): b for b in books}
        for fut in concurrent.futures.as_completed(futures):
            b = futures[fut]
            slug, ok, info = fut.result()
            if ok:
                found[slug] = info
            else:
                missing.append((slug, b["title"], b["author"], info))

    update_yaml_covers(set(found.keys()))
    print(f"\nFound covers: {len(found)}/{len(books)}")
    if missing:
        print(f"Missing ({len(missing)}):")
        for m in sorted(missing):
            print("  -", m)


if __name__ == "__main__":
    main()
