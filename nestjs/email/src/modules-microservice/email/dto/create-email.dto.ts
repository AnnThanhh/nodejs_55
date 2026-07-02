export class CreateEmailDto {
  id: number;
  userId: number;
  foodId: number;
  deletedBy: number;
  isDeleted: boolean;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  Foods: Foods;
  Users: Users;
}

export class Foods {
  id: number;
  name: string;
  description: string;
  deletedBy: number;
  isDeleted: boolean;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
}

export class Users {
  id: number;
  email: string;
  fullName: string;
  avatar: string;
  age: any;
  totpSecret: string;
  googleId: any;
  deletedBy: number;
  isDeleted: boolean;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  password: string;
  codeChangePass: any;
}
