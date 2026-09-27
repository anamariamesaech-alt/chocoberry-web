// src/admin/admin-reviews/pages/ReviewsListPage.jsx
import React from 'react';
import { useReviews } from '../hooks/useReviews';
import ReviewDetailModal from '../components/ReviewDetailModal';
import DataTable from '../../../../shared/components/DataTable';

export default function ReviewsListPage() {
  const {
    searchTerm,
    handleSearchChange,
    statusFilter,
    handleStatusFilterChange,
    currentPage,
    totalPages,
    handlePageChange,
    isDetailOpen,
    setIsDetailOpen,
    selectedReview,
    currentReviews,
    totalReviewsCount,
    handleToggleStatus,
    handleOpenDetail
  } = useReviews();

  // Definición de las columnas adaptadas para DataTable en modo oscuro
  const columns = [
    {
      key: 'cliente',
      label: 'CLIENTE',
      render: (review) => <span style={{ fontWeight: '600', color: 'var(--texto)' }}>{review.cliente}</span>
    },
    {
      key: 'producto',
      label: 'PRODUCTO',
      render: (review) => <span style={{ color: 'var(--texto-muted)' }}>{review.producto}</span>
    },
    {
      key: 'calificacion',
      label: 'CALIFICACIÓN',
      render: (review) => (
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={star <= review.calificacion ? "fa-solid fa-star" : "fa-regular fa-star"}
              style={{
                color: star <= review.calificacion ? '#FFB800' : 'var(--borde)',
                fontSize: '0.9rem'
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      )
    },
    {
      key: 'comentario',
      label: 'COMENTARIO',
      render: (review) => (
        <span style={{ color: 'var(--texto-muted)', maxWidth: '280px', display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {review.comentario}
        </span>
      )
    },
    {
      key: 'fecha',
      label: 'FECHA',
      render: (review) => <span style={{ color: 'var(--texto-muted)', fontSize: '0.85rem' }}>{review.fecha}</span>
    },
    {
      key: 'estado',
      label: 'ESTADO',
      align: 'center',
      render: (review) => (
        <button
          type="button"
          onClick={() => handleToggleStatus(review.id)}
          style={{
            width: '46px',
            height: '24px',
            borderRadius: '12px',
            backgroundColor: review.estado === 'Activo' ? '#2E7D32' : 'var(--borde)',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background-color 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px'
          }}
          title={`Estado: ${review.estado}. Clic para cambiar.`}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              position: 'absolute',
              left: review.estado === 'Activo' ? '24px' : '2px',
              transition: 'left 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          />
        </button>
      )
    },
    {
      key: 'actions',
      label: 'ACCIONES',
      align: 'right',
      render: (review) => (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center' }}>
          {/* Ver Detalle */}
          <button 
            type="button"
            onClick={() => handleOpenDetail(review)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--texto-muted)', padding: 0 }} 
            title="Ver detalle"
          >
            <svg width="18" height="18" viewBox="0 0 576 512" fill="currentColor">
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.4 78.1-95.4 92.9-131.1c3.3-7.9 3.3-16.7 0-24.6C558.7 204 527.4 152 480.6 108.6C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64a64 64 0 1 0 0 128 64 64 0 1 0 0-128z"/>
            </svg>
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-main)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* COMPONENTE DATATABLE UNIFICADO CON FILTRO INTEGRADO */}
      <DataTable
        title="Reseñas"
        description="Consulta y gestiona las calificaciones y comentarios enviados por los clientes."
        columns={columns}
        data={currentReviews}
        searchPlaceholder="Buscar por cliente, producto o comentario..."
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        extraFilter={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-filter" style={{ color: 'var(--texto-muted, #888)' }} title="Filtrar" />
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--borde)',
                padding: '0.75rem 1.2rem',
                borderRadius: '12px',
                fontSize: '0.9rem',
                color: 'var(--texto)',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        }
      />

      {/* MODAL VER DETALLE */}
      <ReviewDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        review={selectedReview}
      />

    </div>
  );
}