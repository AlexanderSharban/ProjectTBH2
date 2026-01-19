import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [opened, setOpened] = useState([false, false, false, false, false]);

  const gameLinks = [
    '/minesweeper',
    '/tetris',
    '/pingpong',
    '/tamagotchi',
    '/survival',
  ];

  const gameImages = [
    '/png9.png', // для minesweeper
    '/png10.png', // для tetris
    '/png11.png', // для pingpong
    '/png12.png', // для tamagotchi
    '/png13.png', // для survival
  ];

  const handleClick = (index) => {
    if (!opened[index]) {
      window.open('https://google.com', '_blank');
      setOpened((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '16px',
      padding: '32px 64px'
    }}>
      {[...Array(5)].map((_, i) => (
        opened[i] ? (
          <Link
            key={i}
            to={gameLinks[i]}
            style={{
              backgroundColor: 'black',
              border: '2px solid #00FFAA',
              borderRadius: '8px',
              height: '32rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden'
            }}
            className="hover:opacity-90 hover:border-[#00FFCC] transition"
          >
            <img
              src={gameImages[i]}
              alt={`Game ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Link>
        ) : (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              backgroundColor: 'black',
              border: '2px solid #00FFAA',
              borderRadius: '8px',
              height: '32rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            className="hover:opacity-90 hover:border-[#00FFCC] transition"
          >
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(30, 58, 138, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem'
            }}>
              🔒
            </div>
          </div>
        )
      ))}
    </section>
  );
};

export default Home;