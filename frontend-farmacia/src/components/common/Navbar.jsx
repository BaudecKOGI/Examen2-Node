import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logoutUser(); // Ejecuta la funcion del contexto que resetea el usuario a null
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">💊 Farmacia System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/laboratorios">Laboratorios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medicamentos">Medicamentos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ordenes-compra">Órdenes Compra</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ordenes-venta">Órdenes Venta</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            <span className="text-light">👤 {user.username || user.nombre || 'Usuario'}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;