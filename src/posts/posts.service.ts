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


  async list(query: any) {
    let conditions = {}
    if (query.title) {
      conditions['title'] = {$regex: new RegExp(query.title, 'i')}
    }
    if (query.content) {
      conditions['content'] = {$regex: new RegExp(query.content, 'i')}
    }
    return await this.PostModel.find(conditions)
  }

  async create(createPostDto: CreatePostDto) {
    return await this.PostModel.create(createPostDto)
  }

  async findById(id: string) {
    return await this.PostModel.findById(id)
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const oldPost = await this.PostModel.findById(id)
    if (oldPost.userId === updatePostDto['userId']) {
      // 更新的文章userid和目前登录的用户相同
      return await this.PostModel.findByIdAndUpdate(id, updatePostDto)
    } else {
      return {
        code: 500,
        msg: '用户id校验失败'
      }
    }

  }

  async deleteById(id: string, userId: string) {
    const post = await this.PostModel.findById(id)
    if (post.userId === userId) {
      return await this.PostModel.findByIdAndDelete(id)
    } else {
      return {
        code: 500,
        msg: '不能删除他人的文章'
      }
    }

  }

  async getMyPosts(userId: string) {
    return await this.PostModel.find({userId})
  }


}
