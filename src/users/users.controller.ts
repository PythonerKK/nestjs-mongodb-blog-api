import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User as UserSchema } from './users.model'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dtos/login-user.dto';


@Controller('users')
@ApiTags("用户模块")
export class UsersController {
  constructor(@InjectModel(UserSchema) private readonly UserModel: ModelType<UserSchema>,
              private readonly usersService: UsersService,
              private readonly authService: AuthService) {
  }

  @Get()
  @ApiOperation({
    summary: '用户列表'
  })
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

  @Get(':username')
  @ApiOperation({
    summary: '获取用户信息'
  })
  async getByUsername(@Param("username") username: string) {
    return this.usersService.findByUsername(username)
  }


}
