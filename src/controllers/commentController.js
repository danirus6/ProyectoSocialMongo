
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const commentController = {
    async addComment(req, res) {
        try {
            const { postId, text } = req.body;

            const postExists = await Post.findById(postId);
            if (!postExists) {
                return res.status(404).send({ message: 'Post no encontrado.' });
            }

            const comment = new Comment({
                text,
                author: req.user._id,
                post: postId
            });

            await comment.save();

            postExists.comments.push(comment._id);
            await postExists.save();

            res.status(201).send({ message: 'Comentario agregado con éxito', comment });
        } catch (error) {
            res.status(500).send({ message: 'Error al agregar el comentario', error });
        }
    },

};

module.exports = commentController;