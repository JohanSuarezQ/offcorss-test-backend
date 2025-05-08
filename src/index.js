const express = require('express');
const mongoose = require('mongoose');
require('./db/connection'); // Conexión a la base de datos

const app = express();
app.use(express.json());

// Rutas de usuario
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));