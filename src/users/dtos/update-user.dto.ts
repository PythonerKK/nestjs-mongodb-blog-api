import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: '姓名',
    example: '王三'
  })
  @IsNotEmpty({message: '请输入姓名'})
  @IsString()
  readonly name: string;
}