import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './modules-microservice/email/email.module';
import { transporter } from './common/nodemailer/init.nodemailer';
@Module({
  imports: [EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async onModuleInit() {
    try {
      await transporter.verify();
      console.log('[EMAIL] Server is ready to take our messages');
    } catch (err) {
      console.error('[EMAIL] Verification failed:', err);
    }
  }
}
