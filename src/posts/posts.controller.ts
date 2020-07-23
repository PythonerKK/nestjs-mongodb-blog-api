import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {IsNotEmpty} from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import {Post as PostSchema} from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';

class CreatePostDto {
  @ApiProperty({
    description: '帖子标题',
    example: '这是第一个帖子标题'
  })
  @IsNotEmpty({message: '请填写标题'})
  title: string
  @ApiProperty({
    description: '帖子内容',
    example: '内容1'
  })
  content: string
}

class UpdatePostDto {
  @ApiProperty({
    description: '帖子标题'
  })
  title: string
  @ApiProperty({
    description: '帖子内容'
  })
  content: string
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(@InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>) {
  }

  @Get()
  @ApiOperation({
    summary: '显示博客列表'
  })
  async index() {
    return await this.postModel.find();
  }

  @Post()
  @ApiOperation({
    summary: '创建帖子'
  })
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postModel.create(createPostDto)
    return {
      success: true
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: '详情'
  })
  async detail(@Param('id') id: string) {
    return await this.postModel.findById(id)
  }

  @Put(':id')
  @ApiOperation({
    summary: '编辑帖子'
  })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    await this.postModel.findByIdAndUpdate(id, updatePostDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: "删除"
  })
  async remove(@Param('id') id: string) {
    await this.postModel.findByIdAndDelete(id)
    return {
      success: true
    }
  }


}
