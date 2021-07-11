import { ClassProvider, Inject, Injectable } from '@nestjs/common';
import {
  TodoEntity,
  TodoRepository,
  TodoService,
  TODO_REPOSITORY,
} from '@puppo/todos/domain';
import { CreateTodoDto } from '@puppo/todos/dto';
import { ApplicationException } from '@puppo/shared/kernel';
import * as TE from 'fp-ts/TaskEither';

@Injectable()
class TodoServiceImpl implements TodoService {
  constructor(
    @Inject(TODO_REPOSITORY) private readonly todoRepository: TodoRepository
  ) {}

  createTodo(
    todoDto: CreateTodoDto
  ): TE.TaskEither<ApplicationException, TodoEntity> {
    return this.todoRepository.save(todoDto);
  }
}

export const TODO_SERVICE_PROVIDER: ClassProvider = {
  provide: TodoService,
  useClass: TodoServiceImpl,
};
