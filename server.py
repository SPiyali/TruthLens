from flask import Flask, request, jsonify
import re
from textblob import TextBlob

app = Flask(__name__)
https://github.com/SPiyali/TruthLens
# Simple NLP analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.json.get('text', '')
    
    # Sentiment analysis
    analysis = TextBlob(text)
    sentiment = analysis.sentiment.polarity  # -1 to 1
    
    # Count suspicious terms
    suspicious_terms = ['fake', 'hoax', 'conspiracy', 'cover-up']
    found_terms = [term for term in suspicious_terms if term.lower() in text.lower()]
    
    # Simple credibility score (0-100)
    credibility = max(0, min(100, 50 + (sentiment * 20) - (len(found_terms) * 5)))
    
    return jsonify({
        'credibility': round(credibility),
        'biased_terms': found_terms,
        'sentiment': 'positive' if sentiment > 0 else 'negative' if sentiment < 0 else 'neutral'
    })

if __name__ == '__main__':
    app.run(debug=True)