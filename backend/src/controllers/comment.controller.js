import { Post } from '../models/post.model.js';
import { Comment } from '../models/comments.model.js';

const createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(200).json(error)
    }
};

const updateComment = async (req, res) => {
    try {
        const updateComment = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updateComment);
    } catch (error) {
        res.status(500).json(error)
    }
};

const deleteComment = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted...");
    } catch (error) {
        res.status(500).json(error)
    }
};

const getPostComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error)
    }
};

export { createComment, updateComment, deleteComment, getPostComments }
