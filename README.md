# 📰 TruthLens – Fake News Detector Chrome Extension

TruthLens is a Chrome Extension that uses simple NLP techniques to detect potentially **fake or biased news content**. It allows users to analyze online articles, highlight suspicious words, and take part in crowd-sourced truth verification.

---

## 🚀 Features

- 🔍 Highlights biased and suspicious words in articles
- 🧠 Uses Natural Language Processing (NLP) to score bias
- 🗳️ Community voting for verifying article reliability
- ⚡ Chrome Extension with smooth popup UI
- 🐍 Backend powered by Flask (Python)

---

## 🛠️ Tech Stack

| Component   | Technology        |
|-------------|-------------------|
| Frontend    | HTML, CSS, JavaScript |
| Backend     | Python (Flask)     |
| NLP         | TextBlob (or custom logic) |
| Extension   | Chrome Extension APIs |
| Database    | (Optional for user votes) |

---

## 🧪 How to Use

### 🔧 Install the Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the project folder

### 🚀 Run the Python Server
```bash
pip install flask
python server.py
