#!/usr/bin/env python3
"""Build full spirit dataset from official BWIKI MediaWiki API.

Outputs:
- assets/data/spirits.full.json
- downloads real portrait images to assets/spirits_full/
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import time
import urllib.parse
import urllib.request
from urllib.error import HTTPError, URLError
from pathlib import Path
from typing import Any

API_BASE = "https://wiki.biligame.com/rocom/api.php"
WIKI_PAGE_BASE = "https://wiki.biligame.com/rocom/"

HOT_NAMES = {
    "迪莫",
    "噩梦迪莫",
    "阿布",
    "雪影娃娃",
    "音速犬",
    "火神",
    "圣域迪莫",
    "水蓝蓝",
    "喵喵",
    "逍遥呱呱",
    "格兰球",
    "皇家狮鹫",
    "翼王",
}

TYPE_BONUS = {
    "光": {"light": 10, "brain": 3},
    "恶": {"brain": 8, "fire": 8, "light": -6},
    "火": {"fire": 10, "free": 5},
    "水": {"light": 4, "brain": 5},
    "草": {"light": 7, "brain": 4},
    "翼": {"free": 10, "light": 3},
    "电": {"free": 8, "fire": 6},
    "毒": {"brain": 8, "fire": 4},
    "龙": {"fire": 8, "light": 5},
    "机械": {"brain": 7, "light": 3},
    "冰": {"brain": 6, "light": 4, "free": -2},
}


def api_get(params: dict[str, Any], timeout: int = 30, retries: int = 4) -> dict[str, Any]:
    query = urllib.parse.urlencode(params)
    url = f"{API_BASE}?{query}"
    req = urllib.request.Request(url, headers={"User-Agent": "roco-spirit-pack-builder/1.0"})
    last_err: Exception | None = None
    for i in range(retries):
        try:
            # Prefer curl for better compatibility with anti-bot edge filters.
            cmd = ["curl", "-sL", "--get", API_BASE, "-H", "Referer: https://wiki.biligame.com/rocom/"]
            for k, v in params.items():
                cmd.extend(["--data-urlencode", f"{k}={v}"])
            raw = subprocess.check_output(cmd, timeout=timeout)
            text = raw.decode("utf-8", errors="ignore").strip()
            if text.startswith("<!doctype html") or text.startswith("<html"):
                raise json.JSONDecodeError("anti-bot html", text, 0)
            return json.loads(text)
        except (HTTPError, URLError, TimeoutError) as err:
            last_err = err
            sleep_s = 0.6 + i * 0.8
            time.sleep(sleep_s)
            continue
        except (subprocess.CalledProcessError, subprocess.TimeoutExpired, json.JSONDecodeError) as err:
            last_err = err
            sleep_s = 0.6 + i * 0.8
            time.sleep(sleep_s)
            continue
    assert last_err is not None
    raise last_err


def fetch_category_titles(limit: int | None = None) -> list[str]:
    titles: list[str] = []
    cont: dict[str, Any] = {}
    while True:
        params = {
            "action": "query",
            "list": "categorymembers",
            "cmtitle": "分类:精灵",
            "cmtype": "page",
            "cmlimit": "500",
            "format": "json",
        }
        params.update(cont)
        data = api_get(params)
        for item in data.get("query", {}).get("categorymembers", []):
            titles.append(item["title"])
            if limit and len(titles) >= limit:
                return titles
        if "continue" not in data:
            break
        cont = data["continue"]
    return titles


def split_chunks(items: list[str], n: int) -> list[list[str]]:
    return [items[i : i + n] for i in range(0, len(items), n)]


def parse_infobox(wikitext: str) -> dict[str, str]:
    # Most spirit pages use {{精灵信息 ... }}
    m = re.search(r"\{\{精灵信息([\s\S]*?)\n\}\}", wikitext)
    if not m:
        return {}
    body = m.group(1)
    info: dict[str, str] = {}
    for line in body.splitlines():
        if not line.startswith("|"):
            continue
        if "=" not in line:
            continue
        k, v = line[1:].split("=", 1)
        info[k.strip()] = v.strip()
    return info


def parse_number(value: str) -> int | None:
    if not value:
        return None
    m = re.search(r"-?\d+", value)
    if not m:
        return None
    return int(m.group(0))


def clean_text(value: str) -> str:
    if not value:
        return ""
    value = re.sub(r"<[^>]+>", "", value)
    value = re.sub(r"\[\[[^\]|]+\|([^\]]+)\]\]", r"\1", value)
    value = re.sub(r"\[\[([^\]]+)\]\]", r"\1", value)
    value = re.sub(r"\{\{[^}]+\}\}", "", value)
    return value.strip()


def infer_types(info: dict[str, str]) -> list[str]:
    t1 = clean_text(info.get("主属性", ""))
    t2 = clean_text(info.get("2属性", ""))
    types = []
    for t in [t1, t2]:
        t = t.replace("/", "、")
        for part in [x.strip() for x in t.split("、") if x.strip()]:
            if part and part not in types:
                types.append(part)
    return types or ["普通"]


def infer_series(title: str, form: str, category: str) -> str:
    raw = f"{title} {form} {category}"
    if any(k in raw for k in ["噩梦", "梦魇"]):
        return "隐藏·噩梦"
    if "圣域" in raw:
        return "隐藏·圣域"
    if "深渊" in raw:
        return "隐藏·深渊"
    if any(k in raw for k in ["异色", "联动", "限定", "节日"]):
        return "扩展"
    return "主流"


def infer_popularity(title: str, series: str) -> int:
    pop = 70
    if title in HOT_NAMES:
        pop += 22
    if series.startswith("隐藏"):
        pop += 12
    if "迪莫" in title:
        pop += 6
    if any(k in title for k in ["王", "神", "圣", "噩梦"]):
        pop += 4
    return max(45, min(99, pop))


def compute_weights(info: dict[str, str], types: list[str], title: str) -> dict[str, int]:
    hp = parse_number(info.get("生命", ""))
    atk = parse_number(info.get("物攻", ""))
    satk = parse_number(info.get("魔攻", ""))
    de = parse_number(info.get("物防", ""))
    sde = parse_number(info.get("魔防", ""))
    spd = parse_number(info.get("速度", ""))

    if None in [hp, atk, satk, de, sde, spd]:
        h = hashlib.md5(title.encode("utf-8")).hexdigest()
        base = [int(h[i : i + 2], 16) for i in range(0, 8, 2)]
        return {
            "light": 45 + (base[0] % 46),
            "free": 45 + (base[1] % 46),
            "brain": 45 + (base[2] % 46),
            "fire": 45 + (base[3] % 46),
        }

    assert hp is not None and atk is not None and satk is not None and de is not None and sde is not None and spd is not None

    def norm(x: float) -> int:
        return max(20, min(98, int(round(x / 1.55))))

    light = norm((hp * 0.36) + (de * 0.34) + (sde * 0.30))
    free = norm((spd * 0.78) + (atk * 0.22))
    brain = norm((satk * 0.66) + (sde * 0.22) + (spd * 0.12))
    fire = norm((atk * 0.70) + (spd * 0.30))

    bonus = {"light": 0, "free": 0, "brain": 0, "fire": 0}
    for t in types:
        tb = TYPE_BONUS.get(t)
        if not tb:
            continue
        for k, v in tb.items():
            bonus[k] += v

    return {
        "light": max(20, min(98, light + bonus["light"])),
        "free": max(20, min(98, free + bonus["free"])),
        "brain": max(20, min(98, brain + bonus["brain"])),
        "fire": max(20, min(98, fire + bonus["fire"])),
    }


def choose_portrait_file(image_titles: list[str], title: str) -> str | None:
    if not image_titles:
        return None

    pure_title = re.sub(r"（.*?）", "", title).strip()

    def score(name: str) -> tuple[int, int]:
        s = 0
        if "页面 宠物 立绘" in name:
            s += 80
        if "异色" not in name:
            s += 18
        if pure_title and pure_title in name:
            s += 15
        if title in name:
            s += 10
        if name.endswith(".png"):
            s += 3
        return (s, -len(name))

    ranked = sorted(image_titles, key=score, reverse=True)
    best = ranked[0]
    if score(best)[0] < 40:
        return None
    return best


def guess_portrait_candidates(page_title: str, spirit_name: str) -> list[str]:
    candidates: list[str] = []
    base_name = re.sub(r"（.*?）", "", spirit_name).strip()
    base_page = re.sub(r"（.*?）", "", page_title).strip()
    raw_names = [spirit_name, page_title, base_name, base_page]
    seen = set()
    for n in raw_names:
        n = n.strip()
        if not n or n in seen:
            continue
        seen.add(n)
        candidates.append(f"文件:页面 宠物 立绘 {n} 1.png")
        candidates.append(f"文件:页面 宠物 立绘 {n} 异色 1.png")
    return candidates


def fetch_pages_payload(titles: list[str]) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for chunk in split_chunks(titles, 8):
        params = {
            "action": "query",
            "titles": "|".join(chunk),
            "prop": "revisions|images|categories",
            "rvprop": "content",
            "imlimit": "max",
            "cllimit": "max",
            "format": "json",
        }
        data = api_get(params, timeout=60)
        pages = data.get("query", {}).get("pages", {})
        for p in pages.values():
            out.append(p)
        time.sleep(0.16)
    return out


def fetch_file_urls(file_titles: list[str]) -> dict[str, str]:
    result: dict[str, str] = {}
    if not file_titles:
        return result
    for chunk in split_chunks(file_titles, 24):
        params = {
            "action": "query",
            "titles": "|".join(chunk),
            "prop": "imageinfo",
            "iiprop": "url",
            "format": "json",
        }
        data = api_get(params, timeout=60)
        pages = data.get("query", {}).get("pages", {})
        for p in pages.values():
            title = p.get("title")
            info = p.get("imageinfo", [])
            if title and info:
                result[title] = info[0].get("url", "")
        time.sleep(0.16)
    return result


def fetch_images_for_title(title: str) -> list[str]:
    params = {
        "action": "query",
        "titles": title,
        "prop": "images",
        "imlimit": "max",
        "format": "json",
    }
    data = api_get(params, timeout=60)
    pages = data.get("query", {}).get("pages", {})
    page = next(iter(pages.values()), {})
    return [it["title"] for it in page.get("images", []) if isinstance(it, dict) and "title" in it]


def fetch_parse_portrait_hints(title: str) -> tuple[list[str], list[str]]:
    params = {
        "action": "parse",
        "page": title,
        "prop": "text",
        "format": "json",
    }
    data = api_get(params, timeout=60)
    html = data.get("parse", {}).get("text", {}).get("*", "")
    if not html:
        return [], []

    file_titles = re.findall(r"文件:页面 宠物 立绘 [^\"']+?\\.png", html)
    urls = re.findall(r"https://patchwiki\\.biligame\\.com/images/rocom/[^\"'\\s>]+", html)

    # Prefer urls around portrait naming hints.
    portrait_urls = []
    if "页面 宠物 立绘" in html:
        # Pull local windows around each portrait file mention and capture urls in those windows.
        for m in re.finditer(r"文件:页面 宠物 立绘 [^\"']+?\\.png", html):
            s = max(0, m.start() - 1500)
            e = min(len(html), m.end() + 1500)
            part = html[s:e]
            portrait_urls.extend(re.findall(r"https://patchwiki\\.biligame\\.com/images/rocom/[^\"'\\s>]+", part))
    if not portrait_urls:
        portrait_urls = urls[:]

    # Dedup keep order
    def uniq(seq: list[str]) -> list[str]:
        seen = set()
        out = []
        for x in seq:
            if x in seen:
                continue
            seen.add(x)
            out.append(x)
        return out

    return uniq(file_titles), uniq(portrait_urls)


def search_file_titles(keyword: str) -> list[str]:
    if not keyword:
        return []
    params = {
        "action": "query",
        "list": "search",
        "srsearch": keyword,
        "srnamespace": "6",
        "srlimit": "50",
        "format": "json",
    }
    data = api_get(params, timeout=60)
    rows = data.get("query", {}).get("search", [])
    titles = [r.get("title", "") for r in rows if isinstance(r, dict) and r.get("title")]

    def score(name: str) -> tuple[int, int]:
        s = 0
        if "页面 宠物 立绘" in name:
            s += 100
        if "精灵 头像" in name:
            s += 70
        if "精灵 精灵蛋" in name:
            s += 45
        if "地图 点位" in name:
            s -= 20
        if "技能图标" in name or "图标 宠物 属性" in name:
            s -= 35
        if "异色" not in name:
            s += 10
        if name.endswith(".png"):
            s += 2
        return (s, -len(name))

    titles = sorted(set(titles), key=score, reverse=True)
    return titles


def ensure_ext(url: str) -> str:
    path = urllib.parse.urlparse(url).path.lower()
    _, ext = os.path.splitext(path)
    if ext in {".png", ".jpg", ".jpeg", ".webp", ".gif"}:
        return ext
    return ".png"


def download_file(url: str, target: Path) -> bool:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "roco-spirit-pack-builder/1.0"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
        target.write_bytes(data)
        return True
    except Exception:
        return False


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=None, help="debug: limit spirit pages")
    parser.add_argument("--no-download", action="store_true", help="skip image downloads")
    args = parser.parse_args()

    root = Path(__file__).resolve().parent.parent
    data_out = root / "assets" / "data" / "spirits.full.json"
    image_dir = root / "assets" / "spirits_full"
    image_dir.mkdir(parents=True, exist_ok=True)

    print("[1/5] Fetch category titles...")
    titles = fetch_category_titles(limit=args.limit)
    print(f"  titles: {len(titles)}")

    print("[2/5] Fetch page payloads...")
    pages = fetch_pages_payload(titles)
    print(f"  page payloads: {len(pages)}")

    spirit_rows: list[dict[str, Any]] = []
    all_selected_files: list[str] = []

    for p in pages:
        if p.get("ns") != 0:
            continue
        pageid = p.get("pageid")
        title = p.get("title", "")
        if not pageid or not title:
            continue

        rev = (p.get("revisions") or [{}])[0]
        wikitext = rev.get("*") or rev.get("slots", {}).get("main", {}).get("*") or ""
        info = parse_infobox(wikitext)

        spirit_name = clean_text(info.get("精灵名称", "")) or title
        form = clean_text(info.get("精灵形态", "")) or clean_text(info.get("地区形态名称", "")) or "基础形态"
        number = clean_text(info.get("图鉴编号", "")) or f"NO.{pageid}"
        category = clean_text(info.get("精灵类型", "")) or "精灵"
        distribution = clean_text(info.get("分布地区", ""))
        summary = clean_text(info.get("精灵描述", ""))
        types = infer_types(info)

        series = infer_series(spirit_name, form, category)
        popularity = infer_popularity(spirit_name, series)
        is_hidden = series.startswith("隐藏")
        is_hot = popularity >= 86 or spirit_name in HOT_NAMES

        weights = compute_weights(info, types, spirit_name)

        image_titles = [it["title"] for it in p.get("images", []) if isinstance(it, dict) and "title" in it]
        direct_url_candidates: list[str] = []
        if not image_titles:
            image_titles = fetch_images_for_title(title)
        portrait_file = choose_portrait_file(image_titles, spirit_name)
        if not portrait_file:
            parse_files, parse_urls = fetch_parse_portrait_hints(title)
            if parse_files:
                portrait_file = choose_portrait_file(parse_files, spirit_name)
                image_titles.extend(parse_files)
            direct_url_candidates = parse_urls
        searched_files: list[str] = []
        if not portrait_file:
            searched_files = search_file_titles(spirit_name)
            if not searched_files and spirit_name != title:
                searched_files = search_file_titles(title)
            if searched_files:
                portrait_file = choose_portrait_file(searched_files, spirit_name)
        file_candidates = []
        if portrait_file:
            all_selected_files.append(portrait_file)
        else:
            file_candidates = guess_portrait_candidates(title, spirit_name)
            all_selected_files.extend(file_candidates)
        if searched_files:
            all_selected_files.extend(searched_files[:8])

        row = {
            "id": f"spirit_{pageid}",
            "title": spirit_name,
            "form": form,
            "number": number,
            "types": types,
            "category": category,
            "distribution": distribution,
            "wiki_summary": summary,
            "quiz_pitch": f"你像{spirit_name}，有鲜明气质和稳定发挥。",
            "image": "",
            "image_source": "",
            "image_file_title": portrait_file or "",
            "image_file_candidates": file_candidates,
            "image_url_candidates": direct_url_candidates,
            "search_file_candidates": searched_files[:8],
            "page": WIKI_PAGE_BASE + urllib.parse.quote(title),
            "weights": weights,
            "tags": [series.replace("隐藏·", ""), "官方图鉴"],
            "series": series,
            "popularity": popularity,
            "is_hot": is_hot,
            "is_hidden": is_hidden,
            "source": {
                "provider": "BWIKI 洛克王国:手游WIKI",
                "api": API_BASE,
                "page_title": title,
                "fetched_at": int(time.time()),
            },
        }
        spirit_rows.append(row)

    print("[3/5] Resolve image URLs...")
    file_urls = fetch_file_urls(sorted(set(all_selected_files)))
    print(f"  image files resolved: {len(file_urls)}")

    print("[4/5] Download images...")
    ok = 0
    miss = 0
    for row in spirit_rows:
        file_title = row.get("image_file_title")
        if not file_title:
            for cand in row.get("image_file_candidates", []):
                if cand in file_urls:
                    file_title = cand
                    break
        url = file_urls.get(file_title, "") if file_title else ""
        if not url:
            for u in row.get("image_url_candidates", []):
                if u.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
                    url = u
                    break
        if not url:
            for cand in row.get("search_file_candidates", []):
                url = file_urls.get(cand, "")
                if url:
                    file_title = cand
                    break
        row["image_source"] = url

        if not url:
            miss += 1
            continue

        ext = ensure_ext(url)
        rel = f"assets/spirits_full/{row['id']}{ext}"
        target = root / rel

        if not args.no_download:
            if not target.exists():
                ok_download = download_file(url, target)
                if not ok_download:
                    miss += 1
                    continue
                time.sleep(0.04)
            ok += 1

        row["image"] = rel
        row["image_file_title"] = file_title or row.get("image_file_title", "")

    print(f"  images ready: {ok}, missing: {miss}")

    # Keep deterministic order
    spirit_rows.sort(key=lambda x: x["title"])
    for row in spirit_rows:
        row.pop("image_file_candidates", None)
        row.pop("image_url_candidates", None)
        row.pop("search_file_candidates", None)

    print("[5/5] Write JSON...")
    data_out.write_text(json.dumps(spirit_rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"  wrote: {data_out}")
    print(f"  total rows: {len(spirit_rows)}")


if __name__ == "__main__":
    main()
