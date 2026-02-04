#!/usr/bin/env python3
"""
Weekly Twitter Insights Synthesis
Aggregates bookmark catalog data and produces a weekly insights report.

Usage: python3 scripts/weekly-twitter-synthesis.py [--output reports/weekly-YYYY-MM-DD.md]
"""

import json
import argparse
from datetime import datetime, timedelta
from pathlib import Path
from collections import defaultdict
import re

# Configuration
CATALOG_PATH = Path.home() / "clawd/state/bookmarks-catalog.json"
REPORTS_DIR = Path.home() / "clawd/reports"
MEMORY_DIR = Path.home() / "clawd/memory"

# Theme keywords for categorization
THEMES = {
    "🤖 AI Agents": ["agent", "swarm", "orchestrat", "moltbot", "openclaw", "clawdbot", "autonomous"],
    "🧠 LLM Engineering": ["prompt", "context", "rag", "embedding", "token", "fine-tun", "training"],
    "🔒 Security": ["rce", "vulnerability", "exploit", "security", "jailbreak", "injection"],
    "🛠️ Tools & Frameworks": ["cli", "sdk", "api", "framework", "library", "tool", "mcp"],
    "💡 Techniques": ["technique", "pattern", "workflow", "method", "approach", "protocol"],
    "📊 Data & Research": ["research", "paper", "study", "benchmark", "dataset"],
    "💼 Business & Strategy": ["startup", "business", "market", "revenue", "product", "gtm"],
    "🎯 Productivity": ["productivity", "workflow", "automate", "efficiency"],
}


def load_catalog():
    """Load the bookmarks catalog."""
    if not CATALOG_PATH.exists():
        print(f"Error: Catalog not found at {CATALOG_PATH}")
        return None
    
    with open(CATALOG_PATH) as f:
        return json.load(f)


def filter_week_bookmarks(catalog, days=7):
    """Filter bookmarks from the past N days."""
    cutoff = datetime.now() - timedelta(days=days)
    week_bookmarks = []
    
    for bm_id, bm in catalog.get("bookmarks", {}).items():
        first_seen = bm.get("firstSeen", "")
        if first_seen:
            try:
                seen_date = datetime.fromisoformat(first_seen.replace("Z", "+00:00"))
                if seen_date.replace(tzinfo=None) >= cutoff:
                    week_bookmarks.append({
                        "id": bm_id,
                        **bm
                    })
            except ValueError:
                continue
    
    return week_bookmarks


def categorize_bookmarks(bookmarks):
    """Categorize bookmarks by theme based on content."""
    categorized = defaultdict(list)
    
    for bm in bookmarks:
        summary = bm.get("summary", "").lower()
        author = bm.get("author", "")
        content_type = bm.get("contentType", "")
        
        # Match to themes
        matched = False
        for theme, keywords in THEMES.items():
            if any(kw in summary for kw in keywords):
                categorized[theme].append(bm)
                matched = True
                break  # Only first match
        
        if not matched:
            categorized["📌 Other"].append(bm)
    
    return dict(categorized)


def get_author_stats(bookmarks):
    """Get statistics on bookmarked authors."""
    author_counts = defaultdict(int)
    for bm in bookmarks:
        author = bm.get("author", "unknown")
        author_counts[author] += 1
    
    # Sort by count
    return sorted(author_counts.items(), key=lambda x: x[1], reverse=True)


def identify_trends(bookmarks):
    """Identify trending topics from bookmarks."""
    # Simple word frequency analysis
    all_words = []
    for bm in bookmarks:
        summary = bm.get("summary", "")
        # Extract meaningful words
        words = re.findall(r'\b[a-zA-Z]{4,}\b', summary.lower())
        all_words.extend(words)
    
    # Count frequencies
    word_freq = defaultdict(int)
    stopwords = {'that', 'this', 'with', 'from', 'about', 'what', 'just', 'more', 'have', 'been', 'very', 'like', 'will', 'your', 'some', 'than', 'when', 'into', 'only', 'also', 'most', 'make', 'made'}
    
    for word in all_words:
        if word not in stopwords:
            word_freq[word] += 1
    
    # Top 15 trending words
    return sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:15]


def generate_report(bookmarks, output_path):
    """Generate the weekly insights report."""
    categorized = categorize_bookmarks(bookmarks)
    authors = get_author_stats(bookmarks)
    trends = identify_trends(bookmarks)
    
    today = datetime.now()
    week_start = today - timedelta(days=7)
    
    report = []
    report.append(f"# 🦞 Weekly Twitter Insights")
    report.append(f"**{week_start.strftime('%b %d')} - {today.strftime('%b %d, %Y')}**\n")
    report.append(f"*Generated: {today.strftime('%Y-%m-%d %H:%M')} MST*\n")
    report.append("---\n")
    
    # Executive Summary
    report.append("## 📊 Executive Summary\n")
    report.append(f"- **Total Bookmarks This Week:** {len(bookmarks)}")
    report.append(f"- **Unique Authors:** {len(authors)}")
    report.append(f"- **Top Theme:** {max(categorized.items(), key=lambda x: len(x[1]))[0] if categorized else 'N/A'}")
    report.append(f"- **Most Bookmarked Author:** @{authors[0][0]} ({authors[0][1]} bookmarks)" if authors else "")
    report.append("")
    
    # Trending Topics
    report.append("## 🔥 Trending Topics\n")
    report.append("| Rank | Topic | Mentions |")
    report.append("|------|-------|----------|")
    for i, (word, count) in enumerate(trends[:10], 1):
        report.append(f"| {i} | {word} | {count} |")
    report.append("")
    
    # Top Authors
    report.append("## 👤 Top Voices This Week\n")
    report.append("| Author | Bookmarks |")
    report.append("|--------|-----------|")
    for author, count in authors[:10]:
        report.append(f"| @{author} | {count} |")
    report.append("")
    
    # By Theme
    report.append("## 📂 Insights by Theme\n")
    for theme, bms in sorted(categorized.items(), key=lambda x: len(x[1]), reverse=True):
        report.append(f"### {theme} ({len(bms)} bookmarks)\n")
        for bm in bms[:5]:  # Top 5 per theme
            author = bm.get("author", "unknown")
            summary = bm.get("summary", "No summary")
            report.append(f"- **@{author}**: {summary[:200]}{'...' if len(summary) > 200 else ''}")
        if len(bms) > 5:
            report.append(f"- *...and {len(bms) - 5} more*")
        report.append("")
    
    # Actionable Insights
    report.append("## ⚡ Key Takeaways & Actions\n")
    report.append("*Based on patterns observed this week:*\n")
    
    # Auto-generate some insights based on themes
    if categorized.get("🤖 AI Agents"):
        report.append(f"- **AI Agents** continue to dominate ({len(categorized.get('🤖 AI Agents', []))} bookmarks) — multi-agent orchestration is the hot topic")
    if categorized.get("🔒 Security"):
        report.append(f"- **Security concerns** emerging ({len(categorized.get('🔒 Security', []))} bookmarks) — review for relevant vulnerabilities")
    if categorized.get("🛠️ Tools & Frameworks"):
        report.append(f"- **New tools** to evaluate ({len(categorized.get('🛠️ Tools & Frameworks', []))} bookmarks) — schedule time for hands-on testing")
    
    report.append("")
    report.append("---")
    report.append("*Generated by Claw 🦞 — Weekly Twitter Intelligence*")
    
    # Write report
    content = "\n".join(report)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content)
    
    return content


def main():
    parser = argparse.ArgumentParser(description="Generate weekly Twitter insights report")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--days", "-d", type=int, default=7, help="Days to include (default: 7)")
    args = parser.parse_args()
    
    # Load catalog
    catalog = load_catalog()
    if not catalog:
        return 1
    
    # Filter to this week
    bookmarks = filter_week_bookmarks(catalog, days=args.days)
    print(f"Found {len(bookmarks)} bookmarks from the past {args.days} days")
    
    if not bookmarks:
        print("No bookmarks in the specified period. Try --days 14 for more data.")
        return 1
    
    # Generate output path
    today = datetime.now().strftime("%Y-%m-%d")
    output_path = Path(args.output) if args.output else REPORTS_DIR / f"weekly-insights-{today}.md"
    
    # Generate report
    content = generate_report(bookmarks, output_path)
    print(f"\nReport saved to: {output_path}")
    print(f"\n{'='*60}\n")
    print(content)
    
    return 0


if __name__ == "__main__":
    exit(main())
