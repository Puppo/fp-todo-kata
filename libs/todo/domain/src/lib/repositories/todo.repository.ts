import { ApplicationException } from '@puppo/shared/kernel';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';

import { TodoEntity, TodoEntityId } from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract save(
    todoEntity: Omit<TodoEntity, 'id' | 'createdAt'>
  ): TE.TaskEither<ApplicationException, TodoEntity>;
  abstract getById(
    id: TodoEntityId
  ): TE.TaskEither<ApplicationException, O.Option<TodoEntity>>;
}
