import express from "express";
import rootRouter from "./src/routers/root.router.js";

const app = express();

//js version cũ: commonjs
// const express = require("express")

//js version mới: es module, es6 .mjs
// import express from "express"

//định nghĩa api
app.use("/api", rootRouter);

const PORT = 3069;
app.listen(PORT, () => {
  //sau khi server chạy, sẽ tiếp tục thực các logic code bên trong callback
  console.log(`server online at port: ${PORT}`);
});
