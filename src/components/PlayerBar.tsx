// PlayerBar.tsx
import React from 'react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const PlayerBar: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    progress, 
    duration, 
    togglePlayPause,
    seekTo 
  } = useAudioPlayer();

  // Format waktu dari detik ke menit:detik
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Hitung progress percentage
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  // Handler untuk klik progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const newPosition = (clickPosition / progressBar.offsetWidth) * duration;
    seekTo(newPosition);
  };

  // Jangan render player bar jika tidak ada lagu yang dipilih
  if (!currentSong) {
    return null;
  }

  return (
    <footer className="player-bar">
      <div className="player-bar__container">
        {/* LEFT SIDE */}
        <div className="player-bar__left">
          <img 
            src={`/assets/images/${currentSong.cover}`} 
            alt={currentSong.title} 
            className="player-bar__cover" 
          />
          <div className="player-bar__info">
            <div className="player-bar__title">{currentSong.title}</div>
            <div className="player-bar__artist">AZKi</div>
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

          <button 
            className="player-bar__icon-btn player-bar__icon-btn--main" 
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlayPause}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#FA3689" />
              {isPlaying ? (
                // Icon Pause
                <>
                  <rect x="9" y="8" width="2.5" height="8" rx="1" fill="#fff" />
                  <rect x="12.5" y="8" width="2.5" height="8" rx="1" fill="#fff" />
                </>
              ) : (
                // Icon Play
                <path d="M10 8L16 12L10 16V8Z" fill="#fff" />
              )}
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
          <span className="player-bar__time">{formatTime(progress)}</span>
          <span className="player-bar__time-separator">/</span>
          <span className="player-bar__time">{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Progress Bar - Now positioned at the bottom */}
      <div className="player-bar__progress-container">
        <div 
          className="player-bar__progress-bar"
          onClick={handleProgressClick}
        >
          <div 
            className="player-bar__progress" 
            style={{ width: `${progressPercentage}%` }} 
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayerBar;