import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/module-system/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { TokenService } from 'src/module-system/token/token.service';
import { LoginDTO } from './DTO/login.dto';

@Injectable() // đánh dấu là một provider
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async login(body: LoginDTO) {
    console.log({ body });
    const { email, password } = body;
    // console.log(email, password);
    //kiểm tra email xem có tồn tại không
    //nếu chưa tồn tại thì trả lỗi, kêu người dùng đăng ký
    //nếu đã tồn tại thì so sánh password
    const existingUser = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
      omit: {
        password: false,
      },
    });

    if (!existingUser) {
      // throw new BadRequestError(`Account not valid, please try again`);
      throw new BadRequestException(
        `Người dùng không tồn tại, vui lòng đăng ký`,
      );
    }

    if (!existingUser.password) {
      throw new BadRequestException(
        `Vui lòng nhập đầy đủ thông tin hoặc vui lòng đăng ký lại`,
      );
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password); //true

    if (!isPasswordValid) {
      // throw new BadRequestException(`Account not valid, please try again.`);
      throw new BadRequestException(
        `Thông tin người dùng không đúng, vui lòng thử lại`,
      );
    }

    // tạo access token và refresh token
    // tạo access token
    const accessToken = this.tokenService.createAccessToken(existingUser.id);

    // tạo refresh token
    const refreshToken = this.tokenService.createRefreshToken(existingUser.id);

    return {
      accessToken,
      refreshToken,
    };
  }
}
