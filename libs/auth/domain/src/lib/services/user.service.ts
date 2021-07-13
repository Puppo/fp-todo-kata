import { AuthCredentialsDto, SignUpUserDto } from '@puppo/auth/dto';
import { ApplicationException } from '@puppo/shared/kernel';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { UserEntity } from '../entities/user.entity';
import { AuthToken } from '../entities/auth.entity';

export abstract class UserService {
  abstract signUp(
    user: SignUpUserDto
  ): TE.TaskEither<ApplicationException, UserEntity>;

  abstract signIn(
    credentials: AuthCredentialsDto
  ): TE.TaskEither<ApplicationException, UserEntity>;

  abstract generateAuthToken(
    user: UserEntity
  ): TE.TaskEither<ApplicationException, AuthToken>;
}
