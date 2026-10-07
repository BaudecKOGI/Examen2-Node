import React, { useState, useEffect } from 'react';
import API from '../services/api';
import AlertMessage from '../components/common/AlertMessage';
import MedicamentoForm from '../components/medicamentos/MedicamentoForm';
import MedicamentoTable from '../components/medicamentos/MedicamentoTable';

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [formData, setFormData] = useState({
    descripcionMed: '', Marca: '', Presentacion: '', stock: 0, precioVentaUni: '', CodTipoMed: '', CodEspec: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [resMed, resTipos, resEsp] = await Promise.all([
        API.get('/medicamentos'),
        API.get('/catalogos/tipos-medicamento'),
        API.get('/catalogos/especialidades')
      ]);
      setMedicamentos(resMed.data);
      setTipos(resTipos.data);
      setEspecialidades(resEsp.data);
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');
    setLoading(true);
    try {
      await API.post('/medicamentos', formData);
      setSuccessMsg('Medicamento registrado correctamente.');
      setFormData({ descripcionMed: '', Marca: '', Presentacion: '', stock: 0, precioVentaUni: '', CodTipoMed: '', CodEspec: '' });
      cargarDatos();
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  const handleEliminar = async (CodMedicamento) => {
    if (!window.confirm('¿Desea eliminar este medicamento?')) return;
    setLoading(true); setErrorMsg(''); setSuccessMsg('');
    try {
      await API.delete(`/medicamentos/${CodMedicamento}`);
      setSuccessMsg('Medicamento eliminado.');
      cargarDatos();
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="container mt-2">
      <h2>Gestión de Medicamentos</h2>
      <hr />
      <AlertMessage error={errorMsg} success={successMsg} />
      <MedicamentoForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        tipos={tipos}
        especialidades={especialidades}
        cargarDatos={cargarDatos}
        loading={loading}
      />
      <MedicamentoTable
        medicamentos={medicamentos}
        loading={loading}
        handleEliminar={handleEliminar}
      />
    </div>
  );
};

export default Medicamentos;