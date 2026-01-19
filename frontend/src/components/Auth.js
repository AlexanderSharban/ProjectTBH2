import React, { useState } from 'react';
import api from '../api';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const data = isLogin ? { email, password } : { email, password, username };

      const response = await api.post(endpoint, data);
      localStorage.setItem('token', response.data.token);
      alert('Success!');
      window.location.reload();
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#0A192F',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #00FFAA',
      color: '#00FFAA',
      minWidth: '300px',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        <button
          onClick={() => setIsLogin(true)}
          style={{
            flex: 1,
            padding: '8px',
            backgroundColor: isLogin ? '#00FFAA' : '#0A192F',
            color: isLogin ? '#0A192F' : '#00FFAA',
            border: '1px solid #00FFAA',
            borderRadius: '4px 0 0 4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          style={{
            flex: 1,
            padding: '8px',
            backgroundColor: !isLogin ? '#00FFAA' : '#0A192F',
            color: !isLogin ? '#0A192F' : '#00FFAA',
            border: '1px solid #00FFAA',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={!isLogin}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              backgroundColor: '#0A192F',
              border: '1px solid #00FFAA',
              borderRadius: '4px',
              color: '#00FFAA'
            }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            backgroundColor: '#0A192F',
            border: '1px solid #00FFAA',
            borderRadius: '4px',
            color: '#00FFAA'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '15px',
            backgroundColor: '#0A192F',
            border: '1px solid #00FFAA',
            borderRadius: '4px',
            color: '#00FFAA'
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#00FFAA',
            color: '#0A192F',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Auth;