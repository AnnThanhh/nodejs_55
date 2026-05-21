import express from "express";
import articleRouter from "./article.router.js";
import authRouter from "./auth.router.js";
const rootRouter = express.Router();
//định nghĩa ra các router con, liên tới các module khác nhau,

rootRouter.use("/article", articleRouter);
rootRouter.use("/auth", authRouter);

export default rootRouter;
