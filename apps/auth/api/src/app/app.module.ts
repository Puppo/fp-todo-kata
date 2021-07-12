import { Module } from '@nestjs/common';
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
})
export class AppModule {}
