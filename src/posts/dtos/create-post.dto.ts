import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: '帖子标题',
    example: '这是第一个帖子标题'
  })
  @IsNotEmpty({message: '请填写标题'})
  @IsString()
  title: string


  @ApiProperty({
    description: '帖子内容',
    example: '内容1'
  })
  @IsString()
  content: string
}