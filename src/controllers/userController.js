
const User = require('../config/config');
const bcrypt = require('bcrypt');
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
            res.status(500).send({ message: 'Error al registrar usuario', error });
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
    async updateComment(req, res) {
        try {
            const { commentId, text } = req.body;
            const comment = await Comment.findOneAndUpdate(
                { _id: commentId, author: req.user._id },
                { text },
                { new: true }
            );

            if (!comment) {
                return res.status(404).send({ message: 'Comentario no encontrado o no autorizado.' });
            }

            res.send({ message: 'Comentario actualizado con éxito', comment });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar el comentario', error });
        }
    },
    async deleteComment(req, res) {
        try {
            const { commentId } = req.body;
            const comment = await Comment.findOneAndDelete({ _id: commentId, author: req.user._id });

            if (!comment) {
                return res.status(404).send({ message: 'Comentario no encontrado o no autorizado para eliminar.' });
            }

            // Opcionalmente, remover el comentario del post
            await Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });

            res.send({ message: 'Comentario eliminado con éxito' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el comentario', error });
        }
    },
};

module.exports = userController;
