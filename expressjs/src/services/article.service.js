//service: xử lý logic nghiệp vụ, tương tác với database, sau đó trả về kết quả cho controller
import sequelize from "../common/squelize/connect.sequelize.js";
import Article from "../models/article.model.js";
import { prisma } from "../common/prisma/connect.prisma.js";


export const articleService = {
  async findAll() {
    const res = await Article.findAll();
    return res;
  },
};
