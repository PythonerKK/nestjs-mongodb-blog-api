import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BannerService } from './banner.service';
import { SuccessResponse } from '../model/success.model';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBannerDto } from './dtos/createBannerDto';
import { SearchBannerDto } from './dtos/searchBannerDto';
import { AlicloudOssFileInterceptor, UploadedFileMetadata } from 'nestjs-alicloud-oss/dist';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';

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

  @Post('create')
  @ApiOperation({summary: '新增轮播图'})
  @UseInterceptors(
    AlicloudOssFileInterceptor('file', null, {
      folder: 'banner', bucket: 'nestjs-demo'
    })
  )
  @ApiOperation({summary: '上传图片到阿里云oss'})
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({name: 'file', required: true, description: '图片'})
  async create(@Body() createBannerDto: CreateBannerDto,
               @UploadedFile() file: UploadedFileMetadata): Promise<SuccessResponse> {
    // @ts-ignore
    createBannerDto.image = file.objectUrl
    return this.bannerService.create(createBannerDto)
  }

}
