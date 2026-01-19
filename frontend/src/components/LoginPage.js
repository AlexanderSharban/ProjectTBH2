import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const data = isLogin ? { email, password } : { email, password, username };

      const response = await api.post(endpoint, data);
      localStorage.setItem('token', response.data.token);
      alert('Success!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('Вы успешно вышли из системы!');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#0A192F',
        padding: '40px',
        borderRadius: '8px',
        border: '2px solid #00FFAA',
        color: '#00FFAA',
        minWidth: '400px',
        maxWidth: '500px',
        width: '100%'
      }}>
        {isLoggedIn ? (
          // Показываем интерфейс для выхода
          <>
            <h1 style={{
              textAlign: 'center',
              marginBottom: '30px',
              fontSize: '2.5rem',
              color: '#00FFAA'
            }}>
              ПРОФИЛЬ
            </h1>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                Вы уже вошли в систему
              </p>
              <button
                onClick={handleLogout}
                style={{
                  padding: '15px 30px',
                  backgroundColor: '#FF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#FF6666'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#FF4444'}
              >
                Выйти из системы
              </button>
            </div>
          </>
        ) : (
          // Показываем форму входа/регистрации
          <>
            <h1 style={{
              textAlign: 'center',
              marginBottom: '30px',
              fontSize: '2.5rem',
              color: '#00FFAA'
            }}>
              {isLogin ? 'ВХОД' : 'РЕГИСТРАЦИЯ'}
            </h1>

            <div style={{
              display: 'flex',
              marginBottom: '30px',
              backgroundColor: '#1a1a1a',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => setIsLogin(true)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: isLogin ? '#00FFAA' : '#1a1a1a',
                  color: isLogin ? '#0A192F' : '#00FFAA',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Войти
              </button>
              <button
                onClick={() => setIsLogin(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: !isLogin ? '#00FFAA' : '#1a1a1a',
                  color: !isLogin ? '#0A192F' : '#00FFAA',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Регистрация
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    Имя пользователя:
                  </label>
                  <input
                    type="text"
                    placeholder="Введите имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #00FFAA',
                      borderRadius: '4px',
                      color: '#00FFAA',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #00FFAA',
                    borderRadius: '4px',
                    color: '#00FFAA',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  Пароль:
                </label>
                <input
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #00FFAA',
                    borderRadius: '4px',
                    color: '#00FFAA',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#00FFAA',
                  color: '#0A192F',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#00FFCC'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#00FFAA'}
              >
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </form>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #00FFAA',
              color: '#00FFAA',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Назад на главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;