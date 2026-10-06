import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Laboratorios() {
  const [labs, setLabs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ razonSocial: '', direccion: '', telefono: '', email: '', contacto: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadLabs();
  }, []);

  const loadLabs = async () => {
    try {
      const res = await API.get('/laboratorios');
      setLabs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.razonSocial.trim()) return alert('Ingrese la razón social');

    try {
      if (editId) {
        await API.put(`/laboratorios/${editId}`, formData);
      } else {
        await API.post('/laboratorios', formData);
      }
      setShowModal(false);
      setFormData({ razonSocial: '', direccion: '', telefono: '', email: '', contacto: '' });
      setEditId(null);
      loadLabs();
    } catch (err) {
      alert('Error al guardar datos');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('¿Desea eliminar este registro?')) {
      await API.delete(`/laboratorios/${id}`);
      loadLabs();
    }
  };

  const handleEdit = (lab) => {
    setEditId(lab.CodLab);
    setFormData(lab);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-danger mb-3 fw-bold" onClick={() => { setEditId(null); setFormData({ razonSocial: '', direccion: '', telefono: '', email: '', contacto: '' }); setShowModal(true); }}>
        Nuevo Laboratorio
      </button>

      <table className="table table-striped align-middle shadow-sm">
        <thead className="table-info">
          <tr>
            <th>Razón Social</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((lab) => (
            <tr key={lab.CodLab}>
              <td>{lab.razonSocial}</td>
              <td>{lab.direccion}</td>
              <td>{lab.telefono}</td>
              <td>{lab.contacto}</td>
              <td>
                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(lab)}>
                  <i className="bi bi-pencil"></i> ✏️
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(lab.CodLab)}>
                  <i className="bi bi-trash"></i> 🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Recreado */}
      {showModal && (
        <div className="modal show d-block tab-index='-1'" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{editId ? 'Editar Laboratorio' : 'Nuevo Laboratorio'}</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="mb-2">
                    <label>Razón Social</label>
                    <input type="text" className="form-control" value={formData.razonSocial} onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })} required />
                  </div>
                  <div className="mb-2">
                    <label>Dirección</label>
                    <input type="text" className="form-control" value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} />
                  </div>
                  <div className="mb-2">
                    <label>Teléfono</label>
                    <input type="text" className="form-control" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
                  </div>
                  <div className="mb-2">
                    <label>Contacto</label>
                    <input type="text" className="form-control" value={formData.contacto} onChange={(e) => setFormData({ ...formData, contacto: e.target.value })} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Guardar</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}