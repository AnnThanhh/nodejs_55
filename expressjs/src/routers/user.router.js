import express from "express";
import { userController } from "../controllers/user.controller.js";
import multer from "multer";

const userRouter = express.Router();

const upload = multer({ dest: "images/" });

// Tạo route CRUD
userRouter.post(
  "/avatar-local",
  upload.single("avatar"),
  userController.avatarLocal,
);
userRouter.post("/avatar-cloud", userController.avatarCloud);

export default userRouter;
