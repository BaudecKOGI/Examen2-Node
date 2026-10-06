import React, { useState, useEffect } from 'react';
import API from '../services/api';
import AlertMessage from '../components/common/AlertMessage';
import LaboratorioForm from '../components/laboratorios/LaboratorioForm';
import LaboratorioTable from '../components/laboratorios/LaboratorioTable';

const LaboratoriosPage = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [formData, setFormData] = useState({ CodLab: null, razonSocial: '', direccion: '', telefono: '', email: '', contacto: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => { cargarLaboratorios(); }, []);

  const cargarLaboratorios = async () => {
    setLoading(true);
    try {
      const res = await API.get('/laboratorios');
      setLaboratorios(res.data);
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');
    if (!formData.razonSocial.trim()) return setErrorMsg('La Razón Social es obligatoria.');

    setLoading(true);
    try {
      if (modoEdicion) {
        await API.put(`/laboratorios/${formData.CodLab}`, formData);
        setSuccessMsg('Laboratorio actualizado correctamente.');
      } else {
        await API.post('/laboratorios', formData);
        setSuccessMsg('Laboratorio registrado exitosamente.');
      }
      limpiarFormulario();
      cargarLaboratorios();
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  const handleEditar = (lab) => {
    setModoEdicion(true);
    setFormData({ CodLab: lab.CodLab, razonSocial: lab.razonSocial || '', direccion: lab.direccion || '', telefono: lab.telefono || '', email: lab.email || '', contacto: lab.contacto || '' });
    setErrorMsg(''); setSuccessMsg('');
  };

  const handleEliminar = async (CodLab) => {
    if (!window.confirm('¿Está seguro de eliminar este laboratorio?')) return;
    setLoading(true); setErrorMsg(''); setSuccessMsg('');
    try {
      await API.delete(`/laboratorios/${CodLab}`);
      setSuccessMsg('Laboratorio eliminado correctamente.');
      cargarLaboratorios();
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  const limpiarFormulario = () => {
    setFormData({ CodLab: null, razonSocial: '', direccion: '', telefono: '', email: '', contacto: '' });
    setModoEdicion(false);
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Laboratorios</h2>
      <hr />
      <AlertMessage error={errorMsg} success={successMsg} />
      <LaboratorioForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        modoEdicion={modoEdicion}
        limpiarFormulario={limpiarFormulario}
        loading={loading}
      />
      <LaboratorioTable
        laboratorios={laboratorios}
        loading={loading}
        handleEditar={handleEditar}
        handleEliminar={handleEliminar}
      />
    </div>
  );
};

export default LaboratoriosPage;