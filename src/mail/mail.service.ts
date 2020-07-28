import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  public send(to: string, subject: string) {
    this.mailerService
      .sendMail({
        to, // list of receivers
        from: '705555262@qq.com',
        subject: subject,
        text: '测试nestjs'
      })
      .then(async () => {
        // 写入数据库中
      })
      .catch(err => {
        console.error(err)
      })
  }
}
