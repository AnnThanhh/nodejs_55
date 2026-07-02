import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RABBITMQ_URL } from './common/constants/app.constant';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL!],
      queue: 'email_queue',
      queueOptions: {
        durable: true,
      },
      socketOptions: {
        connectionOptions: {
          clientProperties: {
            connection_name: 'email-on',
          },
        },
      },
    },
  });
  await app.listen();
}
bootstrap();
