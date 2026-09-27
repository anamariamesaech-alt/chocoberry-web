// src/admin/admin-reviews/components/ReviewDetailModal.jsx
import React from 'react';

export default function ReviewDetailModal({ isOpen, onClose, review }) {
  if (!isOpen || !review) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ backgroundColor: 'var(--bg-card)', color: 'var(--texto)', border: '1px solid var(--borde)', borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--texto)', fontSize: '1.3rem', fontWeight: 'bold' }}>
            Detalle de la Reseña
          </h2>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--texto-muted)' }}>
            <i className="fa-solid fa-xmark" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ backgroundColor: 'var(--secundario-3)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--borde)' }}>
            <h3 style={{ margin: 0, color: 'var(--texto)', fontSize: '1.1rem' }}>{review.cliente}</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--texto-muted)', marginTop: '0.2rem', display: 'block' }}>Producto: <strong style={{ color: 'var(--texto)' }}>{review.producto}</strong></span>
          </div>

          <div>
            <label style={{ color: 'var(--texto-muted)', fontWeight: 'bold', fontSize: '0.8rem', display: 'block', marginBottom: '0.3rem' }}>CALIFICACIÓN</label>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={star <= review.calificacion ? "fa-solid fa-star" : "fa-regular fa-star"}
                  style={{
                    fontSize: '1.25rem',
                    color: star <= review.calificacion ? '#FFB800' : 'var(--borde)'
                  }}
                  aria-hidden="true"
                />
              ))}
              <span style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: 'var(--texto)', fontSize: '0.95rem' }}>{review.calificacion}/5</span>
            </div>
          </div>

          <div>
            <label style={{ color: 'var(--texto-muted)', fontWeight: 'bold', fontSize: '0.8rem', display: 'block' }}>FECHA</label>
            <p style={{ color: 'var(--texto)', marginTop: '0.3rem', fontSize: '0.95rem' }}>{review.fecha}</p>
          </div>

          <div>
            <label style={{ color: 'var(--texto-muted)', fontWeight: 'bold', fontSize: '0.8rem', display: 'block' }}>COMENTARIO</label>
            <p style={{ color: 'var(--texto)', marginTop: '0.3rem', fontSize: '0.95rem', backgroundColor: 'var(--bg-main)', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--borde)' }}>
              "{review.comentario}"
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} style={{ backgroundColor: 'var(--primario, #E63950)', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}