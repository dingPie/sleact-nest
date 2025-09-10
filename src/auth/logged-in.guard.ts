import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserType } from 'src/@common/types/user';
import { Request } from 'express';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: UserType }>();

    return !!request.isAuthenticated();
  }
}
