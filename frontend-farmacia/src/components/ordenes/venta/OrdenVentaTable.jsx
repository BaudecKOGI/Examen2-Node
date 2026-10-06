import React from 'react';

const OrdenVentaTable = ({ ordenes, loading }) => (
  <>
    <h4 className="mt-4">Historial de Órdenes de Venta</h4>
    {loading && !ordenes.length ? (
      <p>Cargando ventas...</p>
    ) : (
      <table className="table table-striped table-hover mt-3 align-middle shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Nro. Venta</th>
            <th>Fecha Emisión</th>
            <th>Motivo</th>
            <th>Situación</th>
            <th>Detalle Ítems</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.length === 0 ? (
            <tr><td colSpan="5" className="text-center">No hay ventas registradas.</td></tr>
          ) : (
            ordenes.map((vta) => (
              <tr key={vta.NroOrdenVta}>
                <td><strong>VTA-{vta.NroOrdenVta}</strong></td>
                <td>{vta.fechaEmision}</td>
                <td>{vta.Motivo || 'Venta Contado'}</td>
                <td>
                  <span className={`badge ${vta.Situacion === 'Completado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {vta.Situacion || 'Completado'}
                  </span>
                </td>
                <td>
                  <small className="text-muted">
                    {vta.DetalleOrdenVta?.length > 0
                      ? `${vta.DetalleOrdenVta.length} producto(s)`
                      : 'Sin detalles'}
                  </small>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    )}
  </>
);

export default OrdenVentaTable;