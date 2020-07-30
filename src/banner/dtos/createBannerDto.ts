import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({
    description: '轮播图名称',
    example: '第一张轮播图'
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: '图片地址'
  })
  @IsEmpty()
  image: any

  @ApiProperty({
    description: '链接地址',
    example: 'http://xxxxx'
  })
  @IsNotEmpty()
  @IsUrl()
  link: string

  @ApiProperty({
    description: '标签',
    example: "生活,美丽"
  })
  @IsString()
  tags: any
}