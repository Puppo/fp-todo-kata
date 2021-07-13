import { Module } from '@nestjs/common';
import { LOGGER_PROVIDER } from './services/logger.service';

@Module({
  providers: [LOGGER_PROVIDER],
  exports: [LOGGER_PROVIDER],
})
export class LoggerModule {}
