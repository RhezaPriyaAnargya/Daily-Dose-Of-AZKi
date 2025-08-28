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

type PlaybackMode = 'sequential' | 'shuffle' | 'repeat';

interface AudioPlayerContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    progress: number;
    duration: number;
    playbackMode: PlaybackMode;
    currentPlaylist: Song[];
    currentIndex: number;
    playSong: (song: Song) => void;
    playPlaylist: (songs: Song[], startIndex?: number, mode?: PlaybackMode) => void;
    togglePlayPause: () => void;
    seekTo: (position: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    togglePlaybackMode: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('sequential');
    const [, setShuffledPlaylist] = useState<Song[]>([]);
    
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
            playNext();
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
            togglePlayPause();
            return;
        }

        setCurrentSong(song);
        setCurrentPlaylist([song]);
        setCurrentIndex(0);
        setPlaybackMode('sequential');
        
        const audio = audioRef.current;
        audio.src = `/assets/songs/${song.file}`;
        audio.load();
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(error => console.error("Error playing audio:", error));
    };

    const playPlaylist = (songs: Song[], startIndex: number = 0, mode: PlaybackMode = 'sequential') => {
        if (songs.length === 0) return;
        
        let playlistToPlay = [...songs];
        let actualStartIndex = startIndex;

        if (mode === 'shuffle') {
            // Buat playlist acak
            const shuffled = [...songs];
            // Acak semua lagu
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setShuffledPlaylist(shuffled);
            playlistToPlay = shuffled;
            // Cari index lagu yang dipilih di playlist yang diacak
            actualStartIndex = shuffled.findIndex(song => song.id === songs[startIndex].id);
        }

        const song = playlistToPlay[actualStartIndex];
        setCurrentSong(song);
        setCurrentPlaylist(playlistToPlay);
        setCurrentIndex(actualStartIndex);
        setPlaybackMode(mode);
        
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

    const getNextIndex = () => {
        if (currentPlaylist.length === 0 || currentIndex === -1) return -1;
        
        if (playbackMode === 'repeat') {
            return currentIndex; // Ulang lagu yang sama
        }
        
        if (playbackMode === 'shuffle') {
            // Untuk shuffle, gunakan urutan acak yang sudah dibuat
            return (currentIndex + 1) % currentPlaylist.length;
        }
        
        // Sequential mode
        return (currentIndex + 1) % currentPlaylist.length;
    };

    const getPreviousIndex = () => {
        if (currentPlaylist.length === 0 || currentIndex === -1) return -1;
        
        if (playbackMode === 'repeat') {
            return currentIndex; // Ulang lagu yang sama
        }
        
        if (playbackMode === 'shuffle') {
            // Untuk shuffle, gunakan urutan acak yang sudah dibuat
            return (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        }
        
        // Sequential mode
        return (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    };

    const playNext = () => {
        const nextIndex = getNextIndex();
        if (nextIndex === -1) return;
        
        const nextSong = currentPlaylist[nextIndex];
        
        setCurrentSong(nextSong);
        setCurrentIndex(nextIndex);
        
        const audio = audioRef.current;
        audio.src = `/assets/songs/${nextSong.file}`;
        audio.load();
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(error => console.error("Error playing audio:", error));
    };

    const playPrevious = () => {
        const prevIndex = getPreviousIndex();
        if (prevIndex === -1) return;
        
        const prevSong = currentPlaylist[prevIndex];
        
        setCurrentSong(prevSong);
        setCurrentIndex(prevIndex);
        
        const audio = audioRef.current;
        audio.src = `/assets/songs/${prevSong.file}`;
        audio.load();
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(error => console.error("Error playing audio:", error));
    };

    const togglePlaybackMode = () => {
        const modes: PlaybackMode[] = ['sequential', 'shuffle', 'repeat'];
        const currentModeIndex = modes.indexOf(playbackMode);
        const nextMode = modes[(currentModeIndex + 1) % modes.length];
        
        setPlaybackMode(nextMode);
        
        // Jika mengaktifkan shuffle dan sedang memutar playlist
        if (nextMode === 'shuffle' && currentPlaylist.length > 1) {
            const shuffled = [...currentPlaylist];
            // Acak semua lagu kecuali lagu saat ini
            const currentSongId = currentSong?.id;
            const currentIndexInShuffled = shuffled.findIndex(song => song.id === currentSongId);
            
            // Acak sisa lagu
            for (let i = shuffled.length - 1; i > 0; i--) {
                if (i === currentIndexInShuffled) continue;
                const j = Math.floor(Math.random() * (i + 1));
                if (j === currentIndexInShuffled) continue;
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            
            setCurrentPlaylist(shuffled);
            setCurrentIndex(currentIndexInShuffled);
        }
    };

    return (
        <AudioPlayerContext.Provider value={{
            currentSong,
            isPlaying,
            progress,
            duration,
            playbackMode,
            currentPlaylist,
            currentIndex,
            playSong,
            playPlaylist,
            togglePlayPause,
            seekTo,
            playNext,
            playPrevious,
            togglePlaybackMode
        }}>
            {children}
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