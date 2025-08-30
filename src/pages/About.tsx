import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{
      background: '#1B1B1B',
      minHeight: '100vh',
      color: 'white',
      padding: '0',
      margin: '0',
      fontFamily: '"Poppins", sans-serif',
      overflowX: 'hidden'
    }}>

      <div style={{
        maxWidth: '1500px',
        margin: '0 auto',
        padding: '0 15px'
      }}>
        {/* About Content with Image */}
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'flex-start',
          
        }}>
          {/* Image Section */}
          <div style={{
            flex: '0 0 300px',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '60px'
          }}>
            <img
              src="/assets/images/AZKi.png"
              alt="AZKI"
              style={{
                width: '730px',
                maxWidth: '1000px',
                height: '800px',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Text Content */}
          <div style={{
            background: '#1b1b1b',
            borderRadius: '8px',
            padding: '80px 1px 0px 1px',
            flex: '1',
            lineHeight: '1.8',
            fontSize: '22px',
            color: '#ccc'
          }}>
            <h2 style={{
              textAlign: 'center',
              fontWeight: '200',
              letterSpacing: '3px',
              fontSize: '30px',
              margin: '25px 0',
              color: '#FFFF',
              textTransform: 'uppercase'
            }}>
              ABOUT <span style={{ color: '#FA3689' }}>AZKI</span>
            </h2>
            <p style={{
              margin: '0',
              lineHeight: '1.6',
              textAlign: 'center'
            }}>
              AZKi, atau dikenal juga sebagai Virtual Diva AZKi, adalah VTuber penyanyi solo dari Hololive Production. Ia tergabung dalam Generasi 0 bersama Tokino Sora, Roboco-san, Sakura Miko, dan Hoshimachi Suisei. AZKi memulai debutnya pada 15 November 2018 melalui video cover Just Be Friends.
              Sebagai “diva virtual yang dibangkitkan kembali di dunia maya untuk mencipta dunia baru,” AZKi dikenal dengan suara yang emosional, penuh kekuatan, dan mampu menyampaikan perasaan mendalam lewat musik. Ia tidak terpaku pada satu genre, melainkan mengeksplorasi berbagai gaya musik mulai dari pop, rock, elektronik, hingga balada.
              Awalnya bernaung di bawah label INoNaKa Music, sejak 1 April 2022 AZKi resmi pindah ke cabang utama Hololive. Hingga kini, ia terus berkarya melalui konser virtual, kolaborasi lintas artis, serta merilis lagu-lagu orisinal yang memperkuat posisinya sebagai ikon musik virtual.
            </p>
            <div style={{
              textAlign: 'center',
              
            }}>
              <h3 style={{
                fontWeight: '400',
                letterSpacing: '2px',
                fontSize: '18px',
                marginBottom: '20px',
                color: '#FFFF',
                textTransform: 'uppercase'
              }}>
                Follow her in life!
              </h3>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                {/* Social Media Links */}
                {[
                  { name: 'Twitter', url: 'https://x.com/azki_vdiva' },
                  { name: 'YouTube', url: 'https://www.youtube.com/@AZKi' },
                ].map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'transparent',
                      color: '#FA3689',
                      border: '2px solid #FA3689',
                      borderRadius: '20px',
                      padding: '8px 20px',
                      fontWeight: '500',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#FA3689';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#FA3689';
                    }}
                  >
                    {platform.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Add Poppins font from Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
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

export default About;