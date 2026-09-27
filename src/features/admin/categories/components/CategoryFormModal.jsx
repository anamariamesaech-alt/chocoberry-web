// src/features/admin/categories/components/CategoryFormModal.jsx
import React, { useState, useEffect } from 'react';

const renderIcon = (name) => {
  const iconStyle = { fontSize: '1.5rem', color: '#C2435A' };
  switch (name) {
    case 'Heart':
      return <i className="fa-solid fa-heart" style={iconStyle} aria-hidden="true" />;
    case 'User':
      return <i className="fa-solid fa-user" style={{ ...iconStyle, color: 'var(--texto)' }} aria-hidden="true" />;
    case 'Sparkles':
      return <i className="fa-solid fa-wand-magic-sparkles" style={{ ...iconStyle, color: '#F49B05' }} aria-hidden="true" />;
    case 'Cake':
      return <i className="fa-solid fa-cake-candles" style={iconStyle} aria-hidden="true" />;
    case 'Calendar':
      return <i className="fa-solid fa-calendar-days" style={iconStyle} aria-hidden="true" />;
    default:
      return <i className="fa-solid fa-gift" style={{ ...iconStyle, color: '#F49B05' }} aria-hidden="true" />;
  }
};

export default function CategoryFormModal({ isOpen, onClose, onSubmit, initialData, isReadOnly = false }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '');
      setDescripcion(initialData.descripcion || '');
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onSubmit({ nombre, descripcion });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ backgroundColor: 'var(--bg-card)', color: 'var(--texto)', border: '1px solid var(--borde)', borderRadius: '16px', width: '100%', maxWidth: '450px', padding: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--texto)', fontSize: '1.3rem', fontWeight: 'bold' }}>
            {isReadOnly ? 'Detalle de Categoría' : initialData ? 'Editar Categoría' : 'Crear Categoría'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--texto-muted)' }}>
            <i className="fa-solid fa-xmark" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
          </button>
        </div>

        {isReadOnly ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--secundario-3)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--borde)' }}>
              {renderIcon(initialData?.iconName)}
              <div>
                <h3 style={{ margin: 0, color: 'var(--texto)', fontSize: '1.1rem' }}>{initialData?.nombre}</h3>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: initialData?.estado === 'Activo' ? '#1E8E3E' : '#E63950' }}>
                  {initialData?.estado}
                </span>
              </div>
            </div>
            <div>
              <label style={{ color: 'var(--texto-muted)', fontWeight: 'bold', fontSize: '0.85rem' }}>DESCRIPCIÓN</label>
              <p style={{ color: 'var(--texto)', marginTop: '0.3rem', fontSize: '0.95rem' }}>{initialData?.descripcion}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button onClick={onClose} style={{ backgroundColor: 'var(--primario)', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--texto)', fontWeight: '600', fontSize: '0.9rem' }}>Nombre</label>
              <input
                type="text"
                placeholder="Ej: Día de la Madre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '10px', border: '1px solid var(--borde)', backgroundColor: 'var(--bg-main)', color: 'var(--texto)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--texto)', fontWeight: '600', fontSize: '0.9rem' }}>Descripción</label>
              <textarea
                placeholder="Descripción..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '10px', border: '1px solid var(--borde)', backgroundColor: 'var(--bg-main)', color: 'var(--texto)', outline: 'none', boxSizing: 'border-box', resize: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" onClick={onClose} style={{ backgroundColor: 'var(--secundario-2)', color: 'var(--texto)', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button type="submit" style={{ backgroundColor: 'var(--primario)', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}