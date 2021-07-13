import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@puppo/auth/infrastructure';
import {
  ConfigurationModule,
  HttpMiddlewareModule,
  MongoModule,
} from '@puppo/shared/infrastructure';
import { environment } from '../environments/environment';
import { AuthHttpModule } from './auth/auth-http.module';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      envFolder: environment.envFolder,
    }),
    HttpMiddlewareModule,
    MongoModule,
    AuthHttpModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
