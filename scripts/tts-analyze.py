#!/usr/bin/env python3
"""
Analyze text content and output optimal TTS generation parameters.
Fast heuristic-based analysis (no LLM calls).

Usage: python tts-analyze.py "Your text here"
Output: JSON with temp, top_p, top_k, rep values
"""

import sys
import json
import re

def analyze_text(text: str) -> dict:
    """Analyze text and return optimal TTS parameters."""
    
    text_lower = text.lower()
    word_count = len(text.split())
    
    # Start with defaults
    temp = 1.0
    top_p = 0.9
    top_k = 50
    rep = 1.0
    mood = "neutral"
    
    # === MOOD DETECTION ===
    
    # Romantic/Loving
    love_words = ['love', 'heart', 'darling', 'sweetheart', 'miss you', 'adore', 
                  'beautiful', 'handsome', 'gorgeous', 'kiss', 'hug', 'romantic']
    love_score = sum(1 for w in love_words if w in text_lower)
    
    # Funny/Playful
    funny_words = ['haha', 'lol', 'funny', 'silly', 'ridiculous', 'hilarious',
                   'joke', 'weird', 'crazy', 'lmao', '😂', '🤣', 'sleepy', 'sleepiest']
    funny_score = sum(1 for w in funny_words if w in text_lower)
    
    # Dramatic/Intense
    dramatic_words = ['never', 'always', 'forever', 'death', 'war', 'destroy',
                      'incredible', 'amazing', 'unbelievable', 'epic', 'legendary',
                      'fire', 'blood', 'battle', 'victory', 'defeat', 'rage']
    dramatic_score = sum(1 for w in dramatic_words if w in text_lower)
    
    # Serious/Professional  
    serious_words = ['therefore', 'however', 'analysis', 'report', 'conclusion',
                     'recommend', 'strategy', 'business', 'financial', 'pursuant',
                     'regarding', 'furthermore', 'quarterly', 'revenue', 'metrics']
    serious_score = sum(1 for w in serious_words if w in text_lower)
    
    # Sad/Emotional
    sad_words = ['sad', 'sorry', 'miss', 'lost', 'gone', 'cry', 'tears',
                 'regret', 'wish', 'painful', 'hurt', 'broken', 'alone']
    sad_score = sum(1 for w in sad_words if w in text_lower)
    
    # Excited/Energetic
    excited_words = ['excited', 'amazing', 'awesome', 'incredible', 'wow', 
                     'yes!', 'let\'s go', 'can\'t wait', '!', 'finally', 'huge']
    excited_score = sum(1 for w in excited_words if w in text_lower)
    excited_score += text.count('!') * 0.5  # Exclamation marks add energy
    
    # Angry/Frustrated
    angry_words = ['pissed', 'angry', 'furious', 'annoyed', 'frustrated', 'mad',
                   'hate', 'sick of', 'tired of', 'damn', 'hell', 'bullshit',
                   'ridiculous', 'stupid', 'idiot', 'wtf', 'pisses me off']
    angry_score = sum(1 for w in angry_words if w in text_lower)
    
    # Questions (usually need slight variation)
    question_marks = text.count('?')
    
    # === APPLY SETTINGS ===
    
    scores = {
        'love': love_score,
        'funny': funny_score,
        'dramatic': dramatic_score,
        'serious': serious_score,
        'sad': sad_score,
        'excited': excited_score,
        'angry': angry_score,
    }
    
    # Find dominant mood
    max_mood = max(scores, key=scores.get)
    max_score = scores[max_mood]
    
    if max_score >= 2:
        mood = max_mood
    elif max_score >= 1:
        mood = f"slightly_{max_mood}"
    
    # Adjust parameters based on mood
    if 'love' in mood:
        temp = 1.15  # Warm, expressive
        top_p = 0.92
        
    elif 'funny' in mood:
        temp = 1.25  # Playful, varied
        top_p = 0.93
        
    elif 'dramatic' in mood:
        temp = 1.2  # Bold, expressive
        top_p = 0.88  # But focused
        
    elif 'serious' in mood:
        temp = 0.85  # Consistent, professional
        top_p = 0.85
        top_k = 40
        
    elif 'sad' in mood:
        temp = 0.95  # Subdued but emotional
        top_p = 0.88
        
    elif 'excited' in mood:
        temp = 1.3  # High energy
        top_p = 0.92
        
    elif 'angry' in mood:
        temp = 1.2  # Edgy, intense
        top_p = 0.85  # More focused/punchy
        top_k = 40
    
    # === LENGTH ADJUSTMENTS ===
    
    # Longer text needs more repetition control
    if word_count > 50:
        rep = 1.1
    if word_count > 100:
        rep = 1.15
    if word_count > 200:
        rep = 1.2
    
    # Questions benefit from slight variation
    if question_marks > 0:
        temp = min(temp + 0.05, 1.3)
    
    # All caps = EMPHASIS (more expressive)
    caps_ratio = sum(1 for c in text if c.isupper()) / max(len(text), 1)
    if caps_ratio > 0.3:
        temp = min(temp + 0.1, 1.35)
    
    return {
        'temperature': round(temp, 2),
        'top_p': round(top_p, 2),
        'top_k': top_k,
        'repetition_penalty': round(rep, 2),
        'detected_mood': mood,
        'word_count': word_count,
    }

def main():
    if len(sys.argv) < 2:
        print("Usage: python tts-analyze.py \"Text to analyze\"", file=sys.stderr)
        sys.exit(1)
    
    text = sys.argv[1]
    result = analyze_text(text)
    print(json.dumps(result))

if __name__ == "__main__":
    main()
