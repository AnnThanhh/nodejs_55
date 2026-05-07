import { articleService } from "../services/article.service.js";
//controller: sử dụng để gọi/điều hướng qua các service tương ứng, sau đó trả về response cho client
export const articleController = {
  findAll(request, response, next) {
    //gọi service
    const articles = articleService.findAll();
    response.json(articles); // trả về cho client dưới dạng json
  },
};
