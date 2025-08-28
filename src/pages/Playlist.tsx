// src/pages/Playlist.tsx
import React, { useState } from 'react';
import { usePlaylist } from '../contexts/PlaylistContext';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import { useNavigate } from 'react-router-dom';

const Playlist: React.FC = () => {
  const { playlists, deletePlaylist, createPlaylist } = usePlaylist();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div style={{
      background: '#1B1B1B',
      minHeight: '100vh',
      color: 'white',
      padding: '20px',
      fontFamily: '"Poppins", sans-serif'
    }}>
      <div>
        <h2 style={{
          textAlign: 'center',
          fontWeight: '200',
          letterSpacing: '3px',
          fontSize: '30px',
          marginBottom: '5px',
          color: '#FFFF',
          textTransform: 'uppercase'
        }}>
          Your Playlists
        </h2>
      </div>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              background: '#FA3689',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#e02578';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#FA3689';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Add Playlist
          </button>
        </div>

        {/* Playlist Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {playlists.map(playlist => {
            const firstSong = playlist.songs[0];
            
            return (
              <div
                key={playlist.id}
                style={{
                  background: '#2A2A2A',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                {/* Cover Image */}
                <div style={{
                  height: '180px',
                  background: firstSong 
                    ? `url(/assets/images/${firstSong.cover}) center/cover`
                    : 'linear-gradient(135deg, #FA3689 0%, #7A3CFF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {!firstSong && (
                    <div style={{
                      fontSize: '48px',
                      color: 'white',
                      opacity: '0.7'
                    }}>
                      ♫
                    </div>
                  )}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(0,0,0,0.7)',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePlaylist(playlist.id);
                    }}
                  >
                    ×
                  </div>
                </div>

                {/* Playlist Info */}
                <div style={{ padding: '15px' }}>
                  <h3 style={{
                    margin: '0 0 5px 0',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#FA3689'
                  }}>
                    {playlist.name}
                  </h3>
                  
                  <p style={{
                    margin: '0',
                    color: '#ccc',
                    fontSize: '0.9rem'
                  }}>
                    {playlist.songs.length} {playlist.songs.length === 1 ? 'Track' : 'Tracks'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {playlists.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#ccc',
            marginTop: '60px',
            fontStyle: 'italic'
          }}>
            You don't have any playlists yet. Create your first one!
          </div>
        )}
      </div>

      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(name) => {
          createPlaylist(name);
          setShowCreateModal(false);
        }}
      />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: #1B1B1B;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default Playlist;