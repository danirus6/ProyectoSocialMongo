
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    async register(req, res) {
        try {
            const { name, email, password, age } = req.body;
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).send({ message: 'El email ya está en uso.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword, age });
            await user.save();

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            user.tokens.push(token);
            await user.save();

            res.status(201).send({ message: 'Usuario registrado con éxito', user, token });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).send({ message: 'Error de validación', errors: error.errors });
            }
            res.status(500).send({ message: 'Error al registrar usuario', error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send({ message: 'Contraseña incorrecta.' });
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            user.tokens.push(token);
            await user.save();

            res.send({ message: 'Inicio de sesión exitoso', user, token });
        } catch (error) {
            res.status(500).send({ message: 'Error al iniciar sesión', error });
        }
    },

    async getUserInfo(req, res) {
        try {
            const user = req.user;
            res.send(user);
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener información del usuario', error });
        }
    },
    async logout(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token !== req.token;
            });
            await req.user.save();
            res.send({ message: 'Sesión cerrada con éxito' });
        } catch (error) {
            res.status(500).send({ message: 'Error al cerrar sesión', error });
        }
    },

};

module.exports = userController;
