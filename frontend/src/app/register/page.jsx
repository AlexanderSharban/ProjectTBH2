'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signup', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-[#00FFAA]">
      <h1 className="text-4xl font-bold mb-8 text-center">Регистрация</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Имя пользователя</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Пароль</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 bg-black border border-[#00FFAA] text-[#00FFAA] rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#00FFAA] text-black font-bold rounded hover:bg-[#00FFCC]"
        >
          Зарегистрироваться
        </button>
      </form>

      <p className="mt-4 text-center">
        Уже есть аккаунт? <a href="/login" className="text-[#00FFAA] underline">Войти</a>
      </p>
    </div>
  );
}
