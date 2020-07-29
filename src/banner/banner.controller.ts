import { Body, Controller, Get, Post } from '@nestjs/common';
import { BannerService } from './banner.service';
import { SuccessResponse } from '../model/success.model';
import { Banner } from './schemas/banner.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBannerDto } from './dtos/createBannerDto';

@ApiTags("轮播图")
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {
  }


  @ApiOperation({summary: '查看全部轮播图'})
  @Get()
  async findAll(): Promise<SuccessResponse> {
    return this.bannerService.findAll()
  }

  @ApiOperation({summary: '新增轮播图'})
  @Post()
  async create(@Body() createBannerDto: CreateBannerDto): Promise<SuccessResponse> {
    return this.bannerService.create(createBannerDto)
  }
}
