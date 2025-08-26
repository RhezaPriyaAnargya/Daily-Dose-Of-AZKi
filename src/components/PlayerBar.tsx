// PlayerBar.tsx
import React from 'react';

const PlayerBar: React.FC = () => {
  const song = {
    title: 'Inochi 2024 Ver',
    artist: 'AZKi',
    cover: '/assets/images/inochi_2024.jpg',
    current: '2:45',
    duration: '3:27',
    progress: 165 / 207 // progress (2:45/3:27)
  };

  return (
    <footer className="player-bar">
      <div className="player-bar__container">
        {/* LEFT SIDE */}
        <div className="player-bar__left">
          <img src={song.cover} alt={song.title} className="player-bar__cover" />
          <div className="player-bar__info">
            <div className="player-bar__title">{song.title}</div>
            <div className="player-bar__artist">{song.artist}</div>
          </div>
        </div>

        {/* CENTER CONTROLS */}
        <div className="player-bar__center">
          <button className="player-bar__icon-btn" aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 12L17 6V18L7 12Z" fill="#fff" />
              <rect x="5" y="6" width="2" height="12" rx="1" fill="#fff" />
            </svg>
          </button>

          <button className="player-bar__icon-btn player-bar__icon-btn--main" aria-label="Pause">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#FA3689" />
              <rect x="9" y="8" width="2.5" height="8" rx="1" fill="#fff" />
              <rect x="12.5" y="8" width="2.5" height="8" rx="1" fill="#fff" />
            </svg>
          </button>

          <button className="player-bar__icon-btn" aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 12L7 18V6L17 12Z" fill="#fff" />
              <rect x="17" y="6" width="2" height="12" rx="1" fill="#fff" />
            </svg>
          </button>
        </div>

        {/* RIGHT SIDE - Timer */}
        <div className="player-bar__right">
          <span className="player-bar__time">{song.current}</span>
          <span className="player-bar__time-separator">/</span>
          <span className="player-bar__time">{song.duration}</span>
        </div>
      </div>
      
      {/* Progress Bar - Now positioned at the bottom */}
      <div className="player-bar__progress-container">
        <div className="player-bar__progress-bar">
          <div 
            className="player-bar__progress" 
            style={{ width: `${song.progress * 100}%` }} 
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayerBar;