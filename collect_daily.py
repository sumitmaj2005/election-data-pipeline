"""Collect political posts from news RSS feeds and Reddit, clean them, and merge
them into data/tweets_real.csv (deduplicated, sorted newest first).

Run:
    python collect_daily.py

Reddit needs these environment variables (free app at reddit.com/prefs/apps):
    REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, (optional) REDDIT_USER_AGENT
Without them, only the news feeds are collected.
"""
import calendar
import hashlib
import html
import os
import re
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

OUTPUT = Path("data/tweets_real.csv")
COLUMNS = ["id", "text", "timestamp", "language", "language_label",
           "hashtags", "source", "url"]

# Feed URLs can change over time. A broken feed is skipped with a message.
FEEDS = {
    "TheHindu": "https://www.thehindu.com/news/national/feeder/default.rss",
    "NDTV": "https://feeds.feedburner.com/ndtvnews-india-news",
    "HindustanTimes": "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
    "TimesOfIndia": "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
    "IndianExpress": "https://indianexpress.com/section/india/feed/",
}
SUBREDDITS = ["india", "IndiaSpeaks", "unitedstatesofindia"]
POSTS_PER_SUBREDDIT = 100

MIN_LEN = 20
MAX_LEN = 1000

LATIN_KEYWORDS = [
    "election", "elections", "vote", "voter", "voters", "voting", "poll", "polls",
    "lok sabha", "rajya sabha", "parliament", "bjp", "congress", "aap", "tmc",
    "modi", "rahul gandhi", "kejriwal", "mamata", "amit shah", "nda", "india alliance",
    "opposition", "government", "minister", "campaign", "manifesto", "eci", "evm",
]
HINDI_KEYWORDS = ["चुनाव", "मोदी", "भाजपा", "कांग्रेस", "राहुल", "लोकसभा", "मतदान", "सरकार"]
LATIN_RE = re.compile(r"\b(?:%s)\b" % "|".join(re.escape(k) for k in LATIN_KEYWORDS),
                      re.IGNORECASE)
HINDI_RE = re.compile("|".join(HINDI_KEYWORDS))

LANG_LABELS = {
    "en": "English", "hi": "Hindi", "bn": "Bengali", "ta": "Tamil", "te": "Telugu",
    "mr": "Marathi", "ur": "Urdu", "gu": "Gujarati", "kn": "Kannada",
    "ml": "Malayalam", "pa": "Punjabi",
}


# ---------------------------------------------------------------- collection
def fetch_news() -> list:
    import feedparser

    records = []
    for name, url in FEEDS.items():
        try:
            feed = feedparser.parse(url)
        except Exception as e:
            print(f"[news] {name}: failed ({e})")
            continue
        if not feed.entries:
            print(f"[news] {name}: no entries (feed may have moved)")
            continue
        for e in feed.entries:
            parsed = e.get("published_parsed") or e.get("updated_parsed")
            when = (datetime.fromtimestamp(calendar.timegm(parsed), tz=timezone.utc)
                    if parsed else datetime.now(timezone.utc))
            records.append({
                "text": f"{e.get('title', '')}. {e.get('summary', '')}",
                "timestamp": when,
                "source": name,
                "url": e.get("link", ""),
            })
        print(f"[news] {name}: {len(feed.entries)} entries")
    return records


def fetch_reddit() -> list:
    client_id = os.getenv("REDDIT_CLIENT_ID")
    secret = os.getenv("REDDIT_CLIENT_SECRET")
    if not (client_id and secret):
        print("[reddit] credentials not set, skipping Reddit")
        return []

    import praw

    reddit = praw.Reddit(
        client_id=client_id,
        client_secret=secret,
        user_agent=os.getenv("REDDIT_USER_AGENT", "election-data-pipeline/1.0"),
    )
    records = []
    for sub in SUBREDDITS:
        try:
            count = 0
            for post in reddit.subreddit(sub).new(limit=POSTS_PER_SUBREDDIT):
                records.append({
                    "text": f"{post.title}. {post.selftext or ''}",
                    "timestamp": datetime.fromtimestamp(post.created_utc, tz=timezone.utc),
                    "source": f"Reddit/r/{sub}",
                    "url": f"https://www.reddit.com{post.permalink}",
                })
                count += 1
            print(f"[reddit] r/{sub}: {count} posts")
        except Exception as e:
            print(f"[reddit] r/{sub}: failed ({e})")
    return records


# ------------------------------------------------------------------ cleaning
def clean_text(text: str) -> str:
    text = html.unescape(str(text))
    text = re.sub(r"<[^>]+>", " ", text)          # strip HTML tags from RSS summaries
    text = re.sub(r"https?://\S+", "", text)      # remove URLs
    text = re.sub(r"\s+", " ", text).strip()
    return text[:MAX_LEN]


def is_relevant(text: str) -> bool:
    return bool(LATIN_RE.search(text) or HINDI_RE.search(text))


def detect_language(text: str) -> str:
    from langdetect import DetectorFactory, detect

    DetectorFactory.seed = 0
    try:
        return detect(text)
    except Exception:
        return "unknown"


def build_frame(records: list) -> pd.DataFrame:
    rows = []
    for r in records:
        text = clean_text(r["text"])
        if len(text) < MIN_LEN or text.startswith("RT ") or not is_relevant(text):
            continue
        lang = detect_language(text)
        rows.append({
            "id": hashlib.sha1((r["url"] or text).encode("utf-8")).hexdigest()[:16],
            "text": text,
            "timestamp": r["timestamp"],
            "language": lang,
            "language_label": LANG_LABELS.get(lang, lang),
            "hashtags": "|".join(re.findall(r"#(\w+)", text)),
            "source": r["source"],
            "url": r["url"],
        })
    return pd.DataFrame(rows, columns=COLUMNS)


# ------------------------------------------------------------- merge + sort
def text_key(text: str) -> str:
    return re.sub(r"\W+", " ", str(text).lower()).strip()


def merge_and_save(new: pd.DataFrame, path: Path = OUTPUT) -> pd.DataFrame:
    if path.exists():
        old = pd.read_csv(path)
        for col in COLUMNS:
            if col not in old.columns:
                old[col] = ""
        old = old[COLUMNS]
    else:
        old = pd.DataFrame(columns=COLUMNS)

    both = pd.concat([old, new], ignore_index=True)
    both["timestamp"] = pd.to_datetime(both["timestamp"], format="mixed",
                                       errors="coerce", utc=True)
    both["url"] = both["url"].fillna("")

    # Old rows come first, so they win when a duplicate is found.
    both["_key"] = both["text"].map(text_key)
    both = both.drop_duplicates(subset="_key", keep="first")
    has_url = both["url"].ne("")
    both = pd.concat([both[has_url].drop_duplicates(subset="url", keep="first"),
                      both[~has_url]])

    both = both.sort_values("timestamp", ascending=False, na_position="last")
    both["timestamp"] = both["timestamp"].dt.strftime("%Y-%m-%d %H:%M:%S").fillna("")
    both = both[COLUMNS].reset_index(drop=True)

    path.parent.mkdir(parents=True, exist_ok=True)
    both.to_csv(path, index=False)
    return both


def main() -> None:
    records = fetch_news() + fetch_reddit()
    print(f"Collected {len(records)} raw items")

    new = build_frame(records)
    print(f"{len(new)} items kept after cleaning and relevance filter")

    before = len(pd.read_csv(OUTPUT)) if OUTPUT.exists() else 0
    final = merge_and_save(new)
    print(f"Added {len(final) - before} new rows. Total rows: {len(final)}")


if __name__ == "__main__":
    main()
