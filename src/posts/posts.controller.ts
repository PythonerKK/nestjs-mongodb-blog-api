import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import {Post as PostSchema} from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';
import { CurrentUser } from '../decorator/user.decorator';
import { LoginRequired } from '../decorator/auth.decorator';
import { SuccessResponse } from '../model/success.model';
import { ErrorResponse } from '../model/error.model';


@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(
    @InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>,
    private readonly postsService: PostsService) {
  }

  @Get()
  @ApiOperation({
    summary: '查看博客列表'
  })
  async index(@Query() query) {
    if (!query.pageSize) {
      query.pageSize = 1
    }
    if (!query.current) {
      query.current = 1
    }
    const result =  await this.postsService.list(query);
    return new SuccessResponse(result, "ok")
  }

  @LoginRequired()
  @Post()
  @ApiOperation({
    summary: '创建帖子'
  })
  async create(@Body() createPostDto: CreatePostDto, @CurrentUser() currentUser) {
    // @ts-ignore
    createPostDto.userId = currentUser.userId
    const result = await this.postsService.create(createPostDto)
    return new SuccessResponse(result, '创建成功')
  }

  @Get(":id")
  @ApiOperation({
    summary: '详情'
  })
  async detail(@Param('id') id: string) {
    const result = await this.postsService.findById(id)
    return new SuccessResponse(result, 'ok')
  }

  @LoginRequired()
  @Put(':id')
  @ApiOperation({
    summary: '编辑帖子'
  })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @CurrentUser() currentUser) {
    updatePostDto.userId = currentUser.userId
    const result = await this.postsService.update(id, updatePostDto)
    if (result['code'] === 500) {
      return new ErrorResponse(null, result['msg'])
    }
    return new SuccessResponse(result, '更新成功')
  }

  @LoginRequired()
  @Delete(':id')
  @ApiOperation({
    summary: "删除"
  })
  async remove(@Param('id') id: string, @CurrentUser() user) {
    // @ts-ignore
    const result = await this.postsService.deleteById(id, user.userId)
    if (result['code'] === 500) {
      return new ErrorResponse(null, result['msg'])
    }
    return new SuccessResponse(result, '删除成功')
  }

  @LoginRequired()
  @Post("my-posts")
  @ApiOperation({summary: '获取登录用户的所有文章'})
  async getMyPosts(@CurrentUser() currentUser) {
    // @ts-ignore
    return this.postsService.getMyPosts(currentUser.userId);
  }


}
