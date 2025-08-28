import React, { useState, useRef, useEffect } from 'react';
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

const MoodRecommender: React.FC = () => {
    const [moodInput, setMoodInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const { playlists, addSongToPlaylist, createPlaylist } = usePlaylist();
    const { playSong, currentSong, isPlaying } = useAudioPlayer();
    
    const menuButtonsRef = useRef<{ [key: string]: HTMLElement | null }>({});

    // Daftar lagu yang tersedia
    const availableSongs: Song[] = [
        {
            id: "1",
            title: "INOCHI 2024 Ver",
            file: "Inochi(2024 ver.).flac",
            cover: "AZKi-Inochi.jpg",
            duration: "4:32",
            mood: ["emotional", "uplifting", "inspiring", "deep", "meaningful"],
            description: "Refleksi matang tentang hidup, eksistensi, dan hubungan antara penyanyi dengan pendengar.",
            releaseDate: "July 24, 2024",
            played: "487.040"
        },
        {
            id: "2",
            title: "未来キャンペーネラ",
            file: "Mirai-Campanella.flac",
            cover: "AZKi-Mirai-Campanella.jpg",
            duration: "3:48",
            mood: ["energetic", "happy", "upbeat", "positive", "joyful"],
            description: "Lagu tentang pencarian jati diri, keberanian menghadapi ketakutan, dan keyakinan bahwa suara hati dapat menuntun kita menuju masa depan.",
            releaseDate: "July 2, 2025",
            played: "96.423"
        },
        {
            id: "3",
            title: "Creating World",
            file: "Creating-World.flac",
            cover: "AZKi-Creating-World.jpg",
            duration: "4:22",
            mood: ["chill", "relaxing", "calm", "peaceful", "soothing"],
            description: "Lagu tentang membangun masa depan bersama melalui musik dan perjalanan dari keraguan menuju cahaya dan harapan.",
            releaseDate: "December 28, 2018",
            played: "761.000"
        },
        {
            id: "4",
            title: "Without U",
            file: "Without-U.flac",
            cover: "AZKi-without-U-300x300.jpg",
            duration: "4:41",
            mood: ["emotional", "deep", "sad", "melancholic", "heartfelt"],
            description: "Lagu tentang kebersamaan, rasa terima kasih, dan makna eksistensi melalui hubungan dengan orang lain.",
            releaseDate: "November 12, 2019",
            played: "384.000"
        },
        {
            id: "5",
            title: "Inochi",
            file: "Inochi.flac",
            cover: "AZKi-Inochi2019.jpg",
            duration: "4:31",
            mood: ["emotional", "uplifting", "powerful", "dramatic", "meaningful"],
            description: "Lagu yang menggali arti hidup, eksistensi, dan hubungan antara penyanyi dengan pendengar.",
            releaseDate: "April 30, 2019",
            played: "1.682.342"
        }
    ];

    // Fungsi untuk memanggil API Replicate dengan Granite AI
    const getAIRecocommendations = async (mood: string) => {
        setError(null);
        
        // Data lagu yang akan dikenali oleh AI
        const songsData = availableSongs.map(song => ({
            title: song.title,
            mood: song.mood.join(', '),
            description: song.description
        }));
        
        try {
            // Ganti dengan API key Replicate Anda
            const REPLICATE_API_KEY = "r8_2jkMgtRODBwYBOwCg2AvUtfnr2k7VoJ091kUG";
            const API_URL = "https://api.replicate.com/v1/predictions";
            
            // Prompt yang dioptimalkan untuk Granite AI
            const prompt = `
                Anda adalah sistem rekomendasi musik yang ahli. 
                Berdasarkan mood pengguna: "${mood}", 
                rekomendasikan lagu-lagu dari daftar berikut yang paling sesuai:
                
                ${JSON.stringify(songsData, null, 2)}
                
                Berikan hasil dalam format JSON array dengan urutan dari yang paling sesuai:
                [{"id": "1", "reason": "Alasan sesuai dengan mood"}, ...]
                
                Hanya gunakan ID yang ada dalam daftar di atas.
            `;
            
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${REPLICATE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    version: "da6a4c6d475f4d5ce9b6c2b797a0c76b01fca1ce6af321417543c0c0b7a7b8c8", // Granite model version
                    input: {
                        prompt: prompt,
                        max_length: 1000,
                        temperature: 0.7,
                        top_p: 0.9
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Polling untuk mendapatkan hasil (karena Replicate API async)
            let result = null;
            let attempts = 0;
            const maxAttempts = 10;
            
            while (attempts < maxAttempts) {
                const statusResponse = await fetch(`${API_URL}/${data.id}`, {
                    headers: {
                        "Authorization": `Token ${REPLICATE_API_KEY}`,
                        "Content-Type": "application/json",
                    }
                });
                
                const statusData = await statusResponse.json();
                
                if (statusData.status === "succeeded") {
                    result = statusData.output;
                    break;
                } else if (statusData.status === "failed") {
                    throw new Error("AI processing failed");
                }
                
                // Tunggu 1 detik sebelum polling lagi
                await new Promise(resolve => setTimeout(resolve, 1000));
                attempts++;
            }
            
            if (!result) {
                throw new Error("Timeout waiting for AI response");
            }
            
            // Parse hasil AI
            try {
                // Ekstrak JSON dari respon AI
                const jsonMatch = result.join('').match(/\[.*\]/s);
                if (!jsonMatch) {
                    throw new Error("Invalid AI response format");
                }
                
                const recommendations = JSON.parse(jsonMatch[0]);
                
                // Map hasil AI ke daftar lagu
                const recommendedSongs = recommendations
                    .map((rec: any) => {
                        const song = availableSongs.find(s => s.id === rec.id);
                        return song ? {...song, aiReason: rec.reason} : null;
                    })
                    .filter((song: any) => song !== null);
                
                return recommendedSongs;
            } catch (parseError) {
                console.error("Error parsing AI response:", parseError);
                // Fallback ke filtering sederhana jika parsing gagal
                return getFallbackRecommendations(mood);
            }
            
        } catch (error) {
            console.error("Error calling Replicate API:", error);
            // Fallback ke metode sederhana jika API gagal
            return getFallbackRecommendations(mood);
        }
    };

    // Fallback method jika AI tidak tersedia
    const getFallbackRecommendations = (mood: string) => {
        const moodKeywords = mood.toLowerCase().split(' ');
        
        // Beri skor untuk setiap lagu berdasarkan kecocokan mood
        const scoredSongs = availableSongs.map(song => {
            let score = 0;
            moodKeywords.forEach(keyword => {
                if (song.mood.some(m => m.includes(keyword))) {
                    score += 2;
                }
                if (song.description.toLowerCase().includes(keyword)) {
                    score += 1;
                }
                if (song.title.toLowerCase().includes(keyword)) {
                    score += 1;
                }
            });
            return { ...song, score };
        });
        
        // Urutkan berdasarkan skor tertinggi
        return scoredSongs
            .filter(song => song.score > 0)
            .sort((a, b) => b.score - a.score);
    };

    const handleAddToPlaylist = (song: Song, playlistId: string) => {
        addSongToPlaylist(playlistId, song);
        setSelectedSong(null);
    };

    const setMenuButtonRef = (element: HTMLElement | null, songId: string) => {
        menuButtonsRef.current[songId] = element;
    };

    const getRecommendations = async () => {
        if (!moodInput.trim()) return;
        
        setIsLoading(true);
        
        try {
            // Gunakan AI untuk mendapatkan rekomendasi
            const recommendations = await getAIRecocommendations(moodInput);
            setRecommendedSongs(recommendations);
            
        } catch (error) {
            console.error("Error getting recommendations:", error);
            setError("Failed to get recommendations. Please try again.");
            // Fallback: show all songs if API fails
            setRecommendedSongs(availableSongs);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        getRecommendations();
    };

    // Only show 5 songs at first, show all if showAll is true
    const initialVisible = 5;
    const visibleSongs = showAll ? recommendedSongs : recommendedSongs.slice(0, initialVisible);

    return (
        <div style={{
            background: '#1B1B1B',
            minHeight: '100vh',
            color: 'white',
            padding: '20px',
            fontFamily: '"Poppins", sans-serif'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Header */}
                <h2 style={{
                    textAlign: 'center',
                    fontWeight: '200',
                    letterSpacing: '3px',
                    fontSize: '30px',
                    marginBottom: '5px',
                    color: '#FFFF',
                    textTransform: 'uppercase'
                }}>
                    MOOD RECOMMENDER
                </h2>
                
                <p style={{
                    textAlign: 'center',
                    color: '#ccc',
                    marginBottom: '40px',
                    fontSize: '16px'
                }}>
                    Powered by Granite AI - Describe your mood and get personalized song recommendations
                </p>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: '#FF5252',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {/* Search Form */}
                <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <input
                            type="text"
                            value={moodInput}
                            onChange={(e) => setMoodInput(e.target.value)}
                            placeholder="How are you feeling? (e.g., happy, sad, energetic, need motivation, feeling nostalgic)"
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                background: '#2A2A2A',
                                border: '2px solid #444',
                                color: 'white',
                                borderRadius: '8px',
                                padding: '15px 20px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#FA3689';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#444';
                            }}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !moodInput.trim()}
                            style={{
                                background: isLoading ? '#888' : '#FA3689',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '15px 30px',
                                fontWeight: '600',
                                fontSize: '16px',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                width: '200px'
                            }}
                            onMouseOver={(e) => {
                                if (!isLoading && moodInput.trim()) {
                                    e.currentTarget.style.background = '#e02578';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isLoading && moodInput.trim()) {
                                    e.currentTarget.style.background = '#FA3689';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            {isLoading ? (
                                <span>
                                    <i className="fas fa-spinner fa-spin" style={{marginRight: '8px'}}></i>
                                    Analyzing...
                                </span>
                            ) : (
                                'Recommend'
                            )}
                        </button>
                    </div>
                </form>

                {/* Recommendations Section */}
                {recommendedSongs.length > 0 && (
                    <div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
                            <h3 style={{
                                fontWeight: '600',
                                fontSize: '24px',
                                color: 'white',
                                margin: 0
                            }}>
                                AI Recommendations
                            </h3>
                            <div style={{
                                color: '#FA3689',
                                fontSize: '14px',
                                background: 'rgba(250, 54, 137, 0.1)',
                                padding: '6px 12px',
                                borderRadius: '20px'
                            }}>
                                <i className="fas fa-robot" style={{marginRight: '6px'}}></i>
                                Powered by Granite AI
                            </div>
                        </div>

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
                                                <div>
                                                    <div style={{ fontWeight: '500' }}>{song.title}</div>
                                                    {(song as any).aiReason && (
                                                        <div style={{
                                                            fontSize: '12px',
                                                            color: '#FA3689',
                                                            marginTop: '4px'
                                                        }}>
                                                            {(song as any).aiReason}
                                                        </div>
                                                    )}
                                                </div>
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

                        {/* Show More Button */}
                        {!showAll && recommendedSongs.length > initialVisible && (
                            <div style={{ textAlign: 'center', marginTop: '30px' }}>
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
                )}

                {/* Empty State */}
                {!isLoading && recommendedSongs.length === 0 && moodInput && (
                    <div style={{
                        textAlign: 'center',
                        color: '#ccc',
                        marginTop: '60px',
                        fontStyle: 'italic'
                    }}>
                        No recommendations found. Try different mood keywords.
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

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
                    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
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

export default MoodRecommender;