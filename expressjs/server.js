import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/appError.helper.js";

const app = express();

//js version cũ: commonjs
// const express = require("express")

//js version mới: es module, es6 .mjs
// import express from "express"
app.use(express.json()); //middleware để parse body của request có định dạng json

//định nghĩa api
app.use("/api", rootRouter);

app.use(appError);

const PORT = 3069;
app.listen(PORT, () => {
  //sau khi server chạy, sẽ tiếp tục thực các logic code bên trong callback
  console.log(`server online at port: ${PORT}`);
});

//express < 5: controller bắt buộc bọc try catch để xử lý lỗi, nếu không sẽ bị treo server khi có lỗi xảy ra

//prisma
// npx prisma db pull -> tự động tạo model dựa trên database đã có sẵn (db first)

// npx prisma db push -> tự động tạo database dựa trên model đã định nghĩa sẵn (code first)
