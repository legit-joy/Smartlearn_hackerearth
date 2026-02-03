import {Router} from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
const router = Router();

// Auth routes
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

// "Try for free" is same as signup
router.route("/try-for-free").post(registerUser);

export default router;