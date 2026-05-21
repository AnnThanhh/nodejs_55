import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/appError.helper.js";
import cors from "cors";
const app = express();

//js version cũ: commonjs
// const express = require("express")

//js version mới: es module, es6 .mjs
// import express from "express"
app.use(express.json()); //middleware để parse body của request có định dạng json

// app.use((req, res, next) => {
//   console.log(req.headers);

//  gọi res.setHeader() để thiết lập các header cần thiết cho response, ví dụ như header để cho phép truy cập từ client ở domain khác (CORS)
//   res.setHeader("access-control-allow-methods", "GET, POST, PUT, DELETE");
//   res.setHeader("access-control-allow-headers", "content-type");
//   res.setHeader("access-control-allow-origin", "http://localhost:3000");

//   next();
// });
// app.use(cors({ origin: "*" })); //cho phép truy cập từ mọi domain
app.use(cors({ origin: ["http://localhost:3000", "http://google.com"] })); //middleware để thiết lập CORS, cho phép truy cập từ client ở domain http://localhost:3000

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
