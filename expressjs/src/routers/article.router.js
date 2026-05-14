import express from "express";
import { articleController } from "../controllers/article.controller.js";
import { responseErr } from "../common/helpers/response.helper.js";
import { BadRequestError } from "../common/helpers/exception.helper.js";
const articleRouter = express.Router();

//req, res: sẽ sử dụng chung vùng nhớ, nên có thể truyền dữ liệu qua lại giữa các middleware thông qua req hoặc res
//req, res: là đối tượng của express
//CRUD
//Read
articleRouter.get(
  "/",
  (req, res, next) => {
    console.log("middleware 1");
    // xử lý logic -> A
    const resultA = "Kết quả A";
    res.payload = resultA; // gán kết quả A vào res.payload để truyền cho middleware tiếp theo sử dụng
    next(); // gọi next để tiếp tục chạy middleware tiếp theo, nếu không có sẽ bị treo ở middleware hiện tại
  },
  (req, res, next) => {
    console.log("middleware 2");
    // có thể lấy được kết quả A từ middleware trước đó thông qua res.payload
    next();
  },
  (req, res, next) => {
    console.log("middleware 3");
    //throw = return
    // const err = new Error("Lỗi ở middleware 4");
    console.log(res.payload);
    next();
  },
  (req, res, next) => {
    console.log("middleware 4");
    // if (true) {
    //   const errorResponse = responseErr();
    //   //cú pháp: res.status(statusCode).json(data) -> để trả về response với status code và data tương ứng
    //   res.status(errorResponse.statusCode).json(errorResponse);
    //   console.log("Lỗi ở middleware 4", errorResponse);
    // } else {
    //   next();
    // }
    // throw new BadRequestError();
    next();
  },
  articleController.findAll,
);

//Create
articleRouter.post("/", articleController.create);

export default articleRouter;
