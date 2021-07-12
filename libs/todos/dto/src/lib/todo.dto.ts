import * as t from 'io-ts';
import * as types from 'io-ts-types';

const createTodoDtoCodec = t.intersection([
  t.type({
    name: t.string,
  }),
  t.partial({
    description: t.string,
    dueDate: types.DateFromISOString,
  }),
]);

export type CreateTodoDto = t.TypeOf<typeof createTodoDtoCodec>;

const todoId = t.string;
export type TodoId = t.TypeOf<typeof todoId>;

const todoDtoCodec = t.intersection([
  t.type({
    id: t.string,
    createdAt: types.DateFromISOString,
  }),
  createTodoDtoCodec,
]);

export type TodoDto = t.TypeOf<typeof todoDtoCodec>;
