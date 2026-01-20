import { Link, useParams } from 'react-router-dom';

// Данные проекта (можно вынести в отдельный файл)
const projectsData = {
  'forest-is-my-home': {
    title: 'FOREST IS MY HOME',
    description: 'ИГРА НА ЮНИТИ',
    images: ['/project1-1.jpg', '/project1-2.jpg', '/project1-3.png'],
    details: 'The Forest is my home - это 2D TopDown проект. В игре Вам предстоит боротся за существование, сражатся с враждебными мобами и построить своё поселение. Игра в жанре Survival RPG, так же в игре планируется сделать несколько игровых режимов, поэтому скучать точно не прийдется.'
  },
  'panopticon': {
    title: 'PANOPTICON',
    description: 'ДЕБЮТНЫЙ ПРОЕКТ',
    images: ['/project2-1.png'],
    details: 'Разработка засекречена, не будем портить сюрприз. Но могу сказать, что это будет история, посвященная наблюдению и контролю в современном обществе. Вдохновлен концепцией паноптикума Джереми Бентама.'
  },
  'brandbook': {
    title: 'BRANDBOOK',
    description: 'РАЗРАБОТКА ФИРМЕННОГО СТИЛЯ',
    images: ['/project3-1.jpg', '/project3-2.jpg'],
    details: 'Бренд представляет собой моё независимое предприятие, сосредоточенное на создании иллюстраций, концептуального искусства и комиксов. Разрабатывая визуальный стиль и логотип, я стремился передать истинную сущность того, чем занимаются люди за этим брендом. В качестве логотипа — вопреки всем установленным нормам — я выбрал детализированный рисунок, а не упрощенный символ, что, как правило, рекомендуется. Для основного шрифта я выбрал Comic Sans — шрифт, который часто не рекомендуется использовать в брендинге, — однако он остается незаменимым в мире комиксов.'
  }
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projectsData[slug];

  if (!project) {
    return <div style={{ maxWidth: '1536px', margin: '0 auto', padding: '16px', paddingTop: '64px', color: '#00FFAA', textAlign: 'center' }}>Проект не найден</div>;
  }

  return (
    <div style={{ maxWidth: '1536px', width: '100%', margin: '0 auto', padding: '16px', paddingTop: '64px', color: '#00FFAA', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '24px', color: '#00FFAA', textAlign: 'center' }}>{project.title}</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '32px', color: '#00FFCC', textAlign: 'center' }}>{project.description}</p>

      {/* Галерея проекта */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px', width: '100%' }}>
        {project.images.map((img, index) => (
          <div key={index} style={{ position: 'relative', aspectRatio: '16/9', border: '2px solid #00FFAA', borderRadius: '8px', overflow: 'hidden' }}>
            <img
              src={img}
              alt={`${project.title} - ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* Описание проекта */}
      <div style={{ maxWidth: 'none', marginBottom: '48px', color: '#00FFAA', textAlign: 'center' }}>
        <p style={{ fontSize: '1.125rem' }}>{project.details}</p>
      </div>

      <Link
        to="/projects"
        style={{
          padding: '12px 24px',
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
        НАЗАД К ПРОЕКТАМ
      </Link>
    </div>
  );
}