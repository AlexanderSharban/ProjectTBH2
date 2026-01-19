import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function Creators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const response = await api.get('/creators');
      setCreators(response.data);
    } catch (error) {
      console.error('Error fetching creators:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start py-16 text-[#00FFAA]">
      <h1 className="text-4xl font-bold mb-10 text-[#00FFAA]">КРЕАТОРЫ</h1>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-4 w-full max-w-6xl">
        {creators.map(creator => (
          <Link
            key={creator.id}
            to={`/creators/${creator.id}`}
            className="h-48 border-2 border-[#00FFAA] rounded-lg flex flex-col items-center justify-center overflow-hidden hover:border-[#00FFCC] transition-colors p-4"
          >
            <img
              src={creator.avatarUrl || '/png14.png'}
              alt={creator.name}
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <h3 className="text-lg font-semibold">{creator.name}</h3>
            <p className="text-sm text-center">{creator.bio}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}