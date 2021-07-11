import { ClassProvider, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApplicationException,
  ApplicationExtendedException,
} from '@puppo/shared/kernel';
import { TodoEntity, TodoEntityId, TodoRepository } from '@puppo/todos/domain';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { Model } from 'mongoose';

import * as todoMapper from '../helpers/todo.mapper';
import { Todo, TodoDocument } from '../schemas/todo.schema';

@Injectable()
class TodoMongoRepository implements TodoRepository {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>
  ) {}

  save(
    todoEntity: Omit<TodoEntity, 'id' | 'createdAt'>
  ): TE.TaskEither<ApplicationException, TodoEntity> {
    const createdTodo = new this.todoModel(todoEntity);
    return pipe(
      TE.tryCatch(
        () => createdTodo.save(),
        (error) =>
          new ApplicationExtendedException(
            `Problem on save todo to mongo db collection`,
            error
          )
      ),
      TE.map(todoMapper.schemaToEntity)
    );
  }

  get(id: TodoEntityId): TO.TaskOption<TodoEntity> {
    return pipe(
      TO.tryCatch(() =>
        this.todoModel
          .findOne({
            id,
          })
          .exec()
      ),
      TO.map(todoMapper.schemaToEntity)
    );
  }
}

export const TODO_REPOSITORY_PROVIDER: ClassProvider = {
  provide: TodoRepository,
  useClass: TodoMongoRepository,
};
