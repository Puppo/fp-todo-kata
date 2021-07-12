import * as t from 'io-ts';
import * as types from 'io-ts-types';
import { objectId } from '@puppo/shared/infrastructure';

export const signUpUserDtoCodec = t.type({
  firstName: t.string,
  lastName: t.string,
  username: t.string,
  password: t.string,
});

export type SignUpUserDto = t.TypeOf<typeof signUpUserDtoCodec>;

const userIdDtoCodec = objectId;
export type UserIdDto = t.TypeOf<typeof userIdDtoCodec>;

export const userDtoCodec = t.type({
  id: userIdDtoCodec,
  firstName: t.string,
  lastName: t.string,
  createdAt: types.DateFromISOString,
});

export type UserDto = t.TypeOf<typeof userDtoCodec>;
