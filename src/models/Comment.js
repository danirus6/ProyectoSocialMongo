const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'El texto del comentario es necesario'],
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: ObjectId,
        ref: 'Post',
        required: true
    },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
