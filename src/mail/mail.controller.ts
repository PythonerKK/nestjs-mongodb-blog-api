import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('mail')
@ApiTags("邮件发送")
export class MailController {
  constructor(private readonly mailService: MailService) {
  }

  @Get("send")
  @ApiOperation({summary: '发送邮件'})
  sendEmail() {
    this.mailService.send("705555262@qq.com", "测试邮件", "测试邮件")
  }
}
