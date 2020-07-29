import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dtos/send-email.dto';
import { SuccessResponse } from '../model/success.model';

@Controller('mail')
@ApiTags("邮件发送")
export class MailController {
  constructor(private readonly mailService: MailService) {
  }

  @Post("send")
  @ApiOperation({summary: '发送邮件'})
  sendEmail(@Body() sendEmailDto: SendEmailDto) {
    this.mailService.send(sendEmailDto.email, sendEmailDto.title, sendEmailDto.content)
    return new SuccessResponse(null, '发送成功')
  }
}
