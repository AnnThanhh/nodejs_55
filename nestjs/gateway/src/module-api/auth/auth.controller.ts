import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDTO } from './DTO/login.dto.js';
import type { Response } from 'express';

@Controller('auth') //định nghĩa route gốc cho controller này là /auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // định nghĩa route và phương thức cho method
  async login(
    @Body()
    body: LoginDTO,

    //passthrought: true để cho phép trả về response bình thường, không bị can thiệp xử lý dữ liệu bởi NestJS
    @Res({ passthrough: true })
    res: Response,
  ) {
    const result = await this.authService.login(body);

    res.cookie('accessToken', result.accessToken);
    res.cookie('refreshToken', result.refreshToken);

    return true;
    // return result;
  }
}
