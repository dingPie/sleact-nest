import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserType } from 'src/@common/types/user';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);
    if (can) {
      const request = context
        .switchToHttp()
        .getRequest<Request & { user: UserType }>();
      console.log(request.user);
    }
    return !!can;
  }
}
