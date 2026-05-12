import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../common/squelize/connect.sequelize.js";

const Article = sequelize.define(
  "Article", //tên modal sẽ sử dụng cục bộ trong Sequelize, không phải tên bảng trong database
  {
    //định nghĩa các trường của bảng article
    id: {
      //định nghĩa các thông tin trong cột ID
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
   tableName: "Articles", //tên bảng trong database, nếu không có trường này, Sequelize sẽ tự động chuyển tên modal thành chữ thường và thêm "s" vào cuối để làm tên bảng (ví dụ: Article -> articles)
  },
);

export default Article;
