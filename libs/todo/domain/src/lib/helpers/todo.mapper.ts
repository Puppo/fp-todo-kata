import { TodoDto } from '@puppo/todo/dto';
import { TodoEntity } from '../entities/todo.entity';

export const mapTodoEntityToDto = (entity: TodoEntity): TodoDto => ({
  id: entity.id,
  name: entity.name,
  description: entity.description,
  dueDate: entity.dueDate,
  createdAt: entity.createdAt,
});
