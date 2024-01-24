// postRoutes.js

const express = require('express');
const postController = require('../controller/postRoutes.js');
const router = express.Router();

// Crear un nuevo post
router.post('/', postController.createPost);

router.get('/', postController.getAllPosts);

router.put('/', postController.updatePost);

router.delete('/', postController.deletePost);

module.exports = router;
