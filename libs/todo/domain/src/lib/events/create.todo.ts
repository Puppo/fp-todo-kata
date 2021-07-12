import { DomainEvent } from '@puppo/shared/kernel';
import { TodoEntity } from '../entity/todo.entity';

const CREATE_TODO_EVENT_NAME = 'CREATE_TODO';
type CreateTodoEventPayload = Omit<TodoEntity, 'id' | 'createAt'>;

export type CreateTodoEvent = DomainEvent<
  typeof CREATE_TODO_EVENT_NAME,
  CreateTodoEventPayload
>;

export const createTodoEvent = (
  payload: CreateTodoEventPayload
): CreateTodoEvent =>
  Object.freeze({
    type: CREATE_TODO_EVENT_NAME,
    payload,
  });
