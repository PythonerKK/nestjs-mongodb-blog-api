import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner } from './schemas/banner.schema';
import { CreateBannerDto } from './dtos/createBannerDto';
import { SuccessResponse } from '../model/success.model';

@Injectable()
export class BannerService {
  constructor(@InjectModel('Banner') private readonly bannerModel: Model<Banner>) {
  }

  async findAll(): Promise<SuccessResponse> {
    const result = await this.bannerModel.find()
    return new SuccessResponse(result, null)
  }

  async create(createBannerDto: CreateBannerDto) {
    const createdBanner = new this.bannerModel(createBannerDto)
    const result = await createdBanner.save()
    return new SuccessResponse(result, null)
  }
}
