import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function ProfilePage() {
  const [creator, setCreator] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatarUrl: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const creatorId = payload.creatorId;

      const response = await api.get(`/creators/${creatorId}`);
      setCreator(response.data);
      setFormData({
        name: response.data.name,
        bio: response.data.bio,
        avatarUrl: response.data.avatarUrl,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const creatorId = payload.creatorId;

      await api.patch(`/creators/${creatorId}`, formData);
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!creator) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-[#00FFAA]">
      <h1 className="text-4xl font-bold mb-12 text-center">ПРОФИЛЬ</h1>

      <div className="bg-[#0A192F] border-2 border-[#00FFAA] rounded-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src={creator.avatarUrl || '/png14.png'}
            alt={creator.name}
            className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-[#00FFAA]"
          />
          <h2 className="text-2xl font-bold">{creator.name}</h2>
          <p className="text-center">{creator.bio}</p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC] mb-4"
        >
          {isEditing ? 'Отмена' : 'Редактировать профиль'}
        </button>

        {isEditing && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-2">Имя</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Биография</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
                rows="4"
              />
            </div>
            <div>
              <label className="block mb-2">URL аватара</label>
              <input
                type="url"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]"
            >
              Сохранить
            </button>
          </form>
        )}
      </div>
    </div>
  );
}