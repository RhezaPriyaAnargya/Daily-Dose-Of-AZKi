import React, { useState } from 'react';



const MoodRecommender: React.FC = () => {
    const [moodInput, setMoodInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recommendation, setRecommendation] = useState('');
    const [error, setError] = useState<string | null>(null);



    // Daftar lagu AZKI
    const azkiSongs = [
        {
            "title": "Creating world",
            "mood": ["dreamy", "uplifting", "inspirational", "semangat", "optimis", "bahagia"],
            "description": "Lagu tentang membangun dunia dan masa depan yang penuh harapan."
        },
        {
            "title": "RealMelancholy",
            "mood": ["melancholic", "emotional", "reflective", "sedih", "galau", "merenung"],
            "description": "Ekspresi mendalam tentang perasaan melankolis dan renungan hati."
        },
        {
            "title": "Felicia",
            "mood": ["warm", "nostalgic", "gentle", "nostalgia", "bahagia", "tenang"],
            "description": "Lagu yang hangat dan nostalgia tentang kenangan indah."
        },
        {
            "title": "I can't control myself",
            "mood": ["intense", "dramatic", "energetic", "marah", "emosi", "semangat"],
            "description": "Ekspresi intens tentang perasaan yang tak terkendali."
        },
        {
            "title": "hikari no machi",
            "mood": ["bright", "hopeful", "soft", "bahagia", "optimis", "tenang"],
            "description": "Lagu tentang kota cahaya dan harapan yang bersinar."
        },
        {
            "title": "Starry Regrets",
            "mood": ["melancholic", "ethereal", "emotional", "sedih", "merenung", "galau"],
            "description": "Penyesalan yang terangkai bagai bintang di langit malam."
        },
        {
            "title": "Fake.Fake.Fake",
            "mood": ["edgy", "energetic", "bold", "marah", "semangat", "pemberontak"],
            "description": "Ekspresi tentang kepalsuan dan pencarian keaslian diri."
        },
        {
            "title": "inochi",
            "mood": ["emotional", "powerful", "motivational", "haru", "semangat", "inspirasi"],
            "description": "Refleksi mendalam tentang arti kehidupan dan eksistensi."
        },
        {
            "title": "shit days",
            "mood": ["angsty", "raw", "cathartic", "marah", "frustrasi", "lelah"],
            "description": "Ekspresi jujur tentang hari-hari sulit dan perasaan frustasi."
        },
        {
            "title": "Sayonara Hero",
            "mood": ["sad", "bittersweet", "nostalgic", "sedih", "haru", "nostalgia"],
            "description": "Perpisahan dengan pahlawan dan kenangan yang tertinggal."
        },
        {
            "title": "from A to Z",
            "mood": ["emotional", "uplifting", "heartfelt", "haru", "semangat", "bahagia"],
            "description": "Perjalanan lengkap dari awal sampai akhir dengan penuh perasaan."
        },
        {
            "title": "ERROR",
            "mood": ["glitchy", "edgy", "tension", "bingung", "marah", "tegang"],
            "description": "Ekspresi tentang kesalahan dan ketidaksempurnaan dalam sistem."
        },
        {
            "title": "without U",
            "mood": ["reflective", "melancholic", "emotional", "sedih", "kesepian", "merenung"],
            "description": "Perasaan kehilangan dan kesendirian tanpa seseorang yang spesial."
        },
        {
            "title": "Kotonoha",
            "mood": ["gentle", "poetic", "dreamy", "tenang", "indah", "puitis"],
            "description": "Kata-kata yang lembut dan penuh makna seperti puisi."
        },
        {
            "title": "LiE,LiE,LiE,LiE",
            "mood": ["playful", "quirky", "energetic", "ceria", "lucu", "unik"],
            "description": "Permainan kata tentang kebohongan dengan irama yang catchy."
        },
        {
            "title": "Inochi (2024 ver.)",
            "mood": ["emotional", "powerful", "uplifting", "haru", "semangat", "inspirasi"],
            "description": "Versi terbaru dari lagu Inochi dengan aransemen yang diperbaharui."
        },
        {
            "title": "Lazy",
            "mood": ["laid-back", "smooth", "cool", "santai", "tenang", "nyantai"],
            "description": "Lagu dengan nuansa santai dan atmosfer keren."
        },
        {
            "title": "Entropy",
            "mood": ["tense", "dynamic", "electronic", "tegang", "energetik", "futuristik"],
            "description": "Energi elektronik yang dinamis dan penuh ketegangan."
        },
        {
            "title": "My Strategy!",
            "mood": ["motivational", "energetic", "determined", "semangat", "strategi", "percaya diri"],
            "description": "Semangat strategi dan tekad yang kuat dalam menghadapi tantangan."
        },
        {
            "title": "Operation Z",
            "mood": ["action-oriented", "pumping", "energetic", "aksi", "semangat", "dramatik"],
            "description": "Nuansa aksi penuh semangat dan adrenalin."
        },
        {
            "title": "Chaotic inner world",
            "mood": ["chaotic", "intense", "psychological", "bingung", "introspektif", "gelisah"],
            "description": "Pergulatan batin dan dunia yang kacau dalam diri."
        },
        {
            "title": "Akenai yoru ga attanara",
            "mood": ["moody", "hopeful", "nighttime", "malam", "harapan", "sunyi"],
            "description": "Nuansa malam tanpa akhir dengan harapan yang tersembunyi."
        },
        {
            "title": "étranger",
            "mood": ["mysterious", "elegant", "melancholic", "misterius", "anggun", "sedih"],
            "description": "Keanggunan misterius yang melankolis."
        },
        {
            "title": "Gogo 8-ji no Kōrasu Song",
            "mood": ["nostalgic", "warm", "afternoon", "nostalgia", "hangat", "siang"],
            "description": "Hangatnya nostalgia di sore hari dengan harmoni koral."
        },
        {
            "title": "Yoru no Rinkaku",
            "mood": ["dark", "mystical", "nighttime", "gelap", "misteri", "malam"],
            "description": "Misteri gelap dalam kontur malam yang memikat."
        },
        {
            "title": "map in the cup",
            "mood": ["whimsical", "creative", "uplifting", "imajinatif", "cerdas", "gembira"],
            "description": "Kreasi imajinatif yang mengangkat suasana penuh kebahagiaan."
        },
        {
            "title": "End roll wa Owaranai",
            "mood": ["bittersweet", "emotional", "nostalgic", "sedih", "haru", "perpisahan"],
            "description": "Tentang akhir yang terus berjalan seperti gulungan akhir dalam cerita."
        },
        {
            "title": "Ai Fukaku",
            "mood": ["deep", "emotional", "serene", "tenang", "mendalam", "sedih"],
            "description": "Ekspresi perasaan mendalam seperti lautan biru yang tenang."
        },
        {
            "title": "FreeGeo",
            "mood": ["free", "uplifting", "light", "riang", "ringan", "bebas"],
            "description": "Rasa kebebasan yang ringan dan menyegarkan."
        },
        {
            "title": "ω neko",
            "mood": ["playful", "cute", "quirky", "imajinatif", "ceria", "lucu"],
            "description": "Ekspresi imut dan nakal seperti kucing omega yang imajinatif."
        }
    ]
        ;


    // Fallback method jika AI tidak tersedia
    const getFallbackRecommendations = (mood: string) => {
        const moodKeywords = mood.toLowerCase().split(' ');

        // Beri skor untuk setiap lagu berdasarkan kecocokan mood
        const scoredSongs = azkiSongs.map(song => {
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

        // Urutkan berdasarkan skor tertinggi dan ambil 3 teratas
        const topSongs = scoredSongs
            .filter(song => song.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        if (topSongs.length === 0) {
            return `Maaf, tidak ada rekomendasi khusus untuk mood "${mood}". Coba gunakan kata kunci yang berbeda seperti happy, sad, energetic, atau calm.`;
        }

        // Generate text recommendation
        let recommendationText = `Berdasarkan mood "${mood}" Anda, saya merekomendasikan lagu-lagu AZKI berikut:\n\n`;

        topSongs.forEach((song, index) => {
            recommendationText += `${index + 1}. ${song.title} - ${song.description} Lagu ini cocok karena memiliki mood ${song.mood.join(', ')}.\n\n`;
        });

        recommendationText += "Dengarkanlah lagu-lagu ini untuk menemukan ketenangan atau semangat yang Anda butuhkan. AZKI selalu punya lagu yang tepat untuk setiap perasaan!";

        return recommendationText;
    };

    const getRecommendations = async () => {
        if (!moodInput.trim()) return;

        setIsLoading(true);
        setError(null);

        // Langsung gunakan fallback recommendation
        const fallbackRecommendation = getFallbackRecommendations(moodInput);
        setRecommendation(fallbackRecommendation);
        setIsLoading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        getRecommendations();
    };

    return (
        <div style={{
            background: '#1B1B1B',
            minHeight: '100vh',
            color: 'white',
            padding: '20px',
            fontFamily: '"Poppins", sans-serif'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
                    Type your mood below and get a song recommendation
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
                                e.currentTarget.style.borderColor = '#FA3689';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#444';
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
                                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                                    Analyzing...
                                </span>
                            ) : (
                                'Recommend'
                            )}
                        </button>
                    </div>
                </form>

                {/* Recommendation Output */}
                {recommendation && (
                    <div style={{
                        background: '#2A2A2A',
                        borderRadius: '16px',
                        padding: '30px',
                        marginBottom: '40px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h3 style={{
                                fontWeight: '600',
                                fontSize: '24px',
                                color: '#FA3689',
                                margin: 0
                            }}>
                                Recommendation
                            </h3>
                            <div style={{
                                color: '#FA3689',
                                fontSize: '14px',
                                background: 'rgba(250, 54, 137, 0.1)',
                                padding: '6px 12px',
                                borderRadius: '20px'
                            }}>
                                <i className="fas fa-robot" style={{ marginRight: '6px' }}></i>
                                Powered by Basic Recommendation
                            </div>
                        </div>

                        <div style={{
                            color: '#ddd',
                            lineHeight: '1.6',
                            fontSize: '16px',
                            whiteSpace: 'pre-line'
                        }}>
                            {recommendation}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !recommendation && moodInput && (
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

            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        `}
            </style>
        </div>
    );
};

export default MoodRecommender;