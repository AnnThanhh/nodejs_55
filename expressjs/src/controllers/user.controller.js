import { responseSuccess } from "../common/helpers/response.helper.js";
import { userService } from "../services/user.service.js";

export const userController = {
  async avatarLocal(req, res, next) {
    const result = await userService.avatarLocal(req);
    const response = responseSuccess(result, `Upload avatar locally successfully`);
    res.status(response.statusCode).json(response);
  },

  async avatarCloud(req, res, next) {
    const result = await userService.avatarCloud(req);
    const response = responseSuccess(result, `Upload avatar to cloud successfully`);
    res.status(response.statusCode).json(response);
  },

};
