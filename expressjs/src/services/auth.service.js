import { BadRequestError } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
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

    return true;
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
};
