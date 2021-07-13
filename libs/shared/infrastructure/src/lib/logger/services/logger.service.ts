import { Injectable, Scope, Logger, ClassProvider } from '@nestjs/common';

@Injectable()
class LoggerService extends Logger {}

export const LOGGER_PROVIDER: ClassProvider = {
  provide: Logger,
  useClass: LoggerService,
  scope: Scope.TRANSIENT,
};
