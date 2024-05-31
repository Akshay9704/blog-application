import { Post } from '../models/post.model.js';
import { Comment } from '../models/comments.model.js';

const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(200).json(error)
    }
};

const getPostDetails = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
};

const userPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
};

const updatePost = async (req, res) => {
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(500).json(error)
    }
};

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id });
        res.status(200).json("Post has been deleted...");
    } catch (error) {
        res.status(500).json(error)
    }
};

export { createPost, getPosts, updatePost, deletePost, userPosts, getPostDetails }
