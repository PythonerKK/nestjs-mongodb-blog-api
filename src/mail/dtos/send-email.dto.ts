import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    description: '邮箱地址',
    example: '705555262@qq.com'
  })
  @IsNotEmpty({message: '请填写邮箱地址'})
  @IsEmail()
  email: string


  @ApiProperty({
    description: '邮件标题',
    example: 'nestjs测试邮件'
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: '内容',
    example: '这是测试内容'
  })
  @IsString()
  @IsNotEmpty()
  content: string
}