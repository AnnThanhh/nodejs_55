//service: xử lý logic nghiệp vụ, tương tác với database, sau đó trả về kết quả cho controller
// import sequelize from "../common/squelize/connect.sequelize.js";
import Article from "../models/article.model.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const articleService = {
  async findAll() {
    //squelize
    // const res = await Article.findAll();

    //prisma
    const res = await prisma.articles.findMany();
    return res;
  },

  async create(req) {
    const body = req.body;

    const res = await prisma.articles.create({
      data: {
        title: body.title,
        content: body.content,
        userId: body.userId,
      },
    });

    return true;
  },
};
