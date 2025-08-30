import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // 여기는 컨트롤러 이전 부분

    return (
      next
        .handle()
        //  컨트롤러 실행 이후는 여기 작성
        .pipe(map((data: unknown) => (data === undefined ? null : data)))
    );
  }
}
