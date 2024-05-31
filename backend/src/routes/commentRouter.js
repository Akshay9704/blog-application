import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createComment, updateComment, deleteComment, getPostComments} from "../controllers/comment.controller.js";

const router = Router();

router.route("/create", verifyToken).post(createComment)
router.route("/post/:postId", verifyToken).get(getPostComments)
router.route("/:id", verifyToken).put(updateComment)
router.route("/:id", verifyToken).delete(deleteComment)

export default router;