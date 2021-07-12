import { ApplicationException } from '@puppo/shared/kernel';
import { CreateTodoDto } from '@puppo/todos/dto';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';

import { TodoEntity, TodoEntityId } from '../entity/todo.entity';

export abstract class TodoService {
  abstract createTodo(
    todoDto: CreateTodoDto
  ): TE.TaskEither<ApplicationException, TodoEntity>;

  abstract getById(
    id: TodoEntityId
  ): TE.TaskEither<ApplicationException, O.Option<TodoEntity>>;
}

export const TODO_SERVICE = 'TodoService';
