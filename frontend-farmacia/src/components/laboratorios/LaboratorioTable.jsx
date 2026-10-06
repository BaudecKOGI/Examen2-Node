import React from 'react';

const LaboratorioTable = ({ laboratorios, loading, handleEditar, handleEliminar }) => (
  <>
    <h4 className="mt-4">Lista de Laboratorios</h4>
    {loading && !laboratorios.length ? (
      <p>Cargando datos...</p>
    ) : (
      <table className="table table-striped table-hover mt-3 align-middle shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Razón Social</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {laboratorios.length === 0 ? (
            <tr><td colSpan="6" className="text-center">No hay laboratorios registrados.</td></tr>
          ) : (
            laboratorios.map((lab) => (
              <tr key={lab.CodLab}>
                <td><strong>{lab.CodLab}</strong></td>
                <td>{lab.razonSocial}</td>
                <td>{lab.contacto || '-'}</td>
                <td>{lab.telefono || '-'}</td>
                <td>{lab.email || '-'}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditar(lab)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(lab.CodLab)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    )}
  </>
);

export default LaboratorioTable;