import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.qq.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: '705555262@qq.com',
          pass: 'xxx'
        }
      },
      defaults: {
        from: '705555262@qq.com'
      }
    })
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule {}
