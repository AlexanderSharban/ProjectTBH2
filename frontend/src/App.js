import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import CrudList from './components/CrudList';
import Home from './components/Home';
import Creators from './app/creators/page';
import Tetris from './app/tetris/page';
import Minesweeper from './app/minesweeper/page';
import Pingpong from './app/pingpong/page';
import Tamagotchi from './app/tamagotchi/page';
import Projects from './app/projects/page';
import News from './app/news/page';
import './App.css';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Layout>

        {/* Admin navigation for logged in users */}
        {isLoggedIn && (
          <div style={{
            backgroundColor: '#0A192F',
            padding: '10px',
            borderBottom: '1px solid #00FFAA',
            textAlign: 'center'
          }}>
            <Link to="/" style={{ color: '#00FFAA', margin: '0 15px', textDecoration: 'none' }}>Home</Link>
            <Link to="/users" style={{ color: '#00FFAA', margin: '0 15px', textDecoration: 'none' }}>Users</Link>
            <Link to="/creators" style={{ color: '#00FFAA', margin: '0 15px', textDecoration: 'none' }}>Creators</Link>
            <Link to="/games" style={{ color: '#00FFAA', margin: '0 15px', textDecoration: 'none' }}>Games</Link>
            <Link to="/projects" style={{ color: '#00FFAA', margin: '0 15px', textDecoration: 'none' }}>Projects</Link>
            <Link to="/news" style={{ color: '#00FFAA', margin: '0 15px', textDecoration: 'none' }}>News</Link>
            <Link to="/tetris" style={{ color: '#00FFAA', margin: '0 15px', textDecoration: 'none' }}>Tetris</Link>
            <Link to="/minesweeper" style={{ color: '#00FFAA', margin: '0 15px', textDecoration: 'none' }}>Minesweeper</Link>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<CrudList endpoint="users" fields={['email', 'username', 'passwordHash']} title="Users" />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/games" element={<CrudList endpoint="games" fields={['title', 'slug', 'description', 'creatorId']} title="Games" />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<News />} />
          <Route path="/tetris" element={<Tetris />} />
          <Route path="/minesweeper" element={<Minesweeper />} />
          <Route path="/pingpong" element={<Pingpong />} />
          <Route path="/tamagotchi" element={<Tamagotchi />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
