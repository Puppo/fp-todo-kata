import { ClassProvider, Injectable } from '@nestjs/common';
import {
  TodoEntity,
  TodoEntityId,
  TodoRepository,
  TodoService,
} from '@puppo/todo/domain';
import { CreateTodoDto } from '@puppo/todo/dto';
import { ApplicationException } from '@puppo/shared/kernel';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';

@Injectable()
class TodoServiceImpl implements TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  createTodo(
    todoDto: CreateTodoDto
  ): TE.TaskEither<ApplicationException, TodoEntity> {
    return this.todoRepository.save(todoDto);
  }

  getById(
    id: TodoEntityId
  ): TE.TaskEither<ApplicationException, O.Option<TodoEntity>> {
    return this.todoRepository.getById(id);
  }
}

export const TODO_SERVICE_PROVIDER: ClassProvider = {
  provide: TodoService,
  useClass: TodoServiceImpl,
};
