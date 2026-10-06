import React from 'react';

const OrdenCompraTable = ({ ordenes, loading, handleEliminar }) => (
  <>
    <h4 className="mt-4">Historial de Órdenes de Compra</h4>
    {loading && !ordenes.length ? (
      <p>Cargando órdenes...</p>
    ) : (
      <table className="table table-striped table-hover mt-3 align-middle shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Nro. Orden</th>
            <th>Laboratorio</th>
            <th>Nro. Factura</th>
            <th>Fecha Emisión</th>
            <th>Situación</th>
            <th>Total (S/)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.length === 0 ? (
            <tr><td colSpan="7" className="text-center">No hay órdenes de compra registradas.</td></tr>
          ) : (
            ordenes.map((ord) => (
              <tr key={ord.NroOrdenC}>
                <td><strong>ORD-{ord.NroOrdenC}</strong></td>
                <td>{ord.Laboratorio?.razonSocial || 'N/A'}</td>
                <td>{ord.NrofacturaProv || '-'}</td>
                <td>{ord.fechaEmision}</td>
                <td>
                  <span className={`badge ${ord.Situacion === 'Aprobado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {ord.Situacion || 'Pendiente'}
                  </span>
                </td>
                <td>S/ {Number(ord.Total).toFixed(2)}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(ord.NroOrdenC)}>
                    Anular / Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    )}
  </>
);

export default OrdenCompraTable;