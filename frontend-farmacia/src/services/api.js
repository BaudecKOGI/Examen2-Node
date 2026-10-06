import axios from 'axios';

// Instancia de Axios configurada con la URL de Render o Localhost
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adjuntar automáticamente el Token JWT en cada petición
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para capturar respuestas y formatear errores de forma amigable
API.interceptors.response.use(
  (response) => response,
  (error) => {
    let mensajeAmigable = 'Ocurrió un error inesperado. Inténtelo más tarde.';

    if (error.response) {
      // El servidor respondió con un status code fuera del rango 2xx
      const { status, data } = error.response;

      if (status === 401) {
        mensajeAmigable = 'Sesión expirada o no autorizada. Por favor, vuelva a iniciar sesión.';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Opcional: redireccionar al login si no estamos ahí
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      } else if (status === 403) {
        mensajeAmigable = 'No tiene permisos para realizar esta acción.';
      } else if (status === 404) {
        mensajeAmigable = data.error || 'El recurso solicitado no fue encontrado.';
      } else if (data && data.error) {
        mensajeAmigable = data.error;
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta (servidor apagado o sin red)
      mensajeAmigable = 'No se pudo conectar con el servidor. Verifique su conexión a internet.';
    }

    // Retornamos el error formateado para que las vistas puedan mostrarlo directamente
    return Promise.reject(new Error(mensajeAmigable));
  }
);

export default API;