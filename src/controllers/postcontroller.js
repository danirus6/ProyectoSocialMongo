
const Post = require('../models/Post');

const postController = {
    async createPost(req, res) {
        try {
            const { title, body } = req.body;

            if (!title || !body) {
                return res.status(400).send({ message: 'Título y cuerpo son requeridos' });
            }

            const post = new Post({ title, body, author: req.user._id });
            await post.save();

            res.status(201).send({ message: 'Post creado con éxito', post });
        } catch (error) {
            res.status(500).send({ message: 'Error al crear el post', error });
        }
    },

    async getAllPosts(req, res) {
        try {
            const posts = await Post.find().populate('author', 'name email -_id');
            res.send(posts);
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener los posts', error });
        }
    },
    async updatePost(req, res) {
        try {
            const { postId, title, body } = req.body;
            const post = await Post.findOneAndUpdate(
                { _id: postId, author: req.user._id },
                { title, body },
                { new: true }
            );

            if (!post) {
                return res.status(404).send({ message: 'Post no encontrado o no autorizado.' });
            }

            res.send({ message: 'Post actualizado con éxito', post });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar el post', error });
        }
    },

    async deletePost(req, res) {
        try {
            const { postId } = req.body;
            const post = await Post.findOneAndDelete({ _id: postId, author: req.user._id });

            if (!post) {
                return res.status(404).send({ message: 'Post no encontrado o no autorizado para eliminar.' });
            }

            res.send({ message: 'Post eliminado con éxito' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el post', error });
        }
    },
    async searchPostsByName(req, res) {
        try {
            const { name } = req.params;
            const posts = await Post.find({ title: new RegExp(name, 'i') });
            res.send(posts);
        } catch (error) {
            res.status(500).send({ message: 'Error en la búsqueda', error });
        }
    },
    async getPostById(req, res) {
        try {
            const { postId } = req.params;
            const post = await Post.findById(postId).populate('author', 'name').populate('comments');
            if (!post) {
                return res.status(404).send({ message: 'Post no encontrado' });
            }
            res.send(post);
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener el post', error });
        }
    },
    async likePost(req, res) {
        try {
            const { postId } = req.params;
            const post = await Post.findByIdAndUpdate(postId, {
                $addToSet: { likes: req.user._id }
            }, { new: true });

            if (!post) {
                return res.status(404).send({ message: 'Post no encontrado' });
            }

            res.send({ message: 'Like agregado', post });
        } catch (error) {
            res.status(500).send({ message: 'Error al dar like', error });
        }
    },

    async unlikePost(req, res) {
        try {
            const { postId } = req.params;
            const post = await Post.findByIdAndUpdate(postId, {
                $pull: { likes: req.user._id }
            }, { new: true });

            if (!post) {
                return res.status(404).send({ message: 'Post no encontrado' });
            }

            res.send({ message: 'Like quitado', post });
        } catch (error) {
            res.status(500).send({ message: 'Error al quitar like', error });
        }
    },
    

};

module.exports = postController;
