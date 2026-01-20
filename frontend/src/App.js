import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import RegisterPage from './app/register/page';
import CrudList from './components/CrudList';
import Home from './components/Home';
import Projects from './app/projects/page';
import ProjectPage from './app/projects/[slug]/page';
import Gallery from './app/gallery/page';
import News from './app/news/page';
import Contacts from './app/contacts/page';
import Minesweeper from './app/minesweeper/page';
import Tetris from './app/tetris/page';
import Pingpong from './app/pingpong/page';
import Tamagotchi from './app/tamagotchi/page';
import Survival from './app/survival/page';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<CrudList endpoint="users" fields={['email', 'username', 'passwordHash']} title="Users" />} />
          <Route path="/creators" element={<CrudList endpoint="creators" fields={['userId', 'name', 'bio', 'avatarUrl']} title="Creators" />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/minesweeper" element={<Minesweeper />} />
          <Route path="/tetris" element={<Tetris />} />
          <Route path="/pingpong" element={<Pingpong />} />
          <Route path="/tamagotchi" element={<Tamagotchi />} />
          <Route path="/survival" element={<Survival />} />
          <Route path="/project-photos" element={<CrudList endpoint="project-photos" fields={['projectId', 'url', 'description', 'isPrimary']} title="Project Photos" />} />
          <Route path="/user-game-scores" element={<CrudList endpoint="user-game-scores" fields={['userId', 'gameId', 'maxScore']} title="User Game Scores" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
