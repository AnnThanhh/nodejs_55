import express from "express";
import articleRouter from "./article.router.js";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import chatGroupRouter from "./chatGroup.router.js";
import chatMessageRouter from "./chatMessage.router.js";
const rootRouter = express.Router();
//định nghĩa ra các router con, liên tới các module khác nhau,

rootRouter.use("/article", articleRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/chat-group", chatGroupRouter);
rootRouter.use("/chat-message", chatMessageRouter);

export default rootRouter;
