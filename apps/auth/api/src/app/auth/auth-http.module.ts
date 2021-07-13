import { Module } from '@nestjs/common';
import { AuthModule } from '@puppo/auth/infrastructure';
import { FpTsToNestModule } from '@puppo/shared/infrastructure';

import { AuthControllerV1 } from './controllers/v1/auth.controller';
import { UserControllerV1 } from './controllers/v1/user.controller';

@Module({
  imports: [AuthModule, FpTsToNestModule],
  controllers: [AuthControllerV1, UserControllerV1],
})
export class AuthHttpModule {}
