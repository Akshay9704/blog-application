import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createPost, getPosts, userPosts, updatePost, deletePost, getPostDetails } from "../controllers/post.controller.js";

const router = Router();

router.route("/create", verifyToken).post(createPost)
router.route("/", verifyToken).get(getPosts)
router.route("/user/:userId", verifyToken).get(userPosts)
router.route("/:id", verifyToken).put(updatePost)
router.route("/:id", verifyToken).delete(deletePost)
router.route("/:id", verifyToken).get(getPostDetails)

export default router;
