import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User as UserSchema } from './users.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RegisterUserDto } from './dtos/register-user.dto';
import { encryptPassword, makeSalt } from '../utils/cryptogram';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserSchema) private readonly UserModel: ModelType<UserSchema>) {
  }

  async listUser(): Promise<any> {
    return await this.UserModel.find()
  }

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const { username, password, name } = registerUserDto
    const user_count = await this.UserModel.find({
      username
    }).count()

    if (user_count) {
      return {
        code: 400,
        msg: '用户已存在'
      }
    }
    const salt = makeSalt()
    registerUserDto.password = encryptPassword(password, salt)

    try {
      await this.UserModel.create(registerUserDto)
      return {
        code: 200,
        msg: '注册成功'
      }
    } catch (e) {
      return {
        code: 503,
        msg: '注册账号失败'
      }
    }
  }

}
