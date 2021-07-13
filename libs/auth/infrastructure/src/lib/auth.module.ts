import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AuthConfig,
  authConfigLoader,
  AUTH_CONFIG_KEY,
} from './config/auth.config';
import { USER_REPOSITORY_PROVIDER } from './repositories/user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { USER_SERVICE_PROVIDER } from './services/user.service';
import { JwtStrategy } from './services/jwt-strategy.service';
import { FpTsToNestModule } from '@puppo/shared/infrastructure';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfigLoader)],
      useFactory: (config: AuthConfig) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.expiresIn },
      }),
      inject: [AUTH_CONFIG_KEY],
    }),
    ConfigModule.forFeature(authConfigLoader),
    FpTsToNestModule,
  ],
  providers: [USER_REPOSITORY_PROVIDER, USER_SERVICE_PROVIDER, JwtStrategy],
  exports: [USER_SERVICE_PROVIDER],
})
export class AuthModule {}
