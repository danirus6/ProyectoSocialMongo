const Comment = require('../models/Comment');
const Post = require('../models/Post');

const commentController = {
    async addComment(req, res) {
        try {
            const { postId, text } = req.body;

            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).send({ message: 'Post no encontrado.' });
            }

            const comment = new Comment({
                text,
                author: req.user._id, // 
                post: postId
            });

            await comment.save();
            res.status(201).send({ message: 'Comentario agregado con éxito', comment });
        } catch (error) {
            res.status(500).send({ message: 'Error al agregar el comentario', error });
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
            const { commentId } = req.params; // 

            const comment = await Comment.findOneAndDelete({
                _id: commentId,
                author: req.user._id
            });

            if (!comment) {
                return res.status(404).send({ message: 'Comentario no encontrado o no autorizado para eliminar.' });
            }

            res.send({ message: 'Comentario eliminado con éxito' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el comentario', error });
        }
    },

};
module.exports = commentController;