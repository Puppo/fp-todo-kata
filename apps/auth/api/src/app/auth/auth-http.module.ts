import { Module } from '@nestjs/common';
import { AuthModule } from '@puppo/auth/infrastructure';

import { AuthControllerV1 } from './controllers/v1/auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AuthControllerV1],
})
export class AuthHttpModule {}
