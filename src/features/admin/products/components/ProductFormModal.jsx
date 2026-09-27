// src/admin/products/components/ProductFormModal.jsx
import React, { useState, useEffect } from 'react';

export default function ProductFormModal({ isOpen, onClose, onSubmit, initialData, isReadOnly = false }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('Día de la Madre');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '');
      setDescripcion(initialData.descripcion || '');
      setCategoria(initialData.categoria || 'Día de la Madre');
      setPrecio(initialData.precio || '');
      setImagen(initialData.imagen || initialData.foto || initialData.url || '');
    } else {
      setNombre('');
      setDescripcion('');
      setCategoria('Día de la Madre');
      setPrecio('');
      setImagen('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !precio) return;
    onSubmit({
      nombre,
      descripcion,
      categoria,
      precio: Number(precio),
      imagen
    });
    onClose();
  };

  const productImg = initialData?.imagen || initialData?.foto || initialData?.url;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem' }}>
      <div style={{ backgroundColor: 'var(--bg-card)', color: 'var(--texto)', border: '1px solid var(--borde)', borderRadius: '20px', width: '100%', maxWidth: '520px', padding: '2.2rem', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--texto)', fontSize: '1.4rem', fontWeight: '700' }}>
            {isReadOnly ? 'Detalle del Producto' : initialData ? 'Editar Producto' : 'Crear Producto'}
          </h2>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ background: 'var(--secundario-3)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', color: 'var(--texto)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
          >
            <i className="fa-solid fa-xmark" style={{ fontSize: '1rem' }} aria-hidden="true" />
          </button>
        </div>

        {isReadOnly ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {productImg ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img 
                  src={productImg} 
                  alt={initialData?.nombre} 
                  style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--borde)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '130px', backgroundColor: 'var(--secundario-3)', borderRadius: '16px', color: 'var(--texto-muted)', border: '1px dashed var(--borde)' }}>
                <i className="fa-solid fa-image" style={{ fontSize: '2rem', marginBottom: '0.4rem' }}></i>
                <span style={{ fontSize: '0.8rem' }}>Sin imagen registrada</span>
              </div>
            )}

            <div style={{ backgroundColor: 'var(--secundario-3)', padding: '1.2rem', borderRadius: '14px', border: '1px solid var(--borde)' }}>
              <h3 style={{ margin: '0 0 0.3rem 0', color: 'var(--texto)', fontSize: '1.2rem' }}>{initialData?.nombre}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--texto-muted)' }}>Categoría: <strong style={{ color: 'var(--texto)' }}>{initialData?.categoria}</strong></span>
            </div>

            <div>
              <label style={{ color: 'var(--texto-muted)', fontWeight: '700', fontSize: '0.75rem', letterSpacing: '0.5px', display: 'block', marginBottom: '0.3rem' }}>DESCRIPCIÓN</label>
              <p style={{ color: 'var(--texto)', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{initialData?.descripcion || 'Sin descripción disponible'}</p>
            </div>
            
            <div style={{ backgroundColor: 'var(--secundario-3)', padding: '1rem 1.2rem', borderRadius: '14px', border: '1px solid var(--borde)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--texto-muted)', fontWeight: '600' }}>PRECIO</span>
              <strong style={{ color: 'var(--primario, #E63950)', fontSize: '1.3rem' }}>${Number(initialData?.precio).toLocaleString()}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="button" onClick={onClose} style={{ backgroundColor: 'var(--primario, #E63950)', color: '#ffffff', border: 'none', padding: '0.7rem 1.8rem', borderRadius: '24px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(230,57,80,0.3)' }}>
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--texto)', fontWeight: '600', fontSize: '0.85rem' }}>Nombre del Producto</label>
              <input
                type="text"
                placeholder="Ej: Caja Corazón Rosas"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--borde)', backgroundColor: 'var(--bg-main)', color: 'var(--texto)', outline: 'none', boxSizing: 'border-box', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--texto)', fontWeight: '600', fontSize: '0.85rem' }}>Fotografía del Producto</label>
              
              {imagen ? (
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', backgroundColor: 'var(--secundario-3)', borderRadius: '12px', border: '1px solid var(--borde)' }}>
                  <img src={imagen} alt="Vista previa" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--borde)' }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--texto)', display: 'block' }}>Imagen cargada con éxito</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--texto-muted)' }}>Lista para guardar</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImagen('')}
                    style={{ background: 'none', border: 'none', color: 'var(--primario, #E63950)', cursor: 'pointer', padding: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}
                    title="Cambiar imagen"
                  >
                    <i className="fa-solid fa-trash-can" style={{ fontSize: '1rem' }}></i>
                  </button>
                </div>
              ) : (
                <label style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '1.8rem 1rem', 
                  backgroundColor: 'var(--bg-main)', 
                  border: '2px dashed var(--borde)', 
                  borderRadius: '12px', 
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  textAlign: 'center'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--secundario-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', color: 'var(--primario, #E63950)' }}>
                    <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '1.1rem' }}></i>
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--texto)' }}>Haz clic para elegir una foto</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--texto-muted)', marginTop: '0.2rem' }}>PNG, JPG o WEBP desde tus archivos</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--texto)', fontWeight: '600', fontSize: '0.85rem' }}>Descripción</label>
              <textarea
                placeholder="Breve descripción del producto..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--borde)', backgroundColor: 'var(--bg-main)', color: 'var(--texto)', outline: 'none', boxSizing: 'border-box', resize: 'none', fontSize: '0.95rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--texto)', fontWeight: '600', fontSize: '0.85rem' }}>Categoría</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--borde)', backgroundColor: 'var(--bg-main)', color: 'var(--texto)', outline: 'none', boxSizing: 'border-box', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  <option value="Día de la Madre">Día de la Madre</option>
                  <option value="Día del Padre">Día del Padre</option>
                  <option value="Aniversarios">Aniversarios</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Antojos">Antojos</option>
                  <option value="Regalos">Regalos</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--texto)', fontWeight: '600', fontSize: '0.85rem' }}>Precio ($)</label>
                <input
                  type="number"
                  placeholder="Ej: 85000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--borde)', backgroundColor: 'var(--bg-main)', color: 'var(--texto)', outline: 'none', boxSizing: 'border-box', fontSize: '0.95rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.2rem' }}>
              <button 
                type="button" 
                onClick={onClose} 
                style={{ backgroundColor: 'var(--secundario-2)', color: 'var(--texto)', border: 'none', padding: '0.7rem 1.4rem', borderRadius: '24px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                style={{ backgroundColor: 'var(--primario, #E63950)', color: '#ffffff', border: 'none', padding: '0.7rem 1.6rem', borderRadius: '24px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(230,57,80,0.3)' }}
              >
                Guardar Producto
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}