import { Body, Controller, Get, Post } from '@nestjs/common';
import { BannerService } from './banner.service';
import { SuccessResponse } from '../model/success.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBannerDto } from './dtos/createBannerDto';
import { SearchBannerDto } from './dtos/searchBannerDto';

@ApiTags("轮播图")
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {
  }

  @ApiOperation({summary: '查看全部轮播图'})
  @Post('list')
  async findAll(@Body() searchBannerDto: SearchBannerDto): Promise<SuccessResponse> {
    return this.bannerService.findAll(searchBannerDto)
  }

  @ApiOperation({summary: '新增轮播图'})
  @Post('create')
  async create(@Body() createBannerDto: CreateBannerDto): Promise<SuccessResponse> {
    return this.bannerService.create(createBannerDto)
  }
}
