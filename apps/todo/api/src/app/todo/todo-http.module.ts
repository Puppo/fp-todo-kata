import { Module } from '@nestjs/common';
import { FpTsToNestModule } from '@puppo/shared/infrastructure';

import { TodoModule } from '@puppo/todo/infrastructure';

import { TodoController as TodoControllerV1 } from './controllers/v1/todo.controller';

@Module({
  imports: [TodoModule, FpTsToNestModule],
  controllers: [TodoControllerV1],
})
export class TodoHttpModule {}
