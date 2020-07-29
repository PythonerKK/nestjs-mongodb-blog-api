import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsObject, IsOptional, IsUrl } from 'class-validator';

export class SearchBannerDto {
  @ApiProperty({
    description: '当前页码',
    example: 1
  })
  @IsOptional()
  current: number

  @ApiProperty({
    description: '一页数据量',
    example: 2
  })
  @IsOptional()
  pageSize: number

  @ApiProperty({
    description: '查询条件',
    example: {
      name: '轮播图',
      tag: ['生活']
    }
  })
  @IsOptional()
  conditions: object
}