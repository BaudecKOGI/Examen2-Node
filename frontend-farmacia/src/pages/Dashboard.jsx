import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <h1 className="display-5 fw-bold">Bienvenido al Sistema de Farmacia</h1>
        <p className="col-md-8 fs-4">
          Hola, <strong>{user?.username}</strong>. Has accedido correctamente con el rol de{' '}
          <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : user?.role === 'moderator' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
            {user?.role}
          </span>.
        </p>
        <hr className="my-4" />

        {/* Vista para ADMINISTRADOR */}
        {user?.role === 'admin' && (
          <div>
            <p className="text-muted">Tienes acceso total al sistema (gestión de laboratorios y órdenes de compra).</p>
            <div className="d-flex gap-3">
              <Link to="/laboratorios" className="btn btn-primary btn-lg">Gestión de Laboratorios</Link>
              <Link to="/ordenes-compra" className="btn btn-success btn-lg">Gestión de Órdenes de Compra</Link>
            </div>
          </div>
        )}

        {/* Vista para MODERADOR */}
        {user?.role === 'moderator' && (
          <div>
            <p className="text-muted">Tienes acceso intermedio al sistema (únicamente gestión de laboratorios).</p>
            <div className="d-flex gap-3">
              <Link to="/laboratorios" className="btn btn-primary btn-lg">Gestión de Laboratorios</Link>
            </div>
          </div>
        )}

        {/* Vista para USUARIO REGULAR */}
        {user?.role === 'user' && (
          <div className="alert alert-info">
            <h5>Vista Limitada</h5>
            <p className="mb-0">Tu cuenta no tiene privilegios para modificar o crear laboratorios ni órdenes de compra. Si requieres permisos adicionales, contacta al administrador.</p>
          </div>
        )}
      </div>
    </div>
  );
}