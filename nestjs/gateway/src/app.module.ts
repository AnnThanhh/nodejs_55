import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module-api/auth/auth.module.js';
import { PrismaModule } from './module-system/prisma/prisma.module.js';
import { TokenModule } from './module-system/token/token.module.js';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth.guard';
import { Role } from './common/decorators/role.decorator';
import { RoleGuard } from './common/guard/role.guard';
import { ArticleModule } from './module-api/article/article.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptors/response-success.interceptor';

@Module({
  imports: [AuthModule, PrismaModule, TokenModule, ArticleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      //provide: mang key để nestjs biết cái công việc cần phải xử lý
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSuccessInterceptor,
    },
  ],
})
export class AppModule {}
