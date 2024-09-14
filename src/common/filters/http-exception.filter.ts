import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ExceptionBody } from './exception-body';
import * as os from 'os';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '서버 내부에서 예기치 못한 오류가 발생하였습니다.';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    }

    const body: ExceptionBody = {
      statusCode: statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.loggerError(exception, context);

    response.status(statusCode).json(body);
  }

  loggerError(exception: Error, context: HttpArgumentsHost) {
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const [method, uri, ip, hostname, userAgent, referer]: string[] = [
      request.method,
      request.originalUrl,
      request.ip ?? request.get('X-Forwarded-For'),
      os.hostname(),
      request.get('user-agent') || '',
      request.get('referer') || '',
    ];

    const [
      statusCode,
      statusMessage,
      exceptionName,
      exceptionMessage,
    ]: string[] = [
      (exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
      ).toString(),
      response.statusMessage,
      exception.name,
      exception.message,
    ];

    this.logger.error(
      [
        method,
        uri,
        'ip:',
        ip,
        'hostname:',
        hostname,
        'user-agent:',
        userAgent,
        'referer:',
        referer,
      ].join(' '),
    );
    this.logger.error(
      [statusCode, statusMessage, exceptionMessage, `(${exceptionName})`].join(
        ' ',
      ),
    );

    if (!(exception instanceof HttpException)) {
      console.error(exception);
    }
  }
}
