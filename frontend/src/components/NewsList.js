import React, { useState, useEffect } from 'react';
import api from '../api';

const NewsList = () => {
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
    <section>
      <h2>Latest News</h2>
      <div className="crud-list">
        {news.map(item => (
          <div key={item.id} className="crud-item">
            <h3>{item.title}</h3>
            <p><strong>Excerpt:</strong> {item.excerpt}</p>
            <p><strong>Content:</strong> {item.content}</p>
            <p><strong>Slug:</strong> {item.slug}</p>
            <p><strong>Creator ID:</strong> {item.creatorId}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsList;