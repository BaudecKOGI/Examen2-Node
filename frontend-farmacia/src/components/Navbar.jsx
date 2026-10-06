import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold text-warning fs-3" to="/dashboard">Farmacia Stack</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard">Inicio</Link>
          </li>

          {/* Menú visible para Administrador y Moderador */}
          {(user.role === 'admin' || user.role === 'moderator') && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/laboratorios">Laboratorios</Link>
            </li>
          )}

          {/* Menú visible únicamente para Administrador */}
          {user.role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/ordenes-compra">Órdenes de Compra</Link>
            </li>
          )}
        </ul>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white badge bg-dark me-2">
            {user.username} ({user.role?.toUpperCase()})
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}