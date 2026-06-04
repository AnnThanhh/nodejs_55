import path from "path";
import { BadRequestError } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

export const userService = {
  async avatarLocal(req) {
    //req.file là thông tin file được gửi thông qua key có type là file
    //req.body là thông tin gửi lên server thông qua key có type là text
    console.log({ file: req.file, body: req.body });

    if (!req.file) {
      throw new BadRequestError(`File is required`);
    }
    console.log("user", req.user);

    //vì 1 user chỉ 1 avatar, nên phải xóa hình cũ nếu có
    if (req.user.avatar) {
      //win: \\
      //mac: //
      //nếu dùng path.join thì sẽ tự động chuyển đổi cho phù hợp với hệ điều hành
      //không dùng template string `public/img/${req.user.avatar}`;
      const oldFilePath = path.join("public/images", req.user.avatar);

      //kiểm tra nếu tồn tại file cũ thì xóa đi
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      cloudinary.uploader.destroy(req.user.avatar);
    }

    await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: req.file.filename,
      },
    });

    return `http://localhost:3069/images/${req.file.filename}`;
  },

  async avatarCloud(req) {
    if (!req.file) {
      throw new BadRequestError(`File is required`);
    }

    if (req.user.avatar) {
      //xóa ảnh cũ trên local
      const oldFilePath = path.join("public/images", req.user.avatar);

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      //xóa ảnh cũ trên local
      cloudinary.uploader.destroy(req.user.avatar);
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "node_55" }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(req.file.buffer);
    });

    await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: uploadResult.public_id,
      },
    });

    return uploadResult.secure_url;
  },
};
