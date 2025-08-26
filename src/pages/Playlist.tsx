// src/pages/Playlist.tsx
import React, { useState } from 'react';
import { usePlaylist } from '../contexts/PlaylistContext';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const Playlist: React.FC = () => {
  const { playlists, deletePlaylist, createPlaylist } = usePlaylist();
  const { playSong } = useAudioPlayer();
  const [showCreateModal, setShowCreateModal] = useState(false);


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
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {playlists.map(playlist => (
            <div
              key={playlist.id}
              style={{
                background: '#2A2A2A',
                borderRadius: '12px',
                padding: '20px',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#FA3689'
                }}>
                  {playlist.name}
                </h3>
                <button
                  onClick={() => deletePlaylist(playlist.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ccc',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginTop: '15px' }}>
                {playlist.songs.length === 0 ? (
                  <p style={{ color: '#ccc', fontStyle: 'italic', margin: 0 }}>
                    No songs in this playlist yet
                  </p>
                ) : (
                  playlist.songs.slice(0, 3).map((song, index) => (
                    <div
                      key={song.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: index < Math.min(playlist.songs.length, 3) - 1 ? '1px solid #333' : 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => playSong(song)}
                    >
                      <img
                        src={`/assets/images/${song.cover}`}
                        alt={song.title}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
                          marginRight: '10px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{song.title}</div>
                        <div style={{ fontSize: '12px', color: '#ccc' }}>AZKi</div>
                      </div>
                    </div>
                  ))
                )}

                {playlist.songs.length > 3 && (
                  <div style={{
                    color: '#FA3689',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginTop: '10px',
                    cursor: 'pointer'
                  }}>
                    + {playlist.songs.length - 3} more songs
                  </div>
                )}
              </div>
            </div>
          ))}
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
          createPlaylist(name); // <-- gunakan di sini
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