import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mysql://root:12345@localhost:3306/nodejs55");

//code test từ web sequelize để kiểm tra kết nối đến database
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
