const contacts = [
  {
    name: 'Электронная почта',
    value: 'alex.sharb4@gmail.com',
    link: 'mailto:alex.sharb4@gmail.com',
  },
  {
    name: 'Телефон',
    value: '5 555-55-55',
    link: 'tel:5555-55-55',
  },
  {
    name: 'Telegram',
    value: '@username123',
    link: 'https://t.me/username123',
  },
  {
    name: 'Локация',
    value: 'Нейтральные воды (0°N 0°E)',
    link: 'https://www.google.com/maps/place/0°00\'00.0"N+0°00\'00.0"E',
  },
];

export default function ContactsPage() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', color: '#00FFAA' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '48px', color: '#00FFAA' }}>КОНТАКТЫ</h1>

      {/* Контактные карточки */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', width: '100%', maxWidth: '1024px', marginBottom: '64px' }}>
        {contacts.map((contact, index) => (
          <div
            key={index}
            style={{
              border: '2px solid #00FFAA',
              borderRadius: '8px',
              padding: '24px',
              transition: 'background-color 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0A192F'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px', color: '#00FFAA' }}>{contact.name}</h3>
            <a
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '1.125rem',
                color: '#00FFAA',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.color = '#00FFCC'}
              onMouseOut={(e) => e.target.style.color = '#00FFAA'}
            >
              {contact.value}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}