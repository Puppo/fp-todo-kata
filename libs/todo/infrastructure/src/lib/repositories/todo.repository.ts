import { ClassProvider, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApplicationException,
  ApplicationExtendedException,
} from '@puppo/shared/kernel';
import { TodoEntity, TodoEntityId, TodoRepository } from '@puppo/todo/domain';
import { pipe, flow } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
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

  getById(
    id: TodoEntityId
  ): TE.TaskEither<ApplicationException, O.Option<TodoEntity>> {
    return pipe(
      TE.tryCatch(
        () => this.todoModel.findById(id).exec(),
        (error) =>
          new ApplicationExtendedException(
            `Problem on retrieve todo with id ${id} from mongo db collection`,
            error
          )
      ),
      TE.map(flow(O.fromNullable, O.map(todoMapper.schemaToEntity)))
    );
  }
}

export const TODO_REPOSITORY_PROVIDER: ClassProvider = {
  provide: TodoRepository,
  useClass: TodoMongoRepository,
};
