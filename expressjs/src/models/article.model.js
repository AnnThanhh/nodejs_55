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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", //đúng chính xác các thông tin trong database
        key: "id",
      },
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN, // tiny (1): chỉ chứa 2 giá trị: 0 và số 1
      defaultValue: 0, // 0: false, 1: true
    },
    deletedAt: {
      type: "TIMESTAMP",
      defaultValue: null,
      allowNull: true,
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), //giá trị mặc định sẽ là thời gian hiện tại khi bản ghi được tạo ra trong database
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
      ),
    },
  },
  {
    tableName: "Articles", //tên bảng trong database, nếu không có trường này, Sequelize sẽ tự động chuyển tên modal thành chữ thường và thêm "s" vào cuối để làm tên bảng (ví dụ: Article -> articles)
    timestamps: false, //tắt tính năng tự động thêm 2 cột createdAt và updatedAt vào bảng trong database
  },
);

//code first:
await Article.sync(); //đồng bộ modal Article với bảng Articles trong database, nếu bảng chưa tồn tại sẽ được tạo mới, nếu đã tồn tại sẽ không làm gì cả

export default Article;
