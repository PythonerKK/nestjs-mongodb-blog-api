import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner } from './schemas/banner.schema';
import { CreateBannerDto } from './dtos/createBannerDto';
import { SuccessResponse } from '../model/success.model';
import { SearchBannerDto } from './dtos/searchBannerDto';

@Injectable()
export class BannerService {
  constructor(@InjectModel('Banner') private readonly bannerModel: Model<Banner>) {
  }

  async findAll(searchBannerDto: SearchBannerDto): Promise<SuccessResponse> {
    const { current, pageSize, conditions } = searchBannerDto
    let newConditions = {}
    if (conditions) {
      // 构造条件对象，转换为模糊匹配
      for (let [key, value] of Object.entries(conditions)) {
        if (key !== 'tag') {
          newConditions[key] = {
            $regex: new RegExp(value, 'i')
          }
        }
      }
      if (conditions['tag']) {
        newConditions['tags'] = {
          $in: conditions['tag']
        }
      }
    }

    const result = await this.bannerModel
      .find(newConditions)
      .limit(pageSize)
      .skip((current - 1) * pageSize)

    return new SuccessResponse(result, null)
  }

  async create(createBannerDto: CreateBannerDto) {
    const createdBanner = new this.bannerModel(createBannerDto)
    const result = await createdBanner.save()
    return new SuccessResponse(result, null)
  }
}
