// src/pages/DetailPlaylist.tsx
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylist } from '../contexts/PlaylistContext';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import DropdownPortal from '../components/DropdownPortal';


const DetailPlaylist: React.FC = () => {
    const { playlistId } = useParams<{ playlistId: string }>();
    const navigate = useNavigate();
    const { playlists, updatePlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist, createPlaylist } = usePlaylist();
    const { playSong, playPlaylist, currentSong } = useAudioPlayer();

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState<any>(null);

    const menuButtonsRef = useRef<{ [key: string]: HTMLElement | null }>({});

    const playlist = playlists.find(p => p.id === playlistId);

    if (!playlist) {
        return (
            <div style={{
                background: '#1B1B1B',
                minHeight: '100vh',
                color: 'white',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Poppins", sans-serif'
            }}>
                <div>Playlist not found</div>
            </div>
        );
    }

    const firstSong = playlist.songs[0];

    const handleSave = () => {
        if (editedName.trim()) {
            updatePlaylist(playlist.id, editedName);
        }
        setIsEditing(false);
    };

    const handleDelete = () => {
        deletePlaylist(playlist.id);
        navigate('/playlist');
    };

    const handleAddToPlaylist = (song: any, targetPlaylistId: string) => {
        addSongToPlaylist(targetPlaylistId, song);
        setSelectedSong(null);
    };

    const handleRemoveFromPlaylist = (songId: string) => {
        removeSongFromPlaylist(playlist.id, songId);
        setSelectedSong(null);
    };

    const setMenuButtonRef = (element: HTMLElement | null, songId: string) => {
        menuButtonsRef.current[songId] = element;
    };

    return (
        <div style={{
            background: '#1B1B1B',
            minHeight: '100vh',
            color: 'white',
            padding: '20px',
            fontFamily: '"Poppins", sans-serif'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Header with Back Button */}
                <div style={{ marginBottom: '30px' }}>
                    <button
                        onClick={() => navigate('/playlist')}
                        style={{
                            background: 'none',
                            border: '1px solid #555',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        ← Back to Playlists
                    </button>
                </div>

                {/* Playlist Header */}
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '30px',
                    alignItems: 'flex-end'
                }}>
                    {/* Cover Image */}
                    <div style={{
                        width: '200px',
                        height: '200px',
                        background: firstSong
                            ? `url(/assets/images/${firstSong.cover}) center/cover`
                            : 'linear-gradient(135deg, #FA3689 0%, #7A3CFF 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)'
                    }}>
                        {!firstSong && (
                            <div style={{
                                fontSize: '64px',
                                color: 'white',
                                opacity: '0.7'
                            }}>
                                ♫
                            </div>
                        )}
                    </div>

                    {/* Playlist Info */}
                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '15px' }}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid #555',
                                        color: 'white',
                                        borderRadius: '6px',
                                        padding: '8px 12px',
                                        fontSize: '24px',
                                        fontWeight: '600',
                                        width: '100%'
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <h1 style={{
                                    margin: '0',
                                    fontSize: '28px',
                                    fontWeight: '600',
                                    color: '#FA3689'
                                }}>
                                    {playlist.name}
                                </h1>
                            )}
                        </div>

                        <p style={{
                            margin: '0 0 20px 0',
                            color: '#ccc',
                            fontSize: '16px'
                        }}>
                            {playlist.songs.length} {playlist.songs.length === 1 ? 'Track' : 'Tracks'}
                        </p>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            

                            {/* Tombol Play Playlist */}
                            <button
                                onClick={() => playPlaylist(playlist.songs)}
                                style={{
                                    background: '#FA3689',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 5V19L19 12L8 5Z" fill="white" />
                                </svg>
                                Play
                            </button>



                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        style={{
                                            background: '#333',
                                            color: 'white',
                                            border: '1px solid #555',
                                            borderRadius: '6px',
                                            padding: '8px 16px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        style={{
                                            background: 'none',
                                            border: '1px solid #555',
                                            color: 'white',
                                            borderRadius: '6px',
                                            padding: '8px 16px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEditing(true);
                                            setEditedName(playlist.name);
                                        }}
                                        style={{
                                            background: 'none',
                                            border: '1px solid #555',
                                            color: 'white',
                                            borderRadius: '6px',
                                            padding: '8px 16px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        style={{
                                            background: 'none',
                                            border: '1px solid #ff4d4d',
                                            color: '#ff4d4d',
                                            borderRadius: '6px',
                                            padding: '8px 16px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Songs List */}
                <div>
                    <h3 style={{
                        margin: '0 0 20px 0',
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'white'
                    }}>
                        Tracks
                    </h3>

                    {playlist.songs.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            color: '#ccc',
                            fontStyle: 'italic',
                            padding: '40px 0'
                        }}>
                            No songs in this playlist yet
                        </div>
                    ) : (
                        <div style={{
                            background: '#2A2A2A',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        }}>
                            {playlist.songs.map((song, index) => (
                                <div
                                    key={song.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '15px 20px',
                                        borderBottom: index < playlist.songs.length - 1 ? '1px solid #333' : 'none',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = '#333';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '40px',
                                            textAlign: 'center',
                                            color: '#ccc',
                                            marginRight: '15px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => playSong(song)}
                                    >
                                        {index + 1}
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flex: 1,
                                            cursor: 'pointer',
                                            minWidth: 0
                                        }}
                                        onClick={() => playSong(song)}
                                    >
                                        <img
                                            src={`/assets/images/${song.cover}`}
                                            alt={song.title}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '6px',
                                                marginRight: '15px',
                                                objectFit: 'cover'
                                            }}
                                        />

                                        <div style={{ minWidth: 0, flex: 1 }}>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                color: currentSong?.id === song.id ? '#FA3689' : 'white',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {song.title}
                                            </div>
                                            <div style={{
                                                fontSize: '14px',
                                                color: '#ccc',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                AZKi
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        color: '#ccc',
                                        fontSize: '14px',
                                        marginRight: '15px',
                                        cursor: 'pointer'
                                    }}
                                        onClick={() => playSong(song)}>
                                        {song.duration}
                                    </div>

                                    {/* Tombol tiga titik */}
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            ref={(el) => setMenuButtonRef(el, song.id)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedSong(selectedSong?.id === song.id ? null : song);
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ccc',
                                                cursor: 'pointer',
                                                fontSize: '18px',
                                                padding: '5px',
                                                borderRadius: '4px',
                                                width: '30px',
                                                height: '30px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.background = '#444';
                                                e.currentTarget.style.color = 'white';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.background = 'none';
                                                e.currentTarget.style.color = '#ccc';
                                            }}
                                        >
                                            ⋮
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Dropdown Portal untuk menu lagu */}
            {selectedSong && (
                <DropdownPortal
                    isOpen={true}
                    onClose={() => setSelectedSong(null)}
                    targetElement={menuButtonsRef.current[selectedSong.id]}
                >
                    <div style={{
                        background: '#2A2A2A',
                        borderRadius: '8px',
                        padding: '10px',
                        minWidth: '200px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        border: '1px solid #444'
                    }}>
                        <div style={{
                            color: 'white',
                            padding: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            borderBottom: '1px solid #444',
                            marginBottom: '5px'
                        }}>
                            Song Options
                        </div>

                        {/* Opsi Add to Playlist */}
                        <div style={{
                            color: 'white',
                            padding: '8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            marginBottom: '5px'
                        }}>
                            Add to playlist
                        </div>

                        {playlists.filter(p => p.id !== playlistId).length === 0 ? (
                            <div style={{
                                color: '#ccc',
                                padding: '8px',
                                fontSize: '12px',
                                fontStyle: 'italic'
                            }}>
                                No other playlists
                            </div>
                        ) : (
                            playlists
                                .filter(p => p.id !== playlistId)
                                .map(playlist => (
                                    <div
                                        key={playlist.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleAddToPlaylist(selectedSong, playlist.id);
                                        }}
                                        style={{
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            color: '#ccc',
                                            borderRadius: '4px'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = '#333';
                                            e.currentTarget.style.color = 'white';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#ccc';
                                        }}
                                    >
                                        {playlist.name}
                                    </div>
                                ))
                        )}

                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowPlaylistModal(true);
                                setSelectedSong(null);
                            }}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#FA3689',
                                fontWeight: '600',
                                borderRadius: '4px',
                                marginBottom: '10px'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = '#333';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            + New Playlist
                        </div>

                        {/* Separator */}
                        <div style={{
                            height: '1px',
                            background: '#444',
                            margin: '8px 0'
                        }} />

                        {/* Opsi Remove from Playlist */}
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemoveFromPlaylist(selectedSong.id);
                            }}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#ff4d4d',
                                fontWeight: '600',
                                borderRadius: '4px'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = '#333';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            Remove from this playlist
                        </div>
                    </div>
                </DropdownPortal>
            )}

            <CreatePlaylistModal
                isOpen={showPlaylistModal}
                onClose={() => setShowPlaylistModal(false)}
                onCreate={(name) => {
                    createPlaylist(name);
                    setShowPlaylistModal(false);
                }}
            />

            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}
            </style>
        </div>
    );
};

export default DetailPlaylist;