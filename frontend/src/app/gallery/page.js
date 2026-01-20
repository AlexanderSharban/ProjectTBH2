import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState({});
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    projectId: '',
    url: '',
    description: '',
    isPrimary: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await api.get('/project-photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const fetchComments = async (photoId) => {
    try {
      const response = await api.get(`/project-photo-comments/project-photo/${photoId}`);
      setComments(prev => ({ ...prev, [photoId]: response.data }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchLikes = async (photoId) => {
    try {
      const response = await api.get(`/project-photo-likes/project-photo/${photoId}`);
      setLikes(prev => ({ ...prev, [photoId]: response.data.length }));
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;
        const userLike = response.data.find(like => like.userId === userId);
        setUserLikes(prev => ({ ...prev, [photoId]: userLike }));
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async (photoId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      if (userLikes[photoId]) {
        await api.delete(`/project-photo-likes/${userLikes[photoId].id}`);
        setLikes(prev => ({ ...prev, [photoId]: prev[photoId] - 1 }));
        setUserLikes(prev => ({ ...prev, [photoId]: false }));
      } else {
        const response = await api.post('/project-photo-likes', { userId, projectPhotoId: photoId });
        setLikes(prev => ({ ...prev, [photoId]: (prev[photoId] || 0) + 1 }));
        setUserLikes(prev => ({ ...prev, [photoId]: response.data }));
      }
    } catch (error) {
      console.error('Error liking:', error);
    }
  };

  const handleComment = async (photoId) => {
    if (!commentText.trim()) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      await api.post('/project-photo-comments', { userId, projectPhotoId: photoId, content: commentText });
      setCommentText('');
      fetchComments(photoId);
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const toggleComments = (photoId) => {
    setShowComments(prev => ({ ...prev, [photoId]: !prev[photoId] }));
    if (!showComments[photoId]) {
      fetchComments(photoId);
      fetchLikes(photoId);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert('Please select a file');

    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('projectId', uploadData.projectId);
      formData.append('description', uploadData.description);
      formData.append('isPrimary', uploadData.isPrimary);

      await api.post('/project-photos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadData({ projectId: '', url: '', description: '', isPrimary: false });
      setSelectedFile(null);
      setShowUpload(false);
      fetchPhotos();
      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo');
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-16 text-[#00FFAA] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-[#00FFAA] text-center">ГАЛЕРЕЯ</h1>

      <button
        onClick={() => setShowUpload(!showUpload)}
        className="mb-8 px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]"
      >
        {showUpload ? 'Отмена' : 'Загрузить фото'}
      </button>

      {showUpload && (
        <form onSubmit={handleUpload} className="w-full max-w-2xl mb-8 p-6 border-2 border-[#00FFAA] rounded-lg">
          <div className="mb-4">
            <label className="block mb-2">Project ID</label>
            <input
              type="number"
              value={uploadData.projectId}
              onChange={(e) => setUploadData({ ...uploadData, projectId: e.target.value })}
              className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Выберите фото (JPG/PNG)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Описание</label>
            <textarea
              value={uploadData.description}
              onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
              className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
              rows="3"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={uploadData.isPrimary}
                onChange={(e) => setUploadData({ ...uploadData, isPrimary: e.target.checked })}
                className="mr-2"
              />
              Основное фото
            </label>
          </div>
          <button type="submit" className="px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]">
            Загрузить
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="border-2 border-[#00FFAA] rounded-lg overflow-hidden relative"
          >
            <img
              src={photo.url}
              alt={photo.description}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-sm">{photo.description}</p>
            </div>
            {/* Кнопки в уголке */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleLike(photo.id)}
                className={`w-8 h-8 rounded-full ${userLikes[photo.id] ? 'bg-red-500' : 'bg-[#00FFAA]'} text-black flex items-center justify-center text-sm`}
              >
                👍
              </button>
              <button
                onClick={() => toggleComments(photo.id)}
                className="w-8 h-8 bg-[#00FFAA] text-black rounded-full flex items-center justify-center text-sm"
              >
                💬
              </button>
            </div>
            {/* Окошко комментариев */}
            {showComments[photo.id] && (
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-80 border border-[#00FFAA] rounded p-2 max-h-40 overflow-y-auto">
                <div className="text-xs mb-2">Likes: {likes[photo.id] || 0}</div>
                <div className="max-h-20 overflow-y-auto mb-2">
                  {comments[photo.id]?.map(comment => (
                    <div key={comment.id} className="border-b border-[#00FFAA] py-1 text-xs">
                      {comment.content} - User {comment.userId}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Comment..."
                  className="w-full p-1 bg-black border border-[#00FFAA] text-[#00FFAA] rounded text-xs"
                />
                <button
                  onClick={() => handleComment(photo.id)}
                  className="mt-1 px-2 py-1 bg-[#00FFAA] text-black rounded text-xs"
                >
                  Post
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}