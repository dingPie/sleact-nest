import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserType } from '../types/user';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Request 객체에서 사용자 정보만 사용을 명시
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: UserType }>();

    return request.user;
  },
);
