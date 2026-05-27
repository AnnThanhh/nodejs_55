import { BadRequestError } from "../common/helpers/exception.helper.js";
import { signAccessToken, signRefreshToken } from "../common/helpers/jwt.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
// crypto
import crypto from "crypto";

export const authService = {
  async login(req) {
    const { email, password } = req.body;
    console.log(email, password);
    //kiểm tra email xem có tồn tại không
    //nếu chưa tồn tại thì trả lỗi, kêu người dùng đăng ký
    //nếu đã tồn tại thì so sánh password
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      // throw new BadRequestError(`Account not valid, please try again`);
      throw new BadRequestError(`Người dùng không tồn tại, vui lòng đăng ký`);
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password); //true

    if (!isPasswordValid) {
      // throw new BadRequestError(`Account not valid, please try again.`);
      throw new BadRequestError(
        `Thông tin người dùng không đúng, vui lòng thử lại`,
      );
    }

    // tạo access token
    // B1: tạo payload chứa thông tin: userId, email
    const payload = {
      userId: existingUser.id,
      email: existingUser.email
    }
    // B2: tạo access token từ payload
    const accessToken = signAccessToken(payload)

    // tạo refresh token từ payload
    const refreshToken = signRefreshToken(payload)

    return {
      accessToken,
      refreshToken
    }
  },

  async register(req) {
    const { email, password, fullname } = req.body;
    console.log(email, password, fullname);

    //kiểm tra email đã tồn tại chưa, nếu đã tồn tại thì trả về lỗi, nếu chưa tồn tại thì tạo mới user
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    //hash: băm ví dụ 123456 -> OIUHOPSHFDUGDOFHUGDFG -> lksDHFSoidhfsdfohSF -> ... ->IUdghsfiuDGFI
    //bcrypt
    //brute force
    //KHÔNG THỂ DỊCH NGƯỢC
    //SO SÁNH
    const hashPassword = bcrypt.hashSync(password, 10);

    //encrupt: MÃ HÓA -> token
    // có thể dịch ngược để lấy dữ liệu

    if (existingUser) {
      throw new BadRequestError(`Người dùng đã tồn tại, vui lòng đăng nhập`);
    }

    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: hashPassword,
        fullName: fullname,
      },
    });

    return true;
  },

  async forgotPassword(req) {
    const {email} = req.body

    // B2: kiểm tra email có tồn tại không
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      }
    })

    if (!existingUser) {
      throw new BadRequestError("Email không tồn tại trong hệ thống")
    }

    // B3: tạo mã change password => crypto
    const changePassCode = crypto.randomBytes(20).toString("hex") // tạo ra 1 chuỗi ngẫu nhiên có độ dài 40 ký tự
  
    // B4: lưu mã change pass vào db
    await prisma.users.update({
      where: { email: email },
      data: { codeChangePass: changePassCode }
    })

    // B5-optional: gửi mã change pass về email

    return changePassCode
  }
};
