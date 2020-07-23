import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class Post {
  @ApiProperty({
    description: '标题',
    example: '标题1'
  })
  @prop()
  title: string;

  @prop()
  @ApiProperty({
    description: '内容',
    example: '内容1'
  })
  content: string;
}

