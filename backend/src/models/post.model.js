import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);