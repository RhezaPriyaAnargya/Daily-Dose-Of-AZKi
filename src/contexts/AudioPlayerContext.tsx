// src/contexts/AudioPlayerContext.tsx
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

type Song = {
    id: string;
    title: string;
    file: string;
    cover: string;
    duration: string;
    mood: string[];
    description: string;
    releaseDate?: string;
    played?: string;
};

interface AudioPlayerContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    progress: number;
    duration: number;
    playSong: (song: Song) => void;
    togglePlayPause: () => void;
    seekTo: (position: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(new Audio());

    useEffect(() => {
        const audio = audioRef.current;
        
        const updateProgress = () => {
            setProgress(audio.currentTime);
        };
        
        const setAudioData = () => {
            setDuration(audio.duration);
        };
        
        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const playSong = (song: Song) => {
        if (currentSong?.id === song.id && isPlaying) {
            // Jika lagu yang sama sedang diputar, pause saja
            togglePlayPause();
            return;
        }

        setCurrentSong(song);
        const audio = audioRef.current;
        audio.src = `/assets/songs/${song.file}`;
        audio.load();
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(error => console.error("Error playing audio:", error));
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(error => console.error("Error playing audio:", error));
        }
        setIsPlaying(!isPlaying);
    };

    const seekTo = (position: number) => {
        const audio = audioRef.current;
        audio.currentTime = position;
        setProgress(position);
    };

    return (
        <AudioPlayerContext.Provider value={{
            currentSong,
            isPlaying,
            progress,
            duration,
            playSong,
            togglePlayPause,
            seekTo
        }}>
            {children}
            {/* Audio element tersembunyi */}
            <audio ref={audioRef} style={{ display: 'none' }} />
        </AudioPlayerContext.Provider>
    );
};

export const useAudioPlayer = () => {
    const context = useContext(AudioPlayerContext);
    if (context === undefined) {
        throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
    }
    return context;
};