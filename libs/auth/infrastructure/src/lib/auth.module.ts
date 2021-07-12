import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AuthConfig,
  authConfigLoader,
  AUTH_CONFIG_KEY,
} from './config/auth.config';
import { USER_REPOSITORY_PROVIDER } from './repositories/user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { USER_SERVICE_PROVIDER } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfigLoader)],
      useFactory: (config: AuthConfig) => ({
        secret: config.secret,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [AUTH_CONFIG_KEY],
    }),
  ],
  providers: [USER_REPOSITORY_PROVIDER, USER_SERVICE_PROVIDER],
  exports: [USER_SERVICE_PROVIDER],
})
export class AuthModule {}
