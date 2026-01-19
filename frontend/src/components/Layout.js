import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const socialLinks = [
    "https://nodejs.org/en",
    "https://git-scm.com/",
    "https://google.com",
    "https://google.com",
    "https://google.com",
    "https://google.com",
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'black',
      color: '#00FFAA',
      fontFamily: 'var(--font-geist-sans), sans-serif'
    }}>
      {/* Шапка сайта */}
      <div style={{
        width: '100%',
        height: '128px',
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src="/png8.png"
          alt="Header"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Навигация и аватарка */}
      <div style={{
        width: '100%',
        backgroundColor: '#0A192F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid #00FFAA'
      }}>
        <Link to="/" style={{ flexShrink: 0 }}>
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #00FFAA',
            margin: '8px 0'
          }}>
            <img
              src="/png7.png"
              alt="Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </Link>

        <nav style={{
          fontSize: '20px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          padding: '16px 0',
          color: '#00FFAA'
        }}>
          <Link to="/" style={{
            textDecoration: 'none',
            color: '#00FFAA'
          }}>
            <span className="hover:underline hover:text-[#00FFCC]">
              ДОМ
            </span>
          </Link>
          <Link to="/projects" style={{
            textDecoration: 'none',
            color: '#00FFAA'
          }}>
            <span className="hover:underline hover:text-[#00FFCC]">
              ПРОЕКТЫ
            </span>
          </Link>
          <Link to="/gallery" style={{
            textDecoration: 'none',
            color: '#00FFAA'
          }}>
            <span className="hover:underline hover:text-[#00FFCC]">
              ГАЛЕРЕЯ
            </span>
          </Link>
          <Link to="/creators" style={{
            textDecoration: 'none',
            color: '#00FFAA'
          }}>
            <span className="hover:underline hover:text-[#00FFCC]">
              КРЕАТОРЫ
            </span>
          </Link>
          <Link to="/contacts" style={{
            textDecoration: 'none',
            color: '#00FFAA'
          }}>
            <span className="hover:underline hover:text-[#00FFCC]">
              КОНТАКТЫ
            </span>
          </Link>
          <Link to="/news" style={{
            textDecoration: 'none',
            color: '#00FFAA'
          }}>
            <span className="hover:underline hover:text-[#00FFCC]">
              НОВОСТИ
            </span>
          </Link>
          <Link to="/login" style={{
            textDecoration: 'none',
            color: '#00FFAA'
          }}>
            <span className="hover:underline hover:text-[#00FFCC]">
              ВХОД
            </span>
          </Link>
        </nav>

        <div style={{ width: '96px', flexShrink: 0 }}></div>
      </div>

      {/* Контент страниц */}
      <main>{children}</main>

      {/* Футер с соцсетями */}
      <footer style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        paddingBottom: '40px',
        color: '#00FFAA'
      }}>
        {socialLinks.map((link, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              transition: 'transform 0.2s'
            }}
            className="hover:scale-110"
          >
            <img
              src={`/png${i + 1}.png`}
              alt={`Social ${i + 1}`}
              style={{
                width: '52px',
                height: '52px',
                filter: 'brightness(1.1)'
              }}
              className="hover:brightness-125"
            />
          </a>
        ))}
      </footer>
    </div>
  );
};

export default Layout;