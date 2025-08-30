import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenType } from '../types/token';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx
      .switchToHttp()
      // P_TODO: 구체적이 저장방식은 추후 확정 예정 (passport)
      .getResponse<Response & { locals: { jwt: TokenType } }>();

    return response.locals.jwt;
  },
);

export const AccessToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { headers: { authorization: string } }>();
    const authHeader = request?.headers?.authorization;

    // P_TODO: 검증 및 디코더 넣을지?

    const token = authHeader?.replace('Bearer ', '');
    return token;
  },
);
