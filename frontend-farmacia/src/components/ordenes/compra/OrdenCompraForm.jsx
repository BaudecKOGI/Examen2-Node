import React from 'react';

const OrdenCompraForm = ({ formData, handleChange, handleSubmit, laboratorios, loading }) => (
  <div className="card mb-4 shadow-sm">
    <div className="card-header bg-primary text-white">
      <h5 className="mb-0">Nueva Orden de Compra</h5>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Laboratorio Proveedor *</label>
            <select className="form-select" name="CodLab" value={formData.CodLab} onChange={handleChange} required>
              <option value="">Seleccione Laboratorio...</option>
              {laboratorios.map(lab => <option key={lab.CodLab} value={lab.CodLab}>{lab.razonSocial}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Nro. Factura Proveedor</label>
            <input type="text" className="form-control" name="NrofacturaProv" value={formData.NrofacturaProv} onChange={handleChange} placeholder="Ej: F001-1234" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha Emisión *</label>
            <input type="date" className="form-control" name="fechaEmision" value={formData.fechaEmision} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <label className="form-label">Total (S/) *</label>
            <input type="number" step="0.01" className="form-control" name="Total" value={formData.Total} onChange={handleChange} required />
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Procesando...' : 'Emitir Orden de Compra'}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default OrdenCompraForm;