import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.usersService.findByUsername(username)
    if (user) {
      // @ts-ignore
      const hashedPassword = user.password
      // @ts-ignore
      const salt = user.salt
      const hashPassword = encryptPassword(password, salt)
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user
        }
      } else {
        return {
          code: 2,
          user: null
        }
      }
    }

    return {
      code: 3,
      user: null
    }
  }

  // jwt验证
  async certificate(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      name: user.name
    }
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload)
      return {
        code: 200,
        data: {
          token
        },
        msg: '登录成功'
      }
    } catch (e) {
      return {
        code: 500,
        msg: '账号或密码错误'
      }
    }
  }




}
