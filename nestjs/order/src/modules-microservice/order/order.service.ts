import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { EMAIL_SERVICE } from 'src/common/constants/rabbitmq.constant';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    @Inject(EMAIL_SERVICE) private client: ClientProxy,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    console.log({ createOrderDto });
    const orderNew = await this.prisma.orders.create({
      data: {
        userId: createOrderDto.userID,
        foodId: createOrderDto.foodID,
      },
      include: {
        Foods: true,
        Users: true,
      },
    });

    //đi gửi mail thông báo cho user về việc đặt hàng thành công
    //@emit sẽ không quan tâm tới kết quả trả về
    //nếu dùng emit thì sẽ dùng @eventpattern để nhận dữ liệu
    this.client.emit('createEmail', orderNew);

    return true;
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
