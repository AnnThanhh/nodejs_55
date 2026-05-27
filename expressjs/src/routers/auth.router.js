import express from "express";
import { authController } from "../controllers/auth.controller.js";
const authRouter = express.Router();

// Tạo route CRUD
// http://localhost:3069/api/auth/login
authRouter.post("/login", authController.login);
// http://localhost:3069/api/auth/register
authRouter.post("/register", authController.register);
// http://localhost:3069/api/auth/forgot-password
authRouter.post("/forgot-password", authController.forgotPassword);

export default authRouter;
