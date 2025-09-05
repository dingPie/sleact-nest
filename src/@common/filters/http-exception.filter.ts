import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    const error = exception.getResponse() as
      | string
      | { error: string; message: string[]; statusCode: number }; // 이게 class-validator 에러 타입

    // 여긴 class-validator 에러 처리
    if (typeof error !== 'string' && error.error === 'Bad Request') {
      response.status(status).json({
        statusCode: status,
        path: request.url,
        message: error.message,
      });
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message,
    });
  }
}
