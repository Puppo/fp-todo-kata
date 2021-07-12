import * as t from 'io-ts';
import * as types from 'io-ts-types';

export const createTodoDtoCodec = t.intersection([
  t.type({
    name: t.string,
  }),
  t.partial({
    description: t.string,
    dueDate: types.DateFromISOString,
  }),
]);

export type CreateTodoDto = t.TypeOf<typeof createTodoDtoCodec>;

export const todoIdCodec = types.UUID;
export type TodoId = t.TypeOf<typeof todoIdCodec>;

export const todoDtoCodec = t.intersection([
  t.type({
    id: todoIdCodec,
    createdAt: types.DateFromISOString,
  }),
  createTodoDtoCodec,
]);

export type TodoDto = t.TypeOf<typeof todoDtoCodec>;
