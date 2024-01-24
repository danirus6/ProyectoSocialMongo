const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, commentController.addComment);
router.put('/:commentId', authMiddleware, commentController.updateComment);
router.delete('/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
