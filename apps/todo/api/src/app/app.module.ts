import { Module } from '@nestjs/common';

import { ConfigurationModule, MongoModule } from '@puppo/shared/infrastructure';
import { environment } from '../environments/environment';

import { TodoHttpModule } from './todo/todo-http.module';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      envFolder: environment.envFolder,
    }),
    MongoModule,
    TodoHttpModule,
  ],
})
export class AppModule {}
