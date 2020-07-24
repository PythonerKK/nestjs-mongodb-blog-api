import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostSchema) private readonly PostModel: ModelType<PostSchema>,
    private readonly redisService: RedisService
  ) {
  }


  async list() {
    return await this.PostModel.find()
  }

  async create(createPostDto: CreatePostDto) {
    await this.PostModel.create(createPostDto)
  }

  async findById(id: string) {
    return await this.PostModel.findById(id)
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.PostModel.findByIdAndUpdate(id, updatePostDto)
  }

  async deleteById(id: string, userId: string) {
    const post = await this.PostModel.findById(id)
    if (post.userId === userId) {
      await this.PostModel.findByIdAndDelete(id)
    } else {
      return {
        code: 500,
        msg: '不能删除他人的文章'
      }
    }

  }


}
