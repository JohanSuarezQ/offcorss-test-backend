const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

module.exports = router;