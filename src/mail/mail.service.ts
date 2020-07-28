import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService,
              private configService: ConfigService) {
  }

  public send(to: string, subject: string, text: string) {
    const DEFAULT_FROM = this.configService.get<string>('DEFAULT_FROM')
    this.mailerService
      .sendMail({
        to, // list of receivers
        from: DEFAULT_FROM,
        subject,
        text
      })
      .then(async () => {
        // 写入数据库中
      })
      .catch(err => {
        console.error(err)
      })
  }
}
