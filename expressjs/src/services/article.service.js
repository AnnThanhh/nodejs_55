//service: xử lý logic nghiệp vụ, tương tác với database, sau đó trả về kết quả cho controller
// import sequelize from "../common/squelize/connect.sequelize.js";
import Article from "../models/article.model.js";
import { prisma } from "../common/prisma/connect.prisma.js";

//body: gửi đoạn json lên server
//header: user token, accept, method,...
//params

export const articleService = {
  async findAll(req) {
    //squelize
    // const res = await Article.findAll();

    //xử lý phân trang
    let { page, pageSize } = req.query;
    console.log(page, pageSize);

    const pageDefault = 1;
    const pageSizeDefault = 3;

    //xử lý chuyển về số nguyên
    page = Number(page) || pageDefault;
    pageSize = Number(pageSize) || pageSizeDefault;

    //xử lý trường hợp số âm
    if (page < 1) page = pageDefault;
    if (pageSize < 1) pageSize = pageSizeDefault;

    //index: vị trí bắt đầu lấy dữ liệu
    const index = (page - 1) * pageSize;
    //prisma
    //thay vì viết raw sql thì sẽ sử dụng prisma để có thể phân trang
    const res = await prisma.articles.findMany({
      where: {
        isDeleted: false,
      },
      skip: index, // tương đương với offset trong sql
      take: pageSize, // tương đương với limit trong sql
    });
    
    //thông qua .count để số tổng và điều kiện chưa bị xóa
    const totalItems = await prisma.articles.count({
      where: {
        isDeleted: false,
      },
    });
    //tính tổng số trang thông qua math.ceil để làm tròn lên ví dụ 3.4 ~ 4 trang
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      items: res,
      totalItems: totalItems,
      totalPages: totalPages,
      page: page,
      pageSize: pageSize,
    };
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

  //http://localhost:3069/api/article
  async update(req) {
    const { articleId } = req.params;
    console.log(articleId); //articleId sẽ là string, nên cần chuyển sang number để so sánh với id trong database có kiểu dữ liệu là integer

    const body = req.body;
    console.log(body);

    const res = await prisma.articles.update({
      where: {
        id: Number(articleId),
      },
      data: {
        title: body.title,
        content: body.content,
        // userId: Number(body.userId),
        //Foreign key constraint violated on the fields: (`userId`)
        //2 trường hợp xảy ra lỗi này:
        //1. cập nhật userId bị sai kiểu dữ liệu (ví dụ: string thay vì number)
        //2. cập nhật userId sang một giá trị không tồn tại trong bảng Users (ví dụ: userId = 9999, nhưng trong bảng Users không có id nào là 9999)
      },
    });

    return true;
  },

  async delete(req) {
    const { articleId } = req.params;

    //delete thật trong db (không sử dụng để bảo toàn dữ liệu)
    // const res = await prisma.articles.delete({
    //   where: {
    //     id: Number(articleId),
    //   },
    // });

    //soft delete (cập nhật trường isDeleted = true để đánh dấu đã xóa, nhưng vẫn giữ dữ liệu trong db)
    await prisma.articles.update({
      where: {
        id: Number(articleId),
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(), //lưu lại thời gian xóa
        deletedBy: 1, //lưu lại ID người xóa, ở đây tạm thời gán cứng là 1, nhưng thực tế sẽ lấy từ token của user khi đăng nhập vào hệ thống để biết được ai là người xóa
      },
    });

    return true;
  },
};
