import { IsEmail, IsNotEmpty } from 'class-validator';

// DTO (Data Transfer Object) để định nghĩa cấu trúc dữ liệu của request body
export class LoginDTO {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail(undefined, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string;
}
