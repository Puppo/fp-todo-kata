import { Module } from '@nestjs/common';

import { TodoModule } from '@puppo/todos/infrastructure';

import { TodoController as TodoControllerV1 } from './controllers/v1/todo.controller';

@Module({
  imports: [TodoModule],
  controllers: [TodoControllerV1],
})
export class TodoHttpModule {}
