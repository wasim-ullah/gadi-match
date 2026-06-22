#!/usr/bin/env python3
import os

SITE_URL = "https://gadi-match.vercel.app"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "share")

ARCHETYPES = [
    {"slug": "desert-king", "icon": "rugged", "name": "The Desert King", "car": "Toyota Land Cruiser", "tagline": "Built for dunes, not driveways."},
    {"slug": "weekend-warrior", "icon": "speed-rugged", "name": "The Weekend Warrior", "car": "Ford Raptor", "tagline": "Monday to Friday: normal. Saturday: send it."},
    {"slug": "practical-one", "icon": "practical-rugged", "name": "The Practical One", "car": "Nissan Patrol", "tagline": "Big enough for the family, tough enough for the desert."},
    {"slug": "old-reliable", "icon": "practical", "name": "The Old Reliable", "car": "Toyota Camry", "tagline": "Never the loudest. Always the one that starts."},
    {"slug": "smooth-operator", "icon": "luxury-speed", "name": "The Smooth Operator", "car": "BMW 5 Series", "tagline": "Confidence at 120, calm at a red light."},
    {"slug": "show-stopper", "icon": "luxury-rugged", "name": "The Show Stopper", "car": "Mercedes G-Wagon", "tagline": "Subtle was never the plan."},
    {"slug": "quiet-flex", "icon": "luxury-practical", "name": "The Quiet Flex", "car": "Lexus LX", "tagline": "Whisper quiet. Impossible to ignore."},
    {"slug": "city-hustler", "icon": "speed", "name": "The City Hustler", "car": "Honda Civic Type R", "tagline": "Small footprint. Big appetite for speed."},
]

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>{name} — Gadi Match</title>
<meta name="description" content="My Gadi Match result: {name} ({car}). Take the quiz to find your own car archetype.">

<meta property="og:title" content="I got {name} on Gadi Match">
<meta property="og:description" content="{tagline} Take the quiz to find your own car archetype.">
<meta property="og:type" content="website">
<meta property="og:image" content="{site_url}/og/{slug}.jpg">
<meta property="og:url" content="{site_url}/share/{slug}.html">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="I got {name} on Gadi Match">
<meta name="twitter:description" content="{tagline} Take the quiz to find your own car archetype.">
<meta name="twitter:image" content="{site_url}/og/{slug}.jpg">

<link rel="stylesheet" href="../styles.css">
</head>
<body>

<div id="app">
  <section class="screen active">
    <div class="result-inner">
      <p class="result-label">Quiz result</p>
      <div class="wordmark" style="font-size: clamp(1.4rem, 6vw, 1.8rem);">GADI<span class="accent">MATCH</span></div>

      <div class="share-page-card">
        <h2 class="result-name">{name} — {car}</h2>
        <p class="result-tagline">{tagline}</p>
      </div>

      <p class="result-desc">Take the 60-second quiz to find out which car archetype matches your personality.</p>

      <div class="result-actions">
        <a href="../index.html" class="btn-primary" style="text-decoration:none; text-align:center; display:inline-block;">Take the Quiz</a>
      </div>
    </div>
  </section>
</div>

</body>
</html>
"""


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for item in ARCHETYPES:
        html = TEMPLATE.format(site_url=SITE_URL, **item)
        path = os.path.join(OUT_DIR, item["slug"] + ".html")
        with open(path, "w") as f:
            f.write(html)
        print("wrote", path)


if __name__ == "__main__":
    main()
