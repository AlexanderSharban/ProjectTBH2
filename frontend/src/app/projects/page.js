import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  if (projects.length === 0) return <div>Loading...</div>;

  const currentProject = projects[currentIndex];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-16 text-[#00FFAA] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-[#00FFAA] text-center">ПРОЕКТЫ</h1>

      {/* Карусель проектов */}
      <div className="relative w-full max-w-4xl h-[600px] mb-16">
        {/* Кнопки навигации */}
        <button
          onClick={prevProject}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#00FFAA] text-[#0A192F] p-3 rounded-full z-10 hover:bg-[#00FFCC] transition-colors"
        >
          ‹
        </button>
        <button
          onClick={nextProject}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#00FFAA] text-[#0A192F] p-3 rounded-full z-10 hover:bg-[#00FFCC] transition-colors"
        >
          ›
        </button>

        {/* Текущий проект */}
        <div className="w-full h-full bg-[#0A192F] border-2 border-[#00FFAA] rounded-lg overflow-hidden flex flex-col">
          <div className="h-2/3 relative">
            <img
              src={currentProject.projectUrl || '/project1.jpg'}
              alt={currentProject.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-1/3 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">{currentProject.title}</h2>
            <p className="text-lg mb-2">{currentProject.description}</p>
            <p className="text-sm">{currentProject.creatorId}</p>
            {currentProject.sourceCodeUrl && (
              <a href={currentProject.sourceCodeUrl} className="text-[#00FFAA] underline mt-2">Source Code</a>
            )}
          </div>
        </div>
      </div>

      {/* Индикаторы */}
      <div className="flex space-x-2">
        {projects.map((_, index) => (
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