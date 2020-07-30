import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerSchema } from './schemas/banner.schema';
import { AlicloudOssModule } from 'nestjs-alicloud-oss/dist';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Banner',
      schema: BannerSchema
    }]),

    AlicloudOssModule.withConfig({
      options: {
        accessKeyId: 'xx',
        accessKeySecret: 'xxx',
        region: 'oss-cn-shenzhen', // the bucket data region location, doc demo used 'oss-cn-beijing'.
        bucket: 'nestjs-demo', // the default bucket you want to access, doc demo used 'nest-alicloud-oss-demo'.
      },
    })
  ],
  controllers: [BannerController],
  providers: [BannerService],

})
export class BannerModule {}
