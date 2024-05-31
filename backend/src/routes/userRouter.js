import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { loginUser, logoutUser, registerUser, getCurrentUser } from "../controllers/auth.controller.js";

const router = Router();

router.route("/register", verifyToken).post(registerUser)

router.route("/login", verifyToken).post(loginUser)

router.route("/getUser").get(getCurrentUser)

router.route("/logout").get(logoutUser)

export default router;