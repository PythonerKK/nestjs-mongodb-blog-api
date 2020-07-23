import { Body, Controller, Get, Post } from '@nestjs/common';
import { User as UserSchema } from './users.model'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/register-user.dto';


@Controller('users')
@ApiTags("用户模块")
export class UsersController {
  constructor(@InjectModel(UserSchema) private readonly UserModel: ModelType<UserSchema>,
              private readonly usersService: UsersService) {
  }

  @Get()
  @ApiOperation({
    summary: '用户列表'
  })
  async list() {
    return this.usersService.listUser()
  }

  @Post()
  @ApiOperation({
    summary: '注册账号'
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto)
  }


}
