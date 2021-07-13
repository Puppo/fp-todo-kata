import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { MapToResponseService } from './services/map-to-response.service';

@Module({
  imports: [LoggerModule],
  providers: [MapToResponseService],
  exports: [MapToResponseService],
})
export class FpTsToNestModule {}
