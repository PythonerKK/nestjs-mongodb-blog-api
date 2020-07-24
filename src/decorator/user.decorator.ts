import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 获取request.user中的属性
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user
    return data ? user && user[data] : user
  }
)
