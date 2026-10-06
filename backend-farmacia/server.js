const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const { 
  sequelize, 
  Laboratorio, 
  OrdenCompra, 
  TipoMedic, 
  Especialidad, 
  Medicamento 
} = require('./models');

const authMiddleware = require('./middleware/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const laboratorioRoutes = require('./routes/laboratorioRoutes');
const ordenCompraRoutes = require('./routes/ordenCompraRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
const ordenVentaRoutes = require('./routes/ordenVentaRoutes');
const catalogosRoutes = require('./routes/catalogosRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas Públicas
app.use('/api/auth', authRoutes);
app.use('/api/catalogos', catalogosRoutes);

// Rutas Protegidas por JWT
app.use('/api/laboratorios', authMiddleware, laboratorioRoutes);
app.use('/api/ordenes-compra', authMiddleware, ordenCompraRoutes);
app.use('/api/medicamentos', authMiddleware, medicamentoRoutes);
app.use('/api/ordenes-venta', authMiddleware, ordenVentaRoutes);

const PORT = process.env.PORT || 3000;

// Creación automática de la base de datos si es local
async function createDatabaseIfNotExists() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASS || '';
  const database = process.env.DB_NAME || 'bd_Farmacia';

  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  await connection.end();
}

// Carga inicial de datos de prueba para las 8 tablas
async function seedDatabase() {
  const countLab = await Laboratorio.count();
  if (countLab === 0) {
    // 1. Laboratorios
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

    // 2. Catálogos (TipoMedic y Especialidad)
    const tipo1 = await TipoMedic.create({ descripcion: 'Analgesico' });
    const tipo2 = await TipoMedic.create({ descripcion: 'Antibiotico' });

    const esp1 = await Especialidad.create({ descripcionEsp: 'Medicina General' });
    const esp2 = await Especialidad.create({ descripcionEsp: 'Pediatria' });

    // 3. Medicamentos
    await Medicamento.create({
      descripcionMed: 'Paracetamol 500mg',
      fechaFabricacion: '2025-01-10',
      fechaVencimiento: '2027-01-10',
      Presentacion: 'Caja x 100 pastillas',
      stock: 50,
      precioVentaUni: 0.50,
      precioVentaPres: 45.00,
      CodTipoMed: tipo1.CodTipoMed,
      Marca: 'Bayer',
      CodEspec: esp1.CodEspec
    });

    // 4. Órdenes de Compra
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

    console.log('🌱 Datos iniciales insertados en las 8 tablas de la BD.');
  }
}

async function startServer() {
  try {
    await createDatabaseIfNotExists();
    console.log('✅ Base de datos verificada/creada en MySQL.');

    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos y las 8 tablas sincronizadas correctamente.');

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend listo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar la BD:', err);
  }
}

startServer();