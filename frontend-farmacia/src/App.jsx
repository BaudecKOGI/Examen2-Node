import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Laboratorios from './pages/Laboratorios';
import Medicamentos from './pages/Medicamentos';
import OrdenesCompra from './pages/OrdenesCompra';
import OrdenesVenta from './pages/OrdenesVenta';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container py-2">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas Protegidas */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/laboratorios" element={<PrivateRoute><Laboratorios /></PrivateRoute>} />
            <Route path="/medicamentos" element={<PrivateRoute><Medicamentos /></PrivateRoute>} />
            <Route path="/ordenes-compra" element={<PrivateRoute><OrdenesCompra /></PrivateRoute>} />
            <Route path="/ordenes-venta" element={<PrivateRoute><OrdenesVenta /></PrivateRoute>} />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}