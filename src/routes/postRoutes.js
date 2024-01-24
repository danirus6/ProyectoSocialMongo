const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, postController.createPost);
router.put('/:postId', authMiddleware, postController.updatePost);
router.delete('/:postId', authMiddleware, postController.deletePost);
router.get('/', postController.getAllPosts);
router.get('/search/:name', postController.searchPostsByName);
router.get('/:postId', postController.getPostById);
router.post('/like/:postId', authMiddleware, postController.likePost);
router.post('/unlike/:postId', authMiddleware, postController.unlikePost);

module.exports = router;
