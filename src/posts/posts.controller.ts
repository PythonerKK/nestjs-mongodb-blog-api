import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import {Post as PostSchema} from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';



@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(@InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>,
              private readonly postsService: PostsService) {
  }

  @Get()
  @ApiOperation({
    summary: '显示博客列表'
  })
  async index() {
    return await this.postsService.list();
  }

  @Post()
  @ApiOperation({
    summary: '创建帖子'
  })
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postsService.create(createPostDto)
    return {
      success: true
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: '详情'
  })
  async detail(@Param('id') id: string) {
    return this.postsService.findById(id)
  }

  @Put(':id')
  @ApiOperation({
    summary: '编辑帖子'
  })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    await this.postsService.update(id, updatePostDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: "删除"
  })
  async remove(@Param('id') id: string) {
    await this.postsService.deleteById(id)
    return {
      success: true
    }
  }


}
