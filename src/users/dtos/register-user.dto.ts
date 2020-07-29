import { IsEmpty, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {

  @IsNotEmpty({message: '请输入用户名'})
  @IsString()
  @ApiProperty({
    description: '用户名',
    example: 'kk'
  })
  @Length(6, 12)
  username: string


  @IsNotEmpty({message: '请输入密码'})
  @ApiProperty({
    description: '密码',
    example: 'sdf32dfc'
  })
  @IsString()
  @Length(6, 12)
  password: string


  @ApiProperty({
    description: '名称',
    example: '狗蛋'
  })
  @Length(1, 20)
  @IsString()
  name: string

  @IsEmpty()
  salt: string

  @IsEmpty()
  role: number

}