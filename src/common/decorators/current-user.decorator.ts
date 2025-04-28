import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    // 如果是管理员，且提供了指定的 userId
    if (user.role === 'ADMIN' && request.query.userId) {
      return {
        ...user,
        userId: parseInt(request.query.userId)
      };
    }
    
    // 普通用户只能访问自己的数据
    if (!user.userId) {
      throw new UnauthorizedException('未找到用户信息');
    }
    
    return data ? user[data] : user;
  },
); 