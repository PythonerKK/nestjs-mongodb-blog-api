import { Controller, Get } from '@nestjs/common';
import { User as UserSchema } from './users.model'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';


@Controller('users')
@ApiTags("用户模块")
export class UsersController {
  constructor(@InjectModel(UserSchema) private readonly UserModel: ModelType<UserSchema>) {
  }

  @Get()
  @ApiOperation({
    summary: '用户列表'
  })
  async list() {
    return await this.UserModel.find()
  }

}
