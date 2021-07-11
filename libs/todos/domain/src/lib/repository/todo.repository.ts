import { ApplicationException } from '@puppo/shared/kernel';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';

import { TodoEntity, TodoEntityId } from '../entity/todo.entity';

export abstract class TodoRepository {
  abstract save(
    todoEntity: Omit<TodoEntity, 'id' | 'createdAt'>
  ): TE.TaskEither<ApplicationException, TodoEntity>;
  abstract get(id: TodoEntityId): TO.TaskOption<TodoEntity>;
}

export const TODO_REPOSITORY = 'TodoRepository';
