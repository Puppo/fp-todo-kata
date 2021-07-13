import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {
    this.logger.setContext(this.constructor.name);
  }

  use(req: Request, res: Response, next: () => void): void {
    const startTimeStamp = Date.now();
    res.on('finish', () => {
      const time = Date.now() - startTimeStamp;
      const logMessage = `[${req.method}] ${res.statusCode} ${res.statusMessage} - ${req.url} : time ${time}ms`;
      if (res.statusCode >= 400 && res.statusCode < 500)
        this.logger.warn(logMessage);
      else this.logger.log(logMessage);
    });
    next();
  }
}
