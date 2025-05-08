const express = require('express');
const mongoose = require('mongoose');
require('./db/connection');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));