// src/features/profile/layout/ProfileLayout.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../login/hooks/useAuth';
import useAuthTheme from '../../login/hooks/useAuthTheme';

const ProfileLayout = () => {
  const { logout } = useAuth();
  const { theme } = useAuthTheme();
  const navigate = useNavigate();

  const isDark = theme === 'dark';

  const colors = {
    pageBg: isDark ? '#181013' : '#fffafb',
    mainBg: isDark ? '#1a1215' : '#ffffff',
    mainText: isDark ? '#f7f1f2' : '#4a4a4a',
    primary: '#d90429',
    sidebarBg: '#ffffff',
    sidebarText: '#4a4a4a',
    sidebarBorder: '#fce8eb',
    sidebarSubtle: '#fde2e4',
    sidebarHover: '#fff5f6',
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      display: 'flex',
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '0 20px',
      gap: '30px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: colors.pageBg,
      minHeight: '80vh',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Menú Lateral Fijo en Modo Claro */}
      <aside style={{
        width: '280px',
        background: colors.sidebarBg,
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(230, 57, 70, 0.08)',
        padding: '24px',
        height: 'fit-content',
        border: `1px solid ${colors.sidebarBorder}`
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginBottom: '20px', 
          color: colors.primary, 
          borderBottom: `2px solid ${colors.sidebarSubtle}`, 
          paddingBottom: '12px' 
        }}>
          Mi Cuenta Chocoberry
        </h3>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/users/listdomicilios" style={{ textDecoration: 'none', color: colors.sidebarText, fontWeight: '600', display: 'block', padding: '10px 14px', borderRadius: '8px', transition: 'all 0.2s', backgroundColor: colors.sidebarHover }}>
                Bienvenida
              </Link>
            </li>
            <li>
              <Link to="/users/informacion-personal" style={{ textDecoration: 'none', color: colors.sidebarText, fontWeight: '600', display: 'block', padding: '10px 14px', borderRadius: '8px', transition: 'all 0.2s' }}>
                Información Personal
              </Link>
            </li>
            <li>
              <Link to="/users/orders" style={{ textDecoration: 'none', color: colors.sidebarText, fontWeight: '600', display: 'block', padding: '10px 14px', borderRadius: '8px', transition: 'all 0.2s' }}>
                Mis Pedidos
              </Link>
            </li>
            <li style={{ marginTop: '15px', borderTop: `1px solid ${colors.sidebarSubtle}`, paddingTop: '15px' }}>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  width: '100%', 
                  textAlign: 'left', 
                  cursor: 'pointer', 
                  color: colors.primary, 
                  fontWeight: '700', 
                  display: 'block', 
                  padding: '10px 14px', 
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  fontSize: 'inherit'
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Cuadro Grande Central Dinámico */}
      <main style={{
        flex: 1,
        background: colors.mainBg,
        borderRadius: '16px',
        boxShadow: isDark ? '0 8px 30px rgba(0, 0, 0, 0.5)' : '0 8px 30px rgba(230, 57, 70, 0.08)',
        padding: '35px',
        border: isDark ? '1px solid #2d1e22' : `1px solid ${colors.sidebarBorder}`,
        color: colors.mainText,
        transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease'
      }}>
        {/* AQUÍ ESTÁ EL TRUCO: Pasamos { theme } a través del context */}
        <Outlet context={{ theme }} />
      </main>
    </div>
  );
};

export default ProfileLayout;