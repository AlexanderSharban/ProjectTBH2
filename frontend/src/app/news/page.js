import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-16 text-[#00FFAA] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-[#00FFAA] text-center">НОВОСТИ</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {news.map((item) => (
          <div
            key={item.id}
            className="border-2 border-[#00FFAA] rounded-lg overflow-hidden hover:border-[#00FFCC] transition-colors p-6"
          >
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p className="text-sm text-[#00FFAA]/70 mb-4">{item.excerpt}</p>
            <p className="text-base">{item.content}</p>
            <p className="text-xs mt-4">Creator ID: {item.creatorId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}