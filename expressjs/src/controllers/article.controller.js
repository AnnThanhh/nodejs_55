import { responseSuccess } from "../common/helpers/response.helper.js";
import { articleService } from "../services/article.service.js";
//controller: sử dụng để gọi/điều hướng qua các service tương ứng, sau đó trả về response cho client
export const articleController = {
  async findAll(req, res, next) {
    //gọi service
    const articles = await articleService.findAll(req);
    const response = responseSuccess(
      articles,
      "Lấy danh sách Article thành công",
    );
    res.json(response); // trả về cho client dưới dạng json
  },

  async create(req, res, next) {
    const articles = await articleService.create(req);
    const response = responseSuccess(articles, "Tạo Article thành công");
    res.json(response); // trả về cho client dưới dạng json
  },

  async update(req, res, next) {
    const articles = await articleService.update(req);
    const response = responseSuccess(articles, "Cập nhật Article thành công");
    res.json(response); // trả về cho client dưới dạng json
  },

  async delete(req, res, next) {
    const articles = await articleService.delete(req);
    const response = responseSuccess(articles, "Xóa Article thành công");
    res.json(response); // trả về cho client dưới dạng json
  },
};
