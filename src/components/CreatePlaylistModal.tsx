// src/components/CreatePlaylistModal.tsx
import React, { useState } from 'react';

interface CreatePlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
    isOpen,
    onClose,
    onCreate
}) => {
    const [playlistName, setPlaylistName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (playlistName.trim()) {
            onCreate(playlistName.trim());
            setPlaylistName('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#2A2A2A',
                padding: '30px',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '400px'
            }}>
                <h3 style={{
                    margin: '0 0 20px 0',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '600'
                }}>
                    Give your playlist a name
                </h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        placeholder="My Playlist"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #444',
                            borderRadius: '6px',
                            background: '#1B1B1B',
                            color: 'white',
                            fontSize: '16px',
                            marginBottom: '20px'
                        }}
                        autoFocus
                    />
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '6px',
                                background: '#444',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '6px',
                                background: '#FA3689',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;