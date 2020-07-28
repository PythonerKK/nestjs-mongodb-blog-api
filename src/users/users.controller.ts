import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException, HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors, UsePipes,
} from '@nestjs/common';
import { User as UserSchema } from './users.model'
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RbacInterceptor } from '../interceptor/rbac.interceptor';
import { RoleConstants } from './constants/role.constants';
import { LoginRequired } from '../decorator/auth.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { doc } from 'prettier';
import path = require('path')
import multer = require('multer');


@Controller('users')
@ApiTags("用户模块")
export class UsersController {
  constructor(@InjectModel(UserSchema) private readonly UserModel: ModelType<UserSchema>,
              private readonly usersService: UsersService,
              private readonly authService: AuthService) {
  }

  @LoginRequired()
  @Get()
  @ApiOperation({summary: '用户列表'})
  @UseInterceptors(new RbacInterceptor(RoleConstants.ADMIN))
  async list() {
    return this.usersService.listUser()
  }

  @Post('register')
  @ApiOperation({
    summary: '注册账号'
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto)
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const authResult = await this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user)
      case 2:
        return {
          code: 500,
          msg: '用户名或密码错误'
        }
      default:
        return {
          code: 500,
          msg: '查无此人'
        }
    }
  }


  @LoginRequired()
  @Get(':username')
  @ApiOperation({
    summary: '获取用户信息'
  })
  async getByUsername(@Param("username") username: string) {
    return this.usersService.findByUsername(username)
  }

  @LoginRequired()
  @Put(':username')
  @ApiOperation({
    summary: '更新用户信息'
  })
  async updateByUsername(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateByUsername(username, updateUserDto)

  }
  
  @Post("upload")
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join('/Users/kk/nodeJs/nest/nest-blog-api/upload'))
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  async uploadSingle(@UploadedFile() file, @Body() data) {
    if (!data.name) {
      throw new BadRequestException("请求参数错误")
    }
    return file
  }
  
  @Post('mul-upload')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({
    summary: '上传多个文件接口'
  })
  async uploadFile(@UploadedFiles() files, @Body() data) {
    if (!data.name || files.length === 0) {
      throw new HttpException("请求参数错误", HttpStatus.BAD_REQUEST)
    }
    for (const file of files) {
      // @ts-ignore
      const writeImage = createWriteStream(path.join('/Users/kk/nodeJs/nest/nest-blog-api/upload', `${data.name}-${Date.now()}-${file.originalname}`))
      writeImage.write(file.buffer)
    }
  }



}
