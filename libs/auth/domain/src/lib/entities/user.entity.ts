import { ObjectId } from '@puppo/shared/infrastructure';
import { Entity } from '@puppo/shared/kernel';
import { Eq, struct } from 'fp-ts/Eq';
import { Eq as eqString } from 'fp-ts/string';

export type UserEntityId = ObjectId;

export type UserEntity = Entity<
  UserEntityId,
  {
    username: string;
    salt: string;
    hashPassword: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
  }
>;

export const createUserEntity = (
  id: UserEntityId,
  username: string,
  salt: string,
  hashPassword: string,
  firstName: string,
  lastName: string,
  createdAt: Date
): UserEntity =>
  Object.freeze({
    id,
    username,
    salt,
    hashPassword,
    firstName,
    lastName,
    createdAt,
  });

export const userEntityEq: Eq<UserEntity> = struct({
  id: eqString,
});
