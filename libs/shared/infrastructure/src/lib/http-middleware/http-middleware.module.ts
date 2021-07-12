import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from './request-logger/request-logger.middleware';

@Module({})
export class HttpMiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
