import { TodoDto } from '@puppo/todos/dto';
import { TodoEntity } from '../entity/todo.entity';

export const mapTodoEntityToDto = (entity: TodoEntity): TodoDto => ({
  id: entity.id,
  name: entity.name,
  description: entity.description,
  dueDate: entity.dueDate,
  createdAt: entity.createdAt,
});
