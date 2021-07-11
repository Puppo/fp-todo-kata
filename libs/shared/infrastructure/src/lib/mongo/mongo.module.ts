import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  mongoConfigLoader,
  MongoConnection,
  MONGO_CONFIG_KEY,
} from './config/mongo.types';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongoConfigLoader)],
      useFactory: (config: MongoConnection) => ({
        connectionName: config.name,
        uri: config.connection,
        user: config.user,
        pass: config.password,
      }),
      inject: [MONGO_CONFIG_KEY],
    }),
  ],
})
export class MongoModule {}
