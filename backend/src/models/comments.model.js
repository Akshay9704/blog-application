import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);