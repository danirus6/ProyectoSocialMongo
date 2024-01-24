const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es necesario'],
    },
    body: {
        type: String,
        required: [true, 'El cuerpo del post no puede estar vacío'],
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],

}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
