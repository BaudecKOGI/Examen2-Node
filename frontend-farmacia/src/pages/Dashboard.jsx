import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-4">
      <div className="p-4 mb-4 bg-light rounded-3 shadow-sm border">
        <h1 className="display-6 fw-bold">Bienvenido al Sistema de Farmacia</h1>
        <p className="fs-5 text-muted">
          Hola, <strong>{user?.username || 'Usuario'}</strong>. Rol activo:{' '}
          <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : user?.role === 'moderator' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
            {user?.role?.toUpperCase()}
          </span>
        </p>
        <hr />

        <div className="row g-4 mt-2">
          {/* Módulo Laboratorios: Admin y Moderator */}
          {(user?.role === 'admin' || user?.role === 'moderator') && (
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-primary">
                <div className="card-body text-center">
                  <h5 className="card-title text-primary">🔬 Laboratorios</h5>
                  <p className="card-text text-muted small">Gestión de proveedores y laboratorios fabricantes.</p>
                  <Link to="/laboratorios" className="btn btn-outline-primary btn-sm w-100">Acceder</Link>
                </div>
              </div>
            </div>
          )}

          {/* Módulo Medicamentos: Todos los roles autenticados */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-info">
              <div className="card-body text-center">
                <h5 className="card-title text-info">💊 Medicamentos</h5>
                <p className="card-text text-muted small">Catálogo e inventario general de medicamentos.</p>
                <Link to="/medicamentos" className="btn btn-outline-info btn-sm w-100">Acceder</Link>
              </div>
            </div>
          </div>

          {/* Módulo Órdenes de Compra: Solo Admin */}
          {user?.role === 'admin' && (
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-success">
                <div className="card-body text-center">
                  <h5 className="card-title text-success">📦 Órdenes de Compra</h5>
                  <p className="card-text text-muted small">Emisión y control de compras a proveedores.</p>
                  <Link to="/ordenes-compra" className="btn btn-outline-success btn-sm w-100">Acceder</Link>
                </div>
              </div>
            </div>
          )}

          {/* Módulo Órdenes de Venta: Admin y Moderator */}
          {(user?.role === 'admin' || user?.role === 'moderator') && (
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-warning">
                <div className="card-body text-center">
                  <h5 className="card-title text-warning text-dark">🛒 Órdenes de Venta</h5>
                  <p className="card-text text-muted small">Registro y seguimiento de ventas realizadas.</p>
                  <Link to="/ordenes-venta" className="btn btn-outline-warning text-dark btn-sm w-100">Acceder</Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {user?.role === 'user' && (
          <div className="alert alert-info mt-4 mb-0">
            <strong>Modo Consulta:</strong> Tu cuenta tiene permisos de lectura para consultar el catálogo de medicamentos.
          </div>
        )}
      </div>
    </div>
  );
}