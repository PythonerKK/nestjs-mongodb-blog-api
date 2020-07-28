import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    let query = request.query
    let result = {}
    if (!query.pageSize) {
      result['pageSize'] = 1
    } else {
      result['pageSize'] = Number.parseInt(query.pageSize)
    }
    if (!query.current) {
      result['current'] = 1
    } else {
      result['current'] = Number.parseInt(query.current)
    }
    return result
  }
)