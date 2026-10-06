import React from 'react';

const MedicamentoTable = ({ medicamentos, loading, handleEliminar }) => (
  <>
    <h4 className="mt-4">Inventario de Medicamentos</h4>
    {loading && !medicamentos.length ? (
      <p>Cargando datos...</p>
    ) : (
      <table className="table table-striped table-hover mt-3 align-middle shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Marca</th>
            <th>Stock</th>
            <th>Precio (S/)</th>
            <th>Tipo</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.length === 0 ? (
            <tr><td colSpan="8" className="text-center">No hay medicamentos registrados.</td></tr>
          ) : (
            medicamentos.map((med) => (
              <tr key={med.CodMedicamento}>
                <td><strong>{med.CodMedicamento}</strong></td>
                <td>{med.descripcionMed}</td>
                <td>{med.Marca || '-'}</td>
                <td>
                  <span className={`badge ${med.stock < 10 ? 'bg-danger' : 'bg-success'}`}>
                    {med.stock}
                  </span>
                </td>
                <td>S/ {Number(med.precioVentaUni).toFixed(2)}</td>
                <td>{med.TipoMedic?.descripcion || '-'}</td>
                <td>{med.Especialidad?.descripcionEsp || '-'}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(med.CodMedicamento)}>
                    Eliminar
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

export default MedicamentoTable;