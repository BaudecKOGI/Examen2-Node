const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const { sequelize, Laboratorio, OrdenCompra } = require('./models');
const authMiddleware = require('./middleware/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const laboratorioRoutes = require('./routes/laboratorioRoutes');
const ordenCompraRoutes = require('./routes/ordenCompraRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas Públicas
app.use('/api/auth', authRoutes);

// Rutas Protegidas por JWT
app.use('/api/laboratorios', authMiddleware, laboratorioRoutes);
app.use('/api/ordenes-compra', authMiddleware, ordenCompraRoutes);

const PORT = process.env.PORT || 3000;

// Garantiza la creación de la base de datos en MySQL antes de conectar Sequelize
async function createDatabaseIfNotExists() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASS || '';
  const database = process.env.DB_NAME || 'bd_Farmacia';

  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  await connection.end();
}

// Función para insertar registros iniciales automáticamente usando Sequelize
async function seedDatabase() {
  const count = await Laboratorio.count();
  if (count === 0) {
    const lab1 = await Laboratorio.create({
      razonSocial: 'Bayer S.A.',
      direccion: 'Av. Primavera 123',
      telefono: '987654321',
      email: 'contacto@bayer.com',
      contacto: 'Carlos Lopez'
    });

    const lab2 = await Laboratorio.create({
      razonSocial: 'Pfizer Peru',
      direccion: 'Av. Central 456',
      telefono: '912345678',
      email: 'ventas@pfizer.com',
      contacto: 'Ana Torres'
    });

    await OrdenCompra.create({
      fechaEmision: '2026-03-01',
      Situacion: 'Aprobado',
      Total: 2500.00,
      CodLab: lab1.CodLab,
      NrofacturaProv: 'F001-987'
    });

    await OrdenCompra.create({
      fechaEmision: '2026-03-05',
      Situacion: 'Pendiente',
      Total: 1800.50,
      CodLab: lab2.CodLab,
      NrofacturaProv: 'F001-988'
    });

    console.log('🌱 Registros iniciales insertados en la BD con Sequelize.');
  }
}

// Inicialización asíncrona del servidor
async function startServer() {
  try {
    await createDatabaseIfNotExists();
    console.log('✅ Base de datos verificada/creada en MySQL.');

    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos "bd_Farmacia" y tablas sincronizadas.');

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar la BD:', err);
  }
}

startServer();