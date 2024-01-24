

const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();

// Agregar un comentario a un post
router.post('/',  commentController.addComment);

// Actualizar un comentario
router.put('/', /* middleware de autenticación, */ commentController.updateComment);

// Eliminar un comentario
router.delete('/', /* middleware de autenticación, */ commentController.deleteComment);

module.exports = router;
