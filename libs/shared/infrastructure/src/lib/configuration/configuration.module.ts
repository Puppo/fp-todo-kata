import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  exports: [ConfigModule],
})
export class ConfigurationModule {
  static forRoot(config: { envFolder: string }): DynamicModule {
    return {
      module: ConfigurationModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: [
            path.join(config.envFolder, `.env.${process.env.NODE_ENV}.local`),
            path.join(config.envFolder, `.env.${process.env.NODE_ENV}`),
            path.join(config.envFolder, `.env`),
          ],
        }),
      ],
    };
  }
}
