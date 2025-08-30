
# 🎵 Daily Doze Of AZKi

A modern web music player and mood-based song recommender inspired by **AZKi**, featuring dynamic audio playback, mood analysis, and a clean, responsive UI.  
Developed with the assistance of **IBM Granite AI** for advanced code generation and intelligent recommendation logic.

---

## 🌟 Features

- **Song of the Day** – Highlighted track with cover & description  
- **Mood Recommender** – Input your mood (English / Bahasa Indonesia, e.g. *“sedih”*, *“bahagia”*) to get personalized AZKi song recommendations  
- **Audio Player** – Spotify-like player with cover art, title, and playback controls  
- **Responsive UI** – Optimized for both desktop and mobile  
- **Offline-Friendly** – All songs and covers served locally for fast access  

---

## ✨ Why This Project?

Unlike generic music players, **Daily Doze Of AZKi** uses a mood-based recommendation engine.  
Simply type your mood (e.g. *“galau”*, *“semangat”*, *“nostalgia”*) and instantly get song suggestions powered by a custom algorithm developed with **IBM Granite AI**.

---

## 🧠 IBM Granite AI Contribution

### Mood Recommender (Granite-Powered)

Granite AI enabled the development of:  
- **Natural Language Mood Matching** – Supports both English and Bahasa Indonesia  
- **Dynamic Song Scoring** – Songs tagged with multiple moods and ranked based on user input  
- **Maintainable Code** – Clean, efficient, and easy to extend  

---

### 📝 Example Code

```tsx
const getFallbackRecommendations = (mood: string): string => {
  const moodKeywords = mood.toLowerCase().split(' ');
  const scoredSongs = azkiSongs.map(song => {
    let score = 0;
    moodKeywords.forEach(keyword => {
      if (song.mood.some(m => m.includes(keyword))) score += 2;
      if (song.description.toLowerCase().includes(keyword)) score += 1;
      if (song.title.toLowerCase().includes(keyword)) score += 1;
    });
    return { ...song, score };
  });
  const topSongs = scoredSongs.filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  if (!topSongs.length) return `Maaf, tidak ada rekomendasi untuk mood "${mood}".`;
  
  let recText = `Berdasarkan mood "${mood}", saya merekomendasikan:\n\n`;
  topSongs.forEach((s, i) => { recText += `${i + 1}. ${s.title} - ${s.description}\n`; });
  return recText;
};

````

---

## 🚀 Setup Instructions

### Prerequisites

* Node.js 18+
* npm / yarn

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/daily-doze-of-azki.git
cd daily-doze-of-azki

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 📁 Project Structure

```
├── public/
│   └── assets/
│       ├── images/   # Song covers
│       └── songs/    # Audio files (.flac)
├── src/
│   ├── components/   # Navbar, PlayerBar, etc.
│   ├── pages/        # Dashboard, MoodRecommender, About, Playlist
│   └── App.tsx
└── README.md
```

---

## 🛠️ Tech Stack

* **React 18 (Vite)**
* **TypeScript**
* **CSS3** (custom, no framework)
* **IBM Granite AI** (for code generation & recommender logic)

---

## 🤖 AI Support

With IBM Granite AI, this project achieved:

* Rapid prototyping of mood recommender logic
* Clean, idiomatic, maintainable codebase
* Multi-language mood keyword support (EN & ID)
* Efficient scoring & ranking algorithms

---

## 🙏 Acknowledgements

* **IBM Granite AI** – For AI-assisted recommender & code generation
* **AZKi** – Musical inspiration & song catalog
* **Open Source Community** – Tools & libraries that made this project possible


