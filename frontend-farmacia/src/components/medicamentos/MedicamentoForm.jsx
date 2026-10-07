import React, { useState } from 'react';
import API from '../../services/api';

const MedicamentoForm = ({ formData, handleChange, handleSubmit, tipos, especialidades, cargarDatos, loading }) => {
  const [nuevoTipo, setNuevoTipo] = useState('');
  const [nuevaEspec, setNuevaEspec] = useState('');
  const [guardandoCatalogo, setGuardandoCatalogo] = useState(false);

  const handleAddTipo = async () => {
    if (!nuevoTipo.trim()) return;
    setGuardandoCatalogo(true);
    try {
      await API.post('/catalogos/tipos-medicamento', { descripcion: nuevoTipo });
      setNuevoTipo('');
      await cargarDatos();
    } catch (err) {
      alert(err.response?.data?.error || 'Error al agregar el tipo de medicamento');
    } finally {
      setGuardandoCatalogo(false);
    }
  };

  const handleAddEspec = async () => {
    if (!nuevaEspec.trim()) return;
    setGuardandoCatalogo(true);
    try {
      await API.post('/catalogos/especialidades', { descripcionEsp: nuevaEspec });
      setNuevaEspec('');
      await cargarDatos();
    } catch (err) {
      alert(err.response?.data?.error || 'Error al agregar la especialidad');
    } finally {
      setGuardandoCatalogo(false);
    }
  };

  return (
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

            {/* Selector de Tipo de Medicamento + Registro Rápido */}
            <div className="col-md-3">
              <label className="form-label">Tipo de Medicamento</label>
              <select className="form-select mb-1" name="CodTipoMed" value={formData.CodTipoMed} onChange={handleChange}>
                <option value="">Seleccione...</option>
                {tipos.map(t => <option key={t.CodTipoMed} value={t.CodTipoMed}>{t.descripcion}</option>)}
              </select>
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="+ Nuevo tipo"
                  value={nuevoTipo}
                  onChange={(e) => setNuevoTipo(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleAddTipo}
                  disabled={guardandoCatalogo || !nuevoTipo.trim()}
                >
                  +
                </button>
              </div>
            </div>

            {/* Selector de Especialidad + Registro Rápido */}
            <div className="col-md-3">
              <label className="form-label">Especialidad</label>
              <select className="form-select mb-1" name="CodEspec" value={formData.CodEspec} onChange={handleChange}>
                <option value="">Seleccione...</option>
                {especialidades.map(e => <option key={e.CodEspec} value={e.CodEspec}>{e.descripcionEsp}</option>)}
              </select>
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="+ Nueva especialidad"
                  value={nuevaEspec}
                  onChange={(e) => setNuevaEspec(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleAddEspec}
                  disabled={guardandoCatalogo || !nuevaEspec.trim()}
                >
                  +
                </button>
              </div>
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
};

export default MedicamentoForm;