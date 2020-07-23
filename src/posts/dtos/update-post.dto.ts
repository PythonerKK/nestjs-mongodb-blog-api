import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    description: '帖子标题'
  })
  title: string
  @ApiProperty({
    description: '帖子内容'
  })
  content: string
}