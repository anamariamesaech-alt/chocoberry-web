// src/admin/products/pages/ProductsListPage.jsx
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductFormModal from '../components/ProductFormModal';
import DataTable from '../../../../shared/components/DataTable';

export default function ProductsListPage() {
  const {
    searchTerm,
    handleSearchChange,
    statusFilter,
    handleStatusFilterChange,
    currentPage,
    totalPages,
    handlePageChange,
    isModalOpen,
    setIsModalOpen,
    isDetailOpen,
    setIsDetailOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedProduct,
    productToEdit,
    currentProducts,
    totalProductsCount,
    handleToggleStatus,
    handleSaveProduct,
    handleConfirmDelete,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetail,
    handleOpenDelete
  } = useProducts();

  // Definición de columnas con miniatura de imagen incluida
  const columns = [
    {
      key: 'imagen',
      label: 'FOTO',
      render: (prod) => (
        prod.imagen ? (
          <img 
            src={prod.imagen} 
            alt={prod.nombre} 
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--borde)' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--secundario-3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--texto-muted)' }}>
            <i className="fa-solid fa-image" style={{ fontSize: '0.9rem' }}></i>
          </div>
        )
      )
    },
    {
      key: 'nombre',
      label: 'NOMBRE',
      render: (prod) => <span style={{ fontWeight: '600', color: 'var(--texto)' }}>{prod.nombre}</span>
    },
    {
      key: 'descripcion',
      label: 'DESCRIPCIÓN',
      render: (prod) => <span style={{ color: 'var(--texto-muted)', maxWidth: '250px', display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.descripcion}</span>
    },
    {
      key: 'categoria',
      label: 'CATEGORÍA',
      render: (prod) => <span style={{ color: 'var(--texto-muted)' }}>{prod.categoria}</span>
    },
    {
      key: 'precio',
      label: 'PRECIO',
      render: (prod) => <span style={{ fontWeight: 'bold', color: 'var(--primario, #E63950)' }}>${prod.precio.toLocaleString()}</span>
    },
    {
      key: 'estado',
      label: 'ESTADO',
      align: 'center',
      render: (prod) => (
        <button
          type="button"
          onClick={() => handleToggleStatus(prod.id)}
          style={{
            width: '46px',
            height: '24px',
            borderRadius: '12px',
            backgroundColor: prod.estado === 'Activo' ? '#2E7D32' : 'var(--borde)',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background-color 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px'
          }}
          title={`Estado: ${prod.estado}. Clic para cambiar.`}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              position: 'absolute',
              left: prod.estado === 'Activo' ? '24px' : '2px',
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
      render: (prod) => (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center' }}>
          {/* Ver Detalle */}
          <button 
            type="button"
            onClick={() => handleOpenDetail(prod)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--texto-muted)', padding: 0 }} 
            title="Ver detalle"
          >
            <svg width="18" height="18" viewBox="0 0 576 512" fill="currentColor">
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.4 78.1-95.4 92.9-131.1c3.3-7.9 3.3-16.7 0-24.6C558.7 204 527.4 152 480.6 108.6C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64a64 64 0 1 0 0 128 64 64 0 1 0 0-128z"/>
            </svg>
          </button>

          {/* Editar */}
          <button 
            type="button"
            onClick={() => handleOpenEdit(prod)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--texto-muted)', padding: 0 }} 
            title="Editar"
          >
            <svg width="17" height="17" viewBox="0 0 512 512" fill="currentColor">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 10.1-12.4 18.5-22.5 22.5l-22.7 9.1 9.1-22.7c4-10.1 12.4-18.5 22.5-22.5l22.7-9.1zM327.3 156.4L352 181.1l-149.9 149.9-24.7-24.7L327.3 156.4z"/>
            </svg>
          </button>

          {/* Eliminar */}
          <button 
            type="button"
            onClick={() => handleOpenDelete(prod)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--texto-muted)', padding: 0 }} 
            title="Eliminar"
          >
            <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-main)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <DataTable
        title="Productos"
        description="Consulta y administra el catálogo de productos de ChocoBerry."
        createLabel="Crear producto"
        onCreate={handleOpenCreate}
        columns={columns}
        data={currentProducts}
        searchPlaceholder="Buscar producto, descripción o categoría..."
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

      {/* PAGINACIÓN */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--borde)', borderRadius: '0 0 16px 16px', marginTop: '-1.5rem', marginBottom: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--texto-muted)' }}>
          Mostrando {currentProducts.length} de {totalProductsCount} productos
        </span>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              background: 'none',
              border: 'none',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              color: currentPage === 1 ? 'var(--borde)' : 'var(--texto)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Anterior
          </button>

          <span style={{ fontSize: '0.85rem', color: 'var(--texto)', fontWeight: 'bold', padding: '0 0.5rem' }}>
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              background: 'none',
              border: 'none',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              color: currentPage === totalPages ? 'var(--borde)' : 'var(--texto)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            Siguiente <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* MODAL CREAR / EDITAR */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveProduct}
        initialData={productToEdit}
      />

      {/* MODAL VER DETALLE */}
      <ProductFormModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        initialData={selectedProduct}
        isReadOnly={true}
      />

      {/* MODAL CONFIRMAR ELIMINACIÓN */}
      {isDeleteOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'var(--bg-card)', color: 'var(--texto)', border: '1px solid var(--borde)', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '1.8rem', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
            <div style={{ backgroundColor: 'var(--secundario-3)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ color: 'var(--primario, #E63950)', fontSize: '1.25rem' }} aria-hidden="true" />
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--texto)' }}>¿Eliminar producto?</h3>
            <p style={{ color: 'var(--texto-muted)', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>
              ¿Estás seguro de que deseas eliminar el producto <strong>"{selectedProduct?.nombre}"</strong>? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
              <button 
                type="button"
                onClick={() => setIsDeleteOpen(false)} 
                style={{ backgroundColor: 'var(--secundario-2)', color: 'var(--texto)', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleConfirmDelete} 
                style={{ backgroundColor: 'var(--primario, #E63950)', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}