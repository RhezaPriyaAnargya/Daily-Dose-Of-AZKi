// src/contexts/PlaylistContext.tsx (tambahkan fungsi updatePlaylist)
import React, { createContext, useContext, useState } from 'react';

export type Playlist = {
    id: string;
    name: string;
    songs: any[];
    createdAt: Date;
};

interface PlaylistContextType {
    playlists: Playlist[];
    createPlaylist: (name: string) => void;
    addSongToPlaylist: (playlistId: string, song: any) => void;
    removeSongFromPlaylist: (playlistId: string, songId: string) => void;
    deletePlaylist: (playlistId: string) => void;
    updatePlaylist: (playlistId: string, newName: string) => void; // Tambahkan ini
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const usePlaylist = () => {
    const context = useContext(PlaylistContext);
    if (context === undefined) {
        throw new Error('usePlaylist must be used within a PlaylistProvider');
    }
    return context;
};

interface PlaylistProviderProps {
    children: React.ReactNode;
}

export const PlaylistProvider: React.FC<PlaylistProviderProps> = ({ children }) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const createPlaylist = (name: string) => {
        const newPlaylist: Playlist = {
            id: Date.now().toString(),
            name,
            songs: [],
            createdAt: new Date()
        };
        setPlaylists(prev => [...prev, newPlaylist]);
    };

    const addSongToPlaylist = (playlistId: string, song: any) => {
        setPlaylists(prev => prev.map(playlist => {
            if (playlist.id === playlistId) {
                // Cek jika lagu sudah ada di playlist
                if (!playlist.songs.find(s => s.id === song.id)) {
                    return { ...playlist, songs: [...playlist.songs, song] };
                }
            }
            return playlist;
        }));
    };

    // Di PlaylistContext.tsx, pastikan ada fungsi ini:
    const removeSongFromPlaylist = (playlistId: string, songId: string) => {
        setPlaylists(prev => prev.map(playlist => {
            if (playlist.id === playlistId) {
                return { ...playlist, songs: playlist.songs.filter(song => song.id !== songId) };
            }
            return playlist;
        }));
    };

    const deletePlaylist = (playlistId: string) => {
        setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
    };

    // Tambahkan fungsi updatePlaylist
    const updatePlaylist = (playlistId: string, newName: string) => {
        setPlaylists(prev => prev.map(playlist => {
            if (playlist.id === playlistId) {
                return { ...playlist, name: newName };
            }
            return playlist;
        }));
    };

    return (
        <PlaylistContext.Provider value={{
            playlists,
            createPlaylist,
            addSongToPlaylist,
            removeSongFromPlaylist, // Pastikan ini ada
            deletePlaylist,
            updatePlaylist
        }}>
            {children}
        </PlaylistContext.Provider>
    );
};