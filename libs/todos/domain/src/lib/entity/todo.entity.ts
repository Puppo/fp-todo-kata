import { Eq, struct } from 'fp-ts/Eq';
import { Eq as eqString } from 'fp-ts/string';
import { Entity } from '@puppo/shared/kernel';

export type TodoEntityId = string;

export type TodoEntity = Entity<
  {
    name: string;
    description?: string;
    dueDate?: Date;
    createdAt: Date;
  },
  TodoEntityId
>;

export const createTodoEntity = (
  id: TodoEntityId,
  name: string,
  description: string,
  dueDate?: Date,
  createdAt?: Date
): TodoEntity =>
  Object.freeze({
    id,
    name,
    description,
    dueDate,
    createdAt,
  });

export const todoEntityEq: Eq<TodoEntity> = struct({
  id: eqString,
});
