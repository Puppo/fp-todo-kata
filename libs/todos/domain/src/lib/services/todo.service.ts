import { ApplicationException } from '@puppo/shared/kernel';
import { CreateTodoDto } from '@puppo/todos/dto';
import * as TE from 'fp-ts/TaskEither';

import { TodoEntity } from '../entity/todo.entity';

export abstract class TodoService {
  abstract createTodo(
    todoDto: CreateTodoDto
  ): TE.TaskEither<ApplicationException, TodoEntity>;
}

export const TODO_SERVICE = 'TodoService';
