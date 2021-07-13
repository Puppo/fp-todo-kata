import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RequestLoggerMiddleware } from './request-logger/request-logger.middleware';

@Module({
  imports: [LoggerModule],
})
export class HttpMiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
