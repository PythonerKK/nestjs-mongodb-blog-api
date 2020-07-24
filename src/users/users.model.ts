import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: '用户名',
    example: 'kk'
  })
  @prop()
  username: string;

  @prop()
  @ApiProperty({
    description: '密码',
    example: '3fdfaf'
  })
  password: string;

  @prop()
  @ApiProperty({
    description: '姓名',
    example: '张三'
  })
  name: string;

  @prop()
  @ApiProperty({
    description: '盐'
  })
  salt: string;

  @prop()
  @ApiProperty({
    description: '权限, 1为普通用户，2为管理员'
  })
  role: number
}

