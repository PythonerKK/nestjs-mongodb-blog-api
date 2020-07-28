import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: '帖子标题'
  })
  title: string
  @ApiProperty({
    description: '帖子内容'
  })
  content: string

  @ApiProperty({
    description: '用户id',
    example: ''
  })
  @IsEmpty()
  userId: string
}