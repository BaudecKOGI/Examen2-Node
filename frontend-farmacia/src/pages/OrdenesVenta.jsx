import React, { useState, useEffect } from 'react';
import API from '../services/api';
import AlertMessage from '../components/common/AlertMessage';
import OrdenVentaForm from '../components/ordenes/venta/OrdenVentaForm';
import OrdenVentaTable from '../components/ordenes/venta/OrdenVentaTable';

const OrdenesVenta = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [formData, setFormData] = useState({
    fechaEmision: new Date().toISOString().split('T')[0],
    Motivo: 'Venta de Mostrador',
    Situacion: 'Completado'
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => { cargarVentas(); }, []);

  const cargarVentas = async () => {
    setLoading(true);
    try {
      const res = await API.get('/ordenes-venta');
      setOrdenes(res.data);
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');
    setLoading(true);
    try {
      await API.post('/ordenes-venta', formData);
      setSuccessMsg('Orden de venta registrada exitosamente.');
      setFormData({
        fechaEmision: new Date().toISOString().split('T')[0],
        Motivo: 'Venta de Mostrador',
        Situacion: 'Completado'
      });
      cargarVentas();
    } catch (err) { setErrorMsg(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="container mt-2">
      <h2>Gestión de Órdenes de Venta</h2>
      <hr />
      <AlertMessage error={errorMsg} success={successMsg} />
      <OrdenVentaForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />
      <OrdenVentaTable ordenes={ordenes} loading={loading} />
    </div>
  );
};

export default OrdenesVenta;