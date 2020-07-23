import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {

  @IsNotEmpty({message: '请输入用户名'})
  @IsString()
  @ApiProperty({
    description: '用户名',
    example: 'kk'
  })
  username: string


  @IsNotEmpty({message: '请输入密码'})
  @ApiProperty({
    description: '密码',
    example: 'sdf32dfc'
  })
  @IsString()
  password: string


}