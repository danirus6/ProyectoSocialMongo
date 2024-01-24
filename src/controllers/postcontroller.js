
const Post = require('./models/Post');

const postController = {
    async createPost(req, res) {
        try {
            const { title, body } = req.body;
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

};

module.exports = postController;
