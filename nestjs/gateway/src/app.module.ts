import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module-api/auth/auth.module.js';
import { PrismaModule } from './module-system/prisma/prisma.module.js';
import { TokenModule } from './module-system/token/token.module.js';

@Module({
  imports: [AuthModule, PrismaModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
