import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Home = () => {
  const [games, setGames] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState({});
  const [showCreateGameForm, setShowCreateGameForm] = useState(false);
  const [gameFormData, setGameFormData] = useState({
    title: '',
    slug: '',
    description: '',
    creatorId: '',
  });

  const handleCreateGame = async (e) => {
    e.preventDefault();
    try {
      await api.post('/games', gameFormData);
      setGameFormData({ title: '', slug: '', description: '', creatorId: '' });
      setShowCreateGameForm(false);
      fetchGames();
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

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

  const fetchLikes = useCallback(async (gameId) => {
    try {
      const response = await api.get(`/game-likes/game/${gameId}`);
      setLikes(prev => ({ ...prev, [gameId]: response.data.length }));
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;
        const userLike = response.data.find(like => like.userId === userId);
        setUserLikes(prev => ({ ...prev, [gameId]: userLike }));
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }, []);

  const fetchGames = useCallback(async () => {
    try {
      const response = await api.get('/games');
      const gamesData = response.data.slice(0, 5);
      setGames(gamesData);
      // Загрузить лайки для каждой игры
      for (const game of gamesData) {
        fetchLikes(game.id);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }, [fetchLikes]);

  const fetchComments = async (gameId) => {
    try {
      const response = await api.get(`/game-comments/game/${gameId}`);
      setComments(prev => ({ ...prev, [gameId]: response.data }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleLike = async (gameId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      if (userLikes[gameId]) {
        await api.delete(`/game-likes/${userLikes[gameId].id}`);
        setLikes(prev => ({ ...prev, [gameId]: prev[gameId] - 1 }));
        setUserLikes(prev => ({ ...prev, [gameId]: false }));
      } else {
        const response = await api.post('/game-likes', { userId, gameId });
        setLikes(prev => ({ ...prev, [gameId]: (prev[gameId] || 0) + 1 }));
        setUserLikes(prev => ({ ...prev, [gameId]: response.data }));
      }
    } catch (error) {
      console.error('Error liking:', error);
    }
  };

  const handleComment = async (gameId) => {
    if (!commentText.trim()) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      await api.post('/game-comments', { userId, gameId, content: commentText });
      setCommentText('');
      fetchComments(gameId);
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const toggleComments = (gameId) => {
    setShowComments(prev => ({ ...prev, [gameId]: !prev[gameId] }));
    if (!showComments[gameId]) {
      fetchComments(gameId);
      fetchLikes(gameId);
    }
  };

  return (
    <div>
      <button onClick={() => setShowCreateGameForm(!showCreateGameForm)} style={{ margin: '16px', padding: '8px 16px', backgroundColor: '#00FFAA', color: 'black', border: 'none', borderRadius: '4px' }}>
        {showCreateGameForm ? 'Hide Create Game' : 'Create Game'}
      </button>
      {showCreateGameForm && (
        <form onSubmit={handleCreateGame} style={{ margin: '16px', padding: '16px', backgroundColor: '#0A192F', border: '2px solid #00FFAA', borderRadius: '8px' }}>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ color: '#00FFAA' }}>Title:</label>
            <input
              type="text"
              value={gameFormData.title}
              onChange={(e) => setGameFormData({ ...gameFormData, title: e.target.value })}
              required
              style={{ marginLeft: '8px', padding: '4px', backgroundColor: 'black', color: '#00FFAA', border: '1px solid #00FFAA' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ color: '#00FFAA' }}>Slug:</label>
            <input
              type="text"
              value={gameFormData.slug}
              onChange={(e) => setGameFormData({ ...gameFormData, slug: e.target.value })}
              required
              style={{ marginLeft: '8px', padding: '4px', backgroundColor: 'black', color: '#00FFAA', border: '1px solid #00FFAA' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ color: '#00FFAA' }}>Description:</label>
            <input
              type="text"
              value={gameFormData.description}
              onChange={(e) => setGameFormData({ ...gameFormData, description: e.target.value })}
              style={{ marginLeft: '8px', padding: '4px', backgroundColor: 'black', color: '#00FFAA', border: '1px solid #00FFAA' }}
            />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ color: '#00FFAA' }}>Creator ID:</label>
            <input
              type="number"
              value={gameFormData.creatorId}
              onChange={(e) => setGameFormData({ ...gameFormData, creatorId: parseInt(e.target.value) || '' })}
              required
              style={{ marginLeft: '8px', padding: '4px', backgroundColor: 'black', color: '#00FFAA', border: '1px solid #00FFAA' }}
            />
          </div>
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#00FFAA', color: 'black', border: 'none', borderRadius: '4px' }}>Create</button>
        </form>
      )}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        padding: '32px 64px'
      }}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'black',
            border: '2px solid #00FFAA',
            borderRadius: '8px',
            height: '32rem',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="hover:opacity-90 hover:border-[#00FFCC] transition"
        >
          <Link to={gameLinks[i]} style={{ flex: 1, display: 'block' }}>
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
            {/* Кнопки в уголке */}
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              display: 'flex',
              gap: '4px',
              alignItems: 'center'
            }}>
              <span style={{
                color: '#00FFAA',
                fontSize: '12px',
                marginRight: '4px'
              }}>
                {likes[games[i]?.id] || 0}
              </span>
              <button
                onClick={() => handleLike(games[i]?.id)}
                style={{
                  backgroundColor: userLikes[games[i]?.id] ? '#FF4444' : '#00FFAA',
                  color: 'black',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                👍
              </button>
              <button
                onClick={() => toggleComments(games[i]?.id)}
                style={{
                  backgroundColor: '#00FFAA',
                  color: 'black',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                💬
              </button>
            </div>
            {/* Окошко комментариев */}
            {showComments[games[i]?.id] && (
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                right: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid #00FFAA',
                borderRadius: '4px',
                padding: '8px',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                <div style={{ marginBottom: '8px', fontSize: '12px', color: '#00FFAA' }}>
                  Likes: {likes[games[i]?.id] || 0}
                </div>
                <div style={{ maxHeight: '100px', overflowY: 'auto', marginBottom: '8px' }}>
                  {comments[games[i]?.id]?.map(comment => (
                    <div key={comment.id} style={{
                      borderBottom: '1px solid #00FFAA',
                      padding: '4px 0',
                      fontSize: '12px',
                      color: '#00FFAA'
                    }}>
                      {comment.content} - User {comment.userId}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Comment..."
                  style={{
                    width: '100%',
                    padding: '4px',
                    backgroundColor: 'black',
                    border: '1px solid #00FFAA',
                    color: '#00FFAA',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <button
                  onClick={() => handleComment(games[i]?.id)}
                  style={{
                    marginTop: '4px',
                    backgroundColor: '#00FFAA',
                    color: 'black',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Post
                </button>
              </div>
            )}
          </div>
      ))}
    </section>
    </div>
  );
};

export default Home;