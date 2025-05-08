const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Endpoint de registro
router.post('/register', async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// Endpoint de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login' });
  }
});

// Endpoint para traer datos de usuario
router.get('/user', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la información del usuario' });
    }
  });
  

module.exports = router;