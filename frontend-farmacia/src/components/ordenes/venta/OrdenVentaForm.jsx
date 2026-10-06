import React from 'react';

const OrdenVentaForm = ({ formData, handleChange, handleSubmit, loading }) => (
  <div className="card mb-4 shadow-sm">
    <div className="card-header bg-warning text-dark">
      <h5 className="mb-0">Registrar Nueva Orden de Venta</h5>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Fecha Emisión *</label>
            <input type="date" className="form-control" name="fechaEmision" value={formData.fechaEmision} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Motivo de Venta *</label>
            <input type="text" className="form-control" name="Motivo" value={formData.Motivo} onChange={handleChange} placeholder="Ej: Venta de Mostrador" required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Situación</label>
            <select className="form-select" name="Situacion" value={formData.Situacion} onChange={handleChange}>
              <option value="Completado">Completado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Anulado">Anulado</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? 'Procesando...' : 'Generar Orden de Venta'}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default OrdenVentaForm;