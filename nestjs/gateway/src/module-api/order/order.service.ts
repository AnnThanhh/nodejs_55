import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Users } from 'src/module-system/prisma/generated/prisma/client';

@Injectable()
export class OrderService {
  create(createOrderDto: CreateOrderDto, user: Users) {
    const data = {
      userID: user.id,
      foodID: createOrderDto.foodID,
    };
    console.log({ user, createOrderDto });
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
