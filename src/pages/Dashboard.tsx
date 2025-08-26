import React, { useEffect, useState, useRef } from 'react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { usePlaylist } from '../contexts/PlaylistContext';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import DropdownPortal from '../components/DropdownPortal';

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

const Dashboard: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [featured, setFeatured] = useState<Song | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const { playlists, addSongToPlaylist, createPlaylist } = usePlaylist();


    const menuButtonsRef = useRef<{ [key: string]: HTMLElement | null }>({});

    const handleAddToPlaylist = (song: Song, playlistId: string) => {
        addSongToPlaylist(playlistId, song);
        setSelectedSong(null);
    };

    // Gunakan hook audio player
    const { playSong, currentSong, isPlaying } = useAudioPlayer();

    useEffect(() => {
        // For demo purposes, we'll use mock data
        const mockSongs: Song[] = [
            {
                id: "1",
                title: "INOCHI 2024 Ver",
                file: "Inochi(2024 ver.).flac",
                cover: "AZKi-Inochi.jpg",
                duration: "4:32",
                mood: ["emotional", "uplifting"],
                description: "“Inochi (2024 ver.)” adalah refleksi matang tentang hidup, eksistensi, dan hubungan antara penyanyi dengan pendengar. Jika versi 2019 dipenuhi rasa takut dilupakan, versi 2024 menampilkan kedewasaan & ketenangan hati: bahkan jika suatu hari dilupakan, nyanyiannya, kata-kata yang sudah sampai, dan momen yang pernah dibagikan tetap hidup selamanya.Lagu ini menunjukkan perjalanan AZKi dari seorang penyanyi yang rapuh dan takut hilang, menjadi seorang diva yang yakin bahwa nyanyiannya adalah warisan, bukan sekadar eksistensi yang bergantung pada ingatan orang lain.",
                releaseDate: "July 24, 2024",
                played: "467.040"
            },
            {
                id: "2",
                title: "未来キャンペーネラ",
                file: "Mirai-Campanella.flac",
                cover: "AZKi-Mirai-Campanella.jpg",
                duration: "3:48",
                mood: ["energetic", "happy"],
                description: "Mirai Campanella adalah lagu tentang pencarian jati diri, keberanian menghadapi ketakutan, dan keyakinan bahwa suara hati dapat menuntun kita menuju masa depan.Liriknya menggambarkan perjalanan batin seseorang yang meragukan dirinya, merasa tertinggal dari orang lain, dan hampir tenggelam oleh 'noise' dunia. Namun, simbol Campanella (lonceng) hadir sebagai panggilan lembut dari masa depan — tanda bahwa harapan masih ada.",
                releaseDate: "July 2,2025",
                played: "96.423"
            },
            {
                id: "3",
                title: "Creating World",
                file: "Creating-World.flac",
                cover: "AZKi-Creating-World.jpg",
                duration: "4:22",
                mood: ["chill", "relaxing"],
                description: "Creating World adalah lagu tentang membangun masa depan bersama melalui musik. Liriknya menggambarkan perjalanan dari keraguan dan kegelapan menuju cahaya dan harapan. AZKi menyampaikan bahwa meskipun kita takut dan terluka oleh kata-kata, keberanian selalu ada dalam diri kita, dan kita tidak perlu menjadi orang lain untuk bisa melangkah.Lagu ini juga menekankan kekuatan suara dan musik: bagaimana suara bisa menghubungkan hati, menciptakan kisah bersama, dan menjadi alasan untuk terus hidup dan bermimpi. 'Creating World' adalah deklarasi bahwa dunia baru penuh kemungkinan dapat tercipta dari nyanyian dan hubungan antara penyanyi dan pendengar.",
                releaseDate: "December 28, 2018",
                played: "761.000"
            },
            {
                id: "4",
                title: "Without U",
                file: "Without-U.flac",
                cover: "AZKi-without-U-300x300.jpg",
                duration: "4:41",
                mood: ["emotional", "deep"],
                description: "Without U adalah lagu tentang kebersamaan, rasa terima kasih, dan makna eksistensi melalui hubungan dengan orang lain. AZKi menyanyikan bahwa tanpa dukungan pendengar, ia tidak akan bisa menjadi dirinya sendiri. Namun, hubungan ini bukan hanya satu arah: ia juga ingin berada di sisi pendengarnya, mendukung mereka di saat sulit, dan meninggalkan suara yang akan tetap hidup di hati mereka. Lagu ini penuh dengan kejujuran: ketidakpastian masa depan ('sampai kapan kita bisa bersama, aku tidak tahu'), tapi justru karena itu, setiap momen bersama harus dijadikan berharga. Pada akhirnya, 'without U' adalah lagu cinta—bukan sekadar romantis, tapi cinta dalam arti luas: hubungan antara penyanyi dan mereka yang mendengarkannya.",
                releaseDate: "November 12, 2019",
                played: "384.000"
            },
            {
                id: "5",
                title: "Inochi",
                file: "Inochi.flac",
                cover: "AZKi-Inochi2019.jpg",
                duration: "4:31",
                mood: ["emotional", "uplifting"],
                description: "Inochi adalah lagu yang menggali arti hidup, eksistensi, dan hubungan antara penyanyi dengan pendengar. AZKi bertanya: apakah cukup sekadar bernapas untuk hidup? Apakah keberadaannya nyata kalau tidak ada yang mengingat? Lagu ini menyampaikan rasa rapuh seorang artis yang takut dilupakan, tetapi sekaligus penuh tekad: meski ada luka dan penolakan, selama jantung masih berdetak, ia akan terus bernyanyi. Ada pesan kuat bahwa setiap memori, kata, dan dukungan kecil dari orang lain bisa membuat seseorang merasa hidup. Pada akhirnya, 'Inochi' bukan hanya lagu tentang kehidupan, tapi juga tentang suara yang menyambungkan hati, membuat eksistensi menjadi berarti, dan menjadikan nyanyian sebagai bukti kehidupan itu sendiri.",
                releaseDate: "April 30, 2019",
                played: "1.682.342"
            }
        ];

        setSongs(mockSongs);

        // Pilih lagu acak untuk Song of the Day
        const randomIndex = Math.floor(Math.random() * mockSongs.length);
        setFeatured(mockSongs[randomIndex]);
    }, []);

    // Only show 3 songs at first, show all if showAll is true
    const initialVisible = 3;
    const visibleSongs = showAll ? songs : songs.slice(0, initialVisible);

    const setMenuButtonRef = (element: HTMLElement | null, songId: string) => {
        menuButtonsRef.current[songId] = element;
    };

    return (
        <div style={{
            background: '#1B1B1B',
            minHeight: '100vh',
            color: 'white',
            padding: '0 0 120px 0',
            margin: '0',
            fontFamily: '"Poppins", sans-serif',
            overflowX: 'hidden'
        }}>

            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '15px'
            }}>
                {/* Song of the Day Section */}
                <h2 style={{
                    textAlign: 'center',
                    fontWeight: '200',
                    letterSpacing: '3px',
                    fontSize: '30px',
                    marginBottom: '5px',
                    color: '#FFFF',
                    textTransform: 'uppercase'
                }}>
                    SONG OF THE DAY
                </h2>

                {featured && (
                    <div style={{
                        background: '#2A2A2A',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '80px 40px',
                        marginBottom: '60px',
                        gap: '40px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                    }}>
                        <img
                            src={`/assets/images/${featured.cover}`}
                            alt={featured.title}
                            style={{
                                width: '320px',
                                height: '320px',
                                borderRadius: '12px',
                                objectFit: 'cover',
                                border: '4px solid #FA3689',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)'
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3 style={{
                                margin: '0 0 15px 0',
                                fontSize: '28px',
                                fontWeight: '300',
                                textTransform: 'uppercase'
                            }}>
                                {featured.title}
                            </h3>
                            <p style={{
                                color: '#ccc',
                                margin: '0 0 30px 0',
                                fontSize: '16px',
                                lineHeight: '1.6',
                                maxWidth: '600px'
                            }}>
                                {featured.description}
                            </p>
                            <button
                                style={{
                                    background: '#FA3689',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '12px 40px',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 12px rgba(250, 54, 137, 0.3)'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = '#e02578';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = '#FA3689';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                                onClick={() => playSong(featured)}
                            >
                                {currentSong?.id === featured.id && isPlaying ? 'PAUSE' : 'PLAY'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Recently Added Section */}
                <div>
                    <h3 style={{
                        fontWeight: '600',
                        marginBottom: '25px',
                        fontSize: '40px',
                        color: 'white'
                    }}>
                        Recently Added
                    </h3>

                    <div style={{
                        background: '#2A2A2A',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        fontFamily: "Poppins"
                    }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '15px'
                        }}>
                            <thead>
                                <tr style={{
                                    background: '#232323',
                                    color: '#FFFF',
                                    textAlign: 'left',
                                    fontWeight: '400',
                                    letterSpacing: '1px',
                                }}>
                                    <th style={{ padding: '20px', width: '10%' }}>No</th>
                                    <th style={{ padding: '20px', width: '35%' }}>Name</th>
                                    <th style={{ padding: '10px', width: '20%' }}>Release Date</th>
                                    <th style={{ padding: '20px', width: '15%' }}>Played</th>
                                    <th style={{ padding: '20px', width: '15%' }}>Time</th>
                                    <th style={{ padding: '20px', width: '5%' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleSongs.map((song, index) => (
                                    <tr
                                        key={song.id}
                                        style={{
                                            borderBottom: index < visibleSongs.length - 1 ? '1px solid #333' : 'none',
                                            transition: 'background 0.2s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = '#333';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <td
                                            style={{ padding: '20px', fontWeight: '500' }}
                                            onClick={() => playSong(song)}
                                        >
                                            {index + 1}
                                        </td>
                                        <td
                                            style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}
                                            onClick={() => playSong(song)}
                                        >
                                            <img
                                                src={`/assets/images/${song.cover}`}
                                                alt={song.title}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '8px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <span style={{ fontWeight: '500' }}>{song.title}</span>
                                        </td>
                                        <td
                                            style={{ padding: '10px', color: '#ccc' }}
                                            onClick={() => playSong(song)}
                                        >
                                            {song.releaseDate}
                                        </td>
                                        <td
                                            style={{ padding: '20px', color: '#ccc' }}
                                            onClick={() => playSong(song)}
                                        >
                                            {song.played}
                                        </td>
                                        <td
                                            style={{ padding: '20px', color: '#ccc' }}
                                            onClick={() => playSong(song)}
                                        >
                                            {song.duration}
                                        </td>
                                        <td style={{ padding: '20px', position: 'relative' }}>
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Show More Button */}
                {!showAll && songs.length > initialVisible && (
                    <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '0' }}>
                        <button
                            style={{
                                background: '#FA3689',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '12px 40px',
                                fontWeight: 500,
                                fontSize: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 8px rgba(250, 54, 137, 0.15)'
                            }}
                            onClick={() => setShowAll(true)}
                            onMouseOver={e => {
                                e.currentTarget.style.background = '#e02578';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.background = '#FA3689';
                            }}
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>

            {/* Dropdown Portal untuk menu playlist */}
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
                            Add to playlist
                        </div>
                        {playlists.length === 0 ? (
                            <div style={{
                                color: '#ccc',
                                padding: '8px',
                                fontSize: '12px',
                                fontStyle: 'italic'
                            }}>
                                No playlists yet
                            </div>
                        ) : (
                            playlists.map(playlist => (
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
                                borderTop: '1px solid #444',
                                marginTop: '5px',
                                borderRadius: '4px'
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

            {/* Add Poppins font from Google Fonts */}
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

export default Dashboard;