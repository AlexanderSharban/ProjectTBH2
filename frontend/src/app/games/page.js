import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    gameUrl: '',
    featured: false,
  });
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (games.length > 0 && currentIndex < games.length) {
      const currentGame = games[currentIndex];
      fetchComments(currentGame.id);
      fetchLikes(currentGame.id);
    }
  }, [currentIndex, games]);

  const fetchGames = async () => {
    try {
      const response = await api.get('/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const fetchComments = async (gameId) => {
    try {
      const response = await api.get(`/game-comments/game/${gameId}`);
      setComments(prev => ({ ...prev, [gameId]: response.data }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchLikes = async (gameId) => {
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
  };

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

  const handleCreateGame = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const creatorId = payload.creatorId;

      await api.post('/games', {
        ...formData,
        creatorId,
      });
      setFormData({ title: '', description: '', gameUrl: '', featured: false });
      setShowCreateForm(false);
      fetchGames();
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const prevGame = () => {
    setCurrentIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const nextGame = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  };

  if (games.length === 0) return <div>Loading...</div>;

  const currentGame = games[currentIndex];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-16 text-[#00FFAA] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-[#00FFAA] text-center">ИГРЫ</h1>

      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-8 px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]"
      >
        {showCreateForm ? 'Отмена' : 'Создать игру'}
      </button>

      {showCreateForm && (
        <form onSubmit={handleCreateGame} className="w-full max-w-2xl mb-8 p-6 border-2 border-[#00FFAA] rounded-lg">
          <div className="mb-4">
            <label className="block mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">URL игры</label>
            <input
              type="url"
              value={formData.gameUrl}
              onChange={(e) => setFormData({ ...formData, gameUrl: e.target.value })}
              className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              Рекомендуемая
            </label>
          </div>
          <button type="submit" className="px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]">
            Создать
          </button>
        </form>
      )}

      {/* Карусель игр */}
      <div className="relative w-full max-w-4xl h-[600px] mb-16">
        {/* Кнопки навигации */}
        <button
          onClick={prevGame}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#00FFAA] text-[#0A192F] p-3 rounded-full z-10 hover:bg-[#00FFCC] transition-colors"
        >
          ‹
        </button>
        <button
          onClick={nextGame}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#00FFAA] text-[#0A192F] p-3 rounded-full z-10 hover:bg-[#00FFCC] transition-colors"
        >
          ›
        </button>

        {/* Текущая игра */}
        <div className="w-full h-full bg-[#0A192F] border-2 border-[#00FFAA] rounded-lg overflow-hidden flex flex-col">
          <div className="h-2/3 relative">
            <iframe
              src={currentGame.gameUrl || '/game-placeholder.html'}
              title={currentGame.title}
              className="w-full h-full border-0"
            />
          </div>
          <div className="h-1/3 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">{currentGame.title}</h2>
            <p className="text-lg mb-2">{currentGame.description}</p>
            <p className="text-sm">{currentGame.creatorId}</p>
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => handleLike(currentGame.id)}
                className={`px-3 py-1 rounded ${userLikes[currentGame.id] ? 'bg-red-500' : 'bg-[#00FFAA]'} text-black font-bold`}
              >
                {userLikes[currentGame.id] ? 'Unlike' : 'Like'} ({likes[currentGame.id] || 0})
              </button>
              <button
                onClick={() => setShowComments(!showComments)}
                className="px-3 py-1 bg-[#00FFAA] text-black font-bold rounded"
              >
                Comments ({comments[currentGame.id]?.length || 0})
              </button>
            </div>
            {showComments && (
              <div className="mt-4">
                <div className="max-h-40 overflow-y-auto mb-4">
                  {comments[currentGame.id]?.map(comment => (
                    <div key={comment.id} className="mb-2 p-2 bg-[#0A192F] border border-[#00FFAA] rounded">
                      <p className="text-sm">{comment.content}</p>
                      <p className="text-xs text-gray-400">User {comment.userId}</p>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded-l"
                  />
                  <button
                    onClick={() => handleComment(currentGame.id)}
                    className="px-4 py-2 bg-[#00FFAA] text-black font-bold rounded-r"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Индикаторы */}
      <div className="flex space-x-2">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#00FFAA]' : 'bg-[#00FFAA]/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}