import React, { useEffect, useState } from 'react';

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

    useEffect(() => {
        // For demo purposes, we'll use mock data
        const mockSongs: Song[] = [
            {
                id: "1",
                title: "INOCHI 2024 Ver",
                file: "inochi_2024.flac",
                cover: "inochi_2024.jpg",
                duration: "4:30",
                mood: ["emotional", "uplifting"],
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
                releaseDate: "10/15/08",
                played: "16,000"
            },
            {
                id: "2",
                title: "表亲カンパネラ",
                file: "song2.flac",
                cover: "song2.jpg",
                duration: "4:10",
                mood: ["energetic", "happy"],
                description: "Another great song by AZKi",
                releaseDate: "10/05/14",
                played: "16,000"
            },
            {
                id: "3",
                title: "Creating World",
                file: "song3.flac",
                cover: "song3.jpg",
                duration: "4:40",
                mood: ["chill", "relaxing"],
                description: "A relaxing track for your day",
                releaseDate: "10/04/02",
                played: "16,000"
            },
            {
                id: "4",
                title: "Without U",
                file: "song4.flac",
                cover: "song4.jpg",
                duration: "5:20",
                mood: ["emotional", "deep"],
                description: "Deep emotional song",
                releaseDate: "10/06/04",
                played: "16,000"
            },
            {
                id: "5",
                title: "Inoclit",
                file: "song5.flac",
                cover: "song5.jpg",
                duration: "5:30",
                mood: ["energetic", "powerful"],
                description: "Powerful and energetic track",
                releaseDate: "10/07/03",
                played: "16,000"
            }
        ];

        setSongs(mockSongs);
        setFeatured(mockSongs[0]);
    }, []);

    // Only show 3 songs at first, show all if showAll is true
    const initialVisible = 3;
    const visibleSongs = showAll ? songs : songs.slice(0, initialVisible);

    return (
        <div style={{
            background: '#1B1B1B',
            minHeight: '100vh',
            color: 'white',
            padding: '0 0 120px 0', // padding bottom agar tidak tertutup player bar
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
                            <button style={{
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
                                }}>
                                PLAY
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
                                    <th style={{ padding: '20px', width: '40%' }}>Name</th>
                                    <th style={{ padding: '20px', width: '20%' }}>Release Date</th>
                                    <th style={{ padding: '20px', width: '15%' }}>Played</th>
                                    <th style={{ padding: '20px', width: '15%' }}>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleSongs.map((song, index) => (
                                    <tr key={song.id} style={{
                                        borderBottom: index < visibleSongs.length - 1 ? '1px solid #333' : 'none',
                                        transition: 'background 0.2s ease'
                                    }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = '#333';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}>
                                        <td style={{ padding: '20px', fontWeight: '500' }}>{index + 1}</td>
                                        <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
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
                                        <td style={{ padding: '20px', color: '#ccc' }}>{song.releaseDate}</td>
                                        <td style={{ padding: '20px', color: '#ccc' }}>{song.played}</td>
                                        <td style={{ padding: '20px', color: '#ccc' }}>{song.duration}</td>
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