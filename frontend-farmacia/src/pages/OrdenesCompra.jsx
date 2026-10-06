import { useState, useEffect } from 'react';
import API from '../services/api';

export default function OrdenesCompra() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    API.get('/ordenes-compra')
      .then((res) => setOrdenes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-primary">Órdenes de Compra Relacionadas</h3>
      <table className="table table-bordered shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>N° Orden</th>
            <th>Fecha Emisión</th>
            <th>Situación</th>
            <th>Total (S/)</th>
            <th>Laboratorio Asociado</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.NroOrdenC}>
              <td>OC-{orden.NroOrdenC}</td>
              <td>{orden.fechaEmision}</td>
              <td><span className="badge bg-warning text-dark">{orden.Situacion}</span></td>
              <td>S/ {Number(orden.Total).toFixed(2)}</td>
              <td><strong>{orden.laboratorio?.razonSocial || 'N/A'}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}