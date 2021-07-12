import { ApplicationException } from '@puppo/shared/kernel';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { UserEntity, UserEntityId } from '../entities/user.entity';

export abstract class UserRepository {
  abstract createUser(
    user: UserEntity
  ): TE.TaskEither<ApplicationException, UserEntity>;

  abstract getByUsername(
    username: string
  ): TE.TaskEither<ApplicationException, O.Option<UserEntity>>;

  abstract getById(
    id: UserEntityId
  ): TE.TaskEither<ApplicationException, O.Option<UserEntity>>;
}
