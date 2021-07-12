import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TODO_REPOSITORY_PROVIDER } from './repositories/todo.repository';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TODO_SERVICE_PROVIDER } from './services/todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [TODO_REPOSITORY_PROVIDER, TODO_SERVICE_PROVIDER],
  exports: [TODO_SERVICE_PROVIDER],
})
export class TodoModule {}
