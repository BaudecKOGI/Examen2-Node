import React from 'react';

const LaboratorioForm = ({ formData, handleChange, handleSubmit, modoEdicion, limpiarFormulario, loading }) => (
  <div className="card mb-4 shadow-sm">
    <div className="card-header bg-primary text-white">
      <h5 className="mb-0">{modoEdicion ? 'Editar Laboratorio' : 'Nuevo Laboratorio'}</h5>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Razón Social *</label>
            <input type="text" className="form-control" name="razonSocial" value={formData.razonSocial} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contacto</label>
            <input type="text" className="form-control" name="contacto" value={formData.contacto} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Teléfono</label>
            <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" name="direccion" value={formData.direccion} onChange={handleChange} />
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-success me-2" disabled={loading}>
            {loading ? 'Procesando...' : modoEdicion ? 'Actualizar' : 'Guardar'}
          </button>
          {modoEdicion && (
            <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
);

export default LaboratorioForm;