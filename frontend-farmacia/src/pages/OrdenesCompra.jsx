import React, { useState, useEffect } from 'react';
import API from '../services/api';
import AlertMessage from '../components/common/AlertMessage';
import OrdenCompraForm from '../components/ordenes/compra/OrdenCompraForm';
import OrdenCompraTable from '../components/ordenes/compra/OrdenCompraTable';

const OrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [formData, setFormData] = useState({
    fechaEmision: new Date().toISOString().split('T')[0],
    Situacion: 'Aprobado',
    Total: '',
    CodLab: '',
    NrofacturaProv: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => { cargarDatos(); }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [resOrd, resLab] = await Promise.all([
        API.get('/ordenes-compra'),
        API.get('/laboratorios')
      ]);
      setOrdenes(resOrd.data);
      setLaboratorios(resLab.data);
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');
    setLoading(true);
    try {
      await API.post('/ordenes-compra', formData);
      setSuccessMsg('Orden de compra emitida exitosamente.');
      setFormData({
        fechaEmision: new Date().toISOString().split('T')[0],
        Situacion: 'Aprobado',
        Total: '',
        CodLab: '',
        NrofacturaProv: ''
      });
      cargarDatos();
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  const handleEliminar = async (NroOrdenC) => {
    if (!window.confirm('¿Está seguro de eliminar esta orden de compra?')) return;
    setLoading(true); setErrorMsg(''); setSuccessMsg('');
    try {
      await API.delete(`/ordenes-compra/${NroOrdenC}`);
      setSuccessMsg('Orden de compra eliminada.');
      cargarDatos();
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="container mt-2">
      <h2>Gestión de Órdenes de Compra</h2>
      <hr />
      <AlertMessage error={errorMsg} success={successMsg} />
      <OrdenCompraForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        laboratorios={laboratorios}
        loading={loading}
      />
      <OrdenCompraTable
        ordenes={ordenes}
        loading={loading}
        handleEliminar={handleEliminar}
      />
    </div>
  );
};

export default OrdenesCompra;