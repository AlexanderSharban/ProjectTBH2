import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
  });
  const [commentText, setCommentText] = useState('');
  const [newNewsId, setNewNewsId] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (newNewsId) {
      const timer = setTimeout(() => setNewNewsId(null), 5000); // Убрать выделение через 5 секунд
      return () => clearTimeout(timer);
    }
  }, [newNewsId]);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      console.log('Fetched news:', response.data);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchComments = async (newsId) => {
    try {
      const response = await api.get(`/news-comments/news/${newsId}`);
      setComments(prev => ({ ...prev, [newsId]: response.data }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchLikes = async (newsId) => {
    try {
      const response = await api.get(`/news-likes/news/${newsId}`);
      setLikes(prev => ({ ...prev, [newsId]: response.data.length }));
      // Check if user liked
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;
        const userLike = response.data.find(like => like.userId === userId);
        setUserLikes(prev => ({ ...prev, [newsId]: !!userLike }));
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async (newsId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      if (userLikes[newsId]) {
        // Unlike
        await api.delete(`/news-likes/${userLikes[newsId].id}`);
        setLikes(prev => ({ ...prev, [newsId]: prev[newsId] - 1 }));
        setUserLikes(prev => ({ ...prev, [newsId]: false }));
      } else {
        // Like
        const response = await api.post('/news-likes', { userId, newsId });
        setLikes(prev => ({ ...prev, [newsId]: (prev[newsId] || 0) + 1 }));
        setUserLikes(prev => ({ ...prev, [newsId]: response.data }));
      }
    } catch (error) {
      console.error('Error liking:', error);
    }
  };

  const handleComment = async (newsId) => {
    if (!commentText.trim()) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      await api.post('/news-comments', { userId, newsId, content: commentText });
      setCommentText('');
      fetchComments(newsId);
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const creatorId = payload.creatorId;

      await api.post('/news', {
        ...formData,
        creatorId,
      });
      setFormData({ title: '', content: '', excerpt: '', slug: '' });
      setShowCreateForm(false);
      alert('Новость успешно создана!');
      await fetchNews();
      setNewNewsId(Date.now());
    } catch (error) {
      console.error('Error creating news:', error);
      alert('Ошибка при создании новости: ' + error.response?.data?.message || error.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-16 text-[#00FFAA] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-[#00FFAA] text-center">НОВОСТИ</h1>

      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-8 px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]"
      >
        {showCreateForm ? 'Отмена' : 'Создать новость'}
      </button>

      {showCreateForm && (
        <form onSubmit={handleCreateNews} className="w-full max-w-2xl mb-8 p-6 border-2 border-[#00FFAA] rounded-lg">
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
            <label className="block mb-2">Содержание</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Краткое описание</label>
            <input
              type="text"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
            />
          </div>
          <button type="submit" disabled={creating} className="px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC] disabled:opacity-50">
            {creating ? 'Создание...' : 'Создать'}
          </button>
        </form>
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {news.map((item, index) => (
          <div
            key={item.id}
            className={`border-2 border-[#00FFAA] rounded-lg overflow-hidden hover:border-[#00FFCC] transition-colors p-6 ${index === 0 && newNewsId ? 'animate-pulse bg-[#00FFAA]/10' : ''}`}
          >
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p className="text-sm text-[#00FFAA]/70 mb-4">{item.excerpt}</p>
            <p className="text-base">{item.content}</p>
            <p className="text-xs mt-4">Creator ID: {item.creatorId}</p>

            <div className="mt-4">
              <button
                onClick={() => { handleLike(item.id); fetchLikes(item.id); }}
                className={`px-4 py-2 font-bold rounded hover:bg-[#00FFCC] ${userLikes[item.id] ? 'bg-red-500 text-white' : 'bg-[#00FFAA] text-black'}`}
              >
                {userLikes[item.id] ? 'Убрать лайк' : 'Лайк'} ({likes[item.id] || 0})
              </button>
              <button
                onClick={() => { fetchComments(item.id); fetchLikes(item.id); }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 ml-2"
              >
                Показать комментарии и лайки
              </button>
            </div>

            <div className="mt-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Напишите комментарий..."
                className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded mb-2"
                rows="2"
              />
              <button
                onClick={() => handleComment(item.id)}
                className="px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]"
              >
                Отправить
              </button>
            </div>

            {comments[item.id] && (
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Комментарии:</h3>
                {comments[item.id].map((comment) => (
                  <div key={comment.id} className="border-t border-[#00FFAA]/50 pt-2 mt-2">
                    <p className="text-sm">{comment.content}</p>
                    <p className="text-xs text-[#00FFAA]/70">User ID: {comment.userId}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}