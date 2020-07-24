import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import {Post as PostSchema} from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/users.model';
import { CurrentUser } from '../decorator/user.decorator';



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

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: '创建帖子'
  })
  async create(@Body() createPostDto: CreatePostDto, @CurrentUser() currentUser) {
    // @ts-ignore
    createPostDto.userId = currentUser.userId
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

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: "删除"
  })
  async remove(@Param('id') id: string, @CurrentUser() user) {
    // @ts-ignore
    await this.postsService.deleteById(id, user.userId)
    return {
      success: true
    }
  }


}
