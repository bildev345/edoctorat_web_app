import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  // Styles inline pour la précision du design demandé
  const sidebarStyle = {
    width: '260px',
    backgroundColor: 'var(--sidebar-bg)',
    color: 'var(--sidebar-text)',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #333'
  };

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    margin: '4px 10px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    color: isActive ? '#FFFFFF' : 'var(--sidebar-text)',
    backgroundColor: isActive ? '#2A2A2A' : 'transparent',
    transition: 'all 0.2s'
  });

  return (
    <aside style={sidebarStyle}>
      <div style={{ padding: '20px', fontSize: '1rem', fontWeight: '600', color: '#FFF' }}>
        🎓 E-Doctorat
      </div>
      
      <nav style={{ flex: 1 }}>
        <NavLink to="/" end style={linkStyle}>
            <span>👤</span> Infos Personnelles
        </NavLink>
        <NavLink to="/parcours" style={linkStyle}>
            <span>🎓</span> Cursus Académique
        </NavLink>
        <NavLink to="/postuler" style={linkStyle}>
            <span>📂</span> Sujets de Thèse
        </NavLink>
        <NavLink to="/notifications" style={linkStyle}>
            <span>🔔</span> Notifications
        </NavLink>
      </nav>

      <div style={{ padding: '20px', borderTop: '1px solid #333', fontSize: '0.8rem' }}>
        v1.0.0
      </div>
    </aside>
  );
};