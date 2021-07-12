import { TodoDto, TodoId } from '@puppo/todo/dto';
import { TodoEntity } from '../entity/todo.entity';

export const mapTodoEntityToDto = (entity: TodoEntity): TodoDto => ({
  id: entity.id as TodoId,
  name: entity.name,
  description: entity.description,
  dueDate: entity.dueDate,
  createdAt: entity.createdAt,
});
