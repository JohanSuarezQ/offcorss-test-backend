const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db/connection');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rutas de productos (VTEX)
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));