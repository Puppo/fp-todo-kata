import { TodoEntity } from '@puppo/todo/domain';
import { TodoDocument } from '../schemas/todo.schema';

export const schemaToEntity = (entity: TodoDocument): TodoEntity =>
  Object.freeze({
    id: entity._id,
    name: entity.name,
    description: entity.description,
    dueDate: entity.dueDate,
    createdAt: entity.createdAt,
  });
