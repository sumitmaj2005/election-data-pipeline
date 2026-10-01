import pandas as pd
import time
from ntscraper import Nitter

scraper = Nitter()

hashtags = [
    "Modi", "BJP", "RahulGandhi", 
    "Congress", "AAP", "Kejriwal", "LokSabha"
]

all_tweets = []

for tag in hashtags:
    print(f"Scraping #{tag}...")
    try:
        # English tweets
        results = scraper.get_tweets(tag, mode='hashtag', number=500, language='en')
        tweets = results.get('tweets', [])
        for t in tweets:
            all_tweets.append({
                'text': t.get('text', ''),
                'hashtag': tag,
                'language': 'en',
                'date': t.get('date', ''),
                'likes': t.get('likes', 0),
                'retweets': t.get('retweets', 0)
            })
        print(f"  Got {len(tweets)} English tweets")
        time.sleep(5)

        # Hindi tweets
        results_hi = scraper.get_tweets(tag, mode='hashtag', number=500, language='hi')
        tweets_hi = results_hi.get('tweets', [])
        for t in tweets_hi:
            all_tweets.append({
                'text': t.get('text', ''),
                'hashtag': tag,
                'language': 'hi',
                'date': t.get('date', ''),
                'likes': t.get('likes', 0),
                'retweets': t.get('retweets', 0)
            })
        print(f"  Got {len(tweets_hi)} Hindi tweets")
        time.sleep(5)

    except Exception as e:
        print(f"  Error on #{tag}: {e}")
        time.sleep(30)

# Save to CSV
df = pd.DataFrame(all_tweets)
df.drop_duplicates(subset='text', inplace=True)
df.to_csv('indian_political_tweets.csv', index=False, encoding='utf-8-sig')

print(f"\nDone! Total unique tweets: {len(df)}")
print("Saved to: indian_political_tweets.csv")