import express from "express";
import userController from "../controllers/user_controller.js";
import { isAuthenticate } from "../middleware/auth_middleware.js";

const router = express.Router();

router.post("/register", userController.register_user);
router.post("/login", userController.login_user);
router.get("/logout", isAuthenticate, userController.logout_user);

export default router;