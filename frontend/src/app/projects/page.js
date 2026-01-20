import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getProjectLikes, createProject } from '../../api';

export default function ProjectsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'FOREST IS MY HOME',
      slug: 'forest-is-my-home',
      image: '/project1.jpg',
      description: 'ИГРА НА ЮНИТИ',
      details: 'Попытки в GameDev',
    },
    {
      id: 2,
      title: 'PANOPTICON',
      slug: 'panopticon',
      image: '/project2.png',
      description: 'НАБЛЮДЕНИЯ О КОНТРОЛЕ',
      details: 'Дебютный проект',
    },
    {
      id: 3,
      title: 'BRANDBOOK',
      slug: 'brandbook',
      image: '/project3.jpg',
      description: 'РАЗРАБОТКА ФИРМЕННОГО СТИЛЯ',
      details: 'Создание целостного визуального языка для креативного объединения',
    },
  ]);
  const [likes, setLikes] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    details: '',
    image: ''
  });

  // Модальное окно для добавления проекта
  const renderAddModal = () => {
    if (!showAddModal) return null;
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: '#0A192F',
          border: '2px solid #00FFAA',
          borderRadius: '8px',
          padding: '32px',
          maxWidth: '500px',
          width: '100%',
          margin: '16px'
        }}>
          <h2 style={{ color: '#00FFAA', fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>ДОБАВИТЬ ПРОЕКТ</h2>
          <form onSubmit={handleAddProject}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#00FFAA', marginBottom: '8px' }}>Название:</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'black',
                  color: '#00FFAA',
                  border: '1px solid #00FFAA',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#00FFAA', marginBottom: '8px' }}>Описание:</label>
              <input
                type="text"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'black',
                  color: '#00FFAA',
                  border: '1px solid #00FFAA',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#00FFAA', marginBottom: '8px' }}>Детали:</label>
              <textarea
                value={newProject.details}
                onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'black',
                  color: '#00FFAA',
                  border: '1px solid #00FFAA',
                  borderRadius: '4px',
                  minHeight: '100px'
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: '#00FFAA', marginBottom: '8px' }}>URL изображения:</label>
              <input
                type="url"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'black',
                  color: '#00FFAA',
                  border: '1px solid #00FFAA',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#00FFAA',
                  color: 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#00FFCC'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#00FFAA'}
              >
                ДОБАВИТЬ
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6B7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                ОТМЕНА
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data.map(project => ({
          ...project,
          slug: project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          image: `/project${project.id}.jpg`, // placeholder
          details: project.description || 'Описание проекта'
        })));
        // Загрузить лайки для каждого проекта
        const likesData = {};
        for (const project of response.data) {
          const likesResponse = await getProjectLikes(project.id);
          likesData[project.id] = likesResponse.data.length;
        }
        setLikes(likesData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const prevProject = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextProject = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const response = await createProject(newProject);
      const newProj = {
        ...response.data,
        slug: response.data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        image: `/project${response.data.id}.jpg`, // placeholder
        details: response.data.description || 'Описание проекта'
      };
      setProjects(prev => [...prev, newProj]);
      setNewProject({ title: '', description: '', details: '', image: '' });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  if (projects.length === 0) {
    return (
      <div style={{ maxWidth: '1024px', width: '100%', margin: '0 auto', padding: '16px', paddingTop: '64px', color: '#00FFAA', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#00FFAA', textAlign: 'center', margin: 0 }}>ПРОЕКТЫ</h1>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              marginLeft: '16px',
              backgroundColor: '#00FFAA',
              color: 'black',
              fontSize: '1.5rem',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#00FFCC'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#00FFAA'}
          >
            +
          </button>
        </div>
        <div style={{ color: '#00FFAA', fontSize: '1.25rem' }}>Загрузка проектов...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1024px', width: '100%', margin: '0 auto', padding: '16px', paddingTop: '64px', color: '#00FFAA', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {renderAddModal()}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '48px' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#00FFAA', textAlign: 'center', margin: 0 }}>ПРОЕКТЫ</h1>
      <button
        onClick={() => alert('Функция добавления проекта в разработке')}
        style={{
          marginLeft: '16px',
          backgroundColor: '#00FFAA',
          color: 'black',
          fontSize: '1.5rem',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#00FFCC'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#00FFAA'}
      >
        +
      </button>
    </div>

      {/* Карусель проектов */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '1024px', height: '600px', marginBottom: '64px' }}>
        {/* Кнопки навигации */}
        <button
          onClick={prevProject}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#00FFAA',
            fontSize: '2.25rem',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.color = '#00FFCC'}
          onMouseOut={(e) => e.target.style.color = '#00FFAA'}
        >
          ←
        </button>

        <button
          onClick={nextProject}
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#00FFAA',
            fontSize: '2.25rem',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.color = '#00FFCC'}
          onMouseOut={(e) => e.target.style.color = '#00FFAA'}
        >
          →
        </button>

        {/* Карточка проекта */}
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', border: '4px solid #00FFAA' }}>
          {/* Фоновое изображение */}
          <img
            src={projects[currentIndex].image}
            alt={projects[currentIndex].title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Текст на полупрозрачном фоне */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '32px', borderRadius: '8px', maxWidth: '512px', width: '100%' }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '16px', color: '#00FFAA' }}>
                {projects[currentIndex].title}
              </h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '24px', color: '#00FFAA' }}>
                {projects[currentIndex].description}
              </p>
              <p style={{ fontSize: '1.125rem', marginBottom: '24px', color: '#00FFCC' }}>
                {projects[currentIndex].details}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.25rem', color: '#00FFAA', marginRight: '8px' }}>❤️</span>
                <span style={{ fontSize: '1.25rem', color: '#00FFAA' }}>{likes[projects[currentIndex].id] || 0}</span>
              </div>
              <Link
                to={`/projects/${projects[currentIndex].slug}`}
                style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  backgroundColor: '#00FFAA',
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#00FFCC'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#00FFAA'}
              >
                ПОДРОБНЕЕ
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Индикаторы текущего проекта */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '64px', justifyContent: 'center' }}>
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#00FFAA' : '#6B7280',
              border: 'none',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
}
