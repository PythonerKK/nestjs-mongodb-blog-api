import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Banner extends Document {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  image: string;

  @Prop({required: true})
  link: string;

  @Prop([String])
  tags: string[];
}

export const BannerSchema = SchemaFactory.createForClass(Banner)