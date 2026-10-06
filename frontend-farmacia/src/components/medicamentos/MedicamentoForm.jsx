import React from 'react';

const MedicamentoForm = ({ formData, handleChange, handleSubmit, tipos, especialidades, loading }) => (
  <div className="card mb-4 shadow-sm">
    <div className="card-header bg-primary text-white">
      <h5 className="mb-0">Nuevo Medicamento</h5>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Descripción / Nombre *</label>
            <input type="text" className="form-control" name="descripcionMed" value={formData.descripcionMed} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Marca</label>
            <input type="text" className="form-control" name="Marca" value={formData.Marca} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Presentación</label>
            <input type="text" className="form-control" name="Presentacion" value={formData.Presentacion} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Stock *</label>
            <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} required min="0" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Precio Unitario (S/) *</label>
            <input type="number" step="0.01" className="form-control" name="precioVentaUni" value={formData.precioVentaUni} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Tipo de Medicamento</label>
            <select className="form-select" name="CodTipoMed" value={formData.CodTipoMed} onChange={handleChange}>
              <option value="">Seleccione...</option>
              {tipos.map(t => <option key={t.CodTipoMed} value={t.CodTipoMed}>{t.descripcion}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Especialidad</label>
            <select className="form-select" name="CodEspec" value={formData.CodEspec} onChange={handleChange}>
              <option value="">Seleccione...</option>
              {especialidades.map(e => <option key={e.CodEspec} value={e.CodEspec}>{e.descripcionEsp}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Procesando...' : 'Guardar Medicamento'}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default MedicamentoForm;