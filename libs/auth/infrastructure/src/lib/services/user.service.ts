import { ClassProvider, Injectable } from '@nestjs/common';
import {
  createUserEntity,
  UserEntity,
  UserEntityId,
  UserRepository,
  UserService,
  AuthToken,
  JwtPayload,
} from '@puppo/auth/domain';
import { AuthCredentialsDto, SignUpUserDto } from '@puppo/auth/dto';
import {
  ApplicationException,
  ApplicationExtendedException,
  UnauthorizedApplicationException,
} from '@puppo/shared/kernel';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { pipe, flow } from 'fp-ts/function';
import { generateSalt, hashPassword } from '../helpers/hash.helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class UserServiceImpl implements UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  signUp(user: SignUpUserDto): TE.TaskEither<ApplicationException, UserEntity> {
    return pipe(
      generateSalt(),
      TE.chain((salt) =>
        pipe(
          hashPassword(user.password, salt),
          TE.chain((hash) =>
            pipe(
              this.userRepository.createUser(
                createUserEntity(
                  '' as UserEntityId,
                  user.username,
                  salt,
                  hash,
                  user.firstName,
                  user.lastName,
                  new Date()
                )
              )
            )
          )
        )
      )
    );
  }

  signIn(
    credentials: AuthCredentialsDto
  ): TE.TaskEither<ApplicationException, UserEntity> {
    return pipe(
      this.userRepository.getByUsername(credentials.username),
      TE.chain(
        flow(
          O.fold(
            () =>
              TE.left(new UnauthorizedApplicationException('User not found')),
            (user) =>
              pipe(
                hashPassword(credentials.password, user.salt),
                TE.chain((hash) =>
                  hash === user.hashPassword
                    ? TE.right(user)
                    : TE.left(
                        new UnauthorizedApplicationException('Password invalid')
                      )
                )
              )
          )
        )
      )
    );
  }

  generateAuthToken(
    user: UserEntity
  ): TE.TaskEither<ApplicationException, AuthToken> {
    const payload: JwtPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    };
    return pipe(
      TE.tryCatch(
        () => this.jwtService.signAsync(payload),
        (err) =>
          new ApplicationExtendedException('Problem on generate JWT token', err)
      )
    );
  }

  getUserById(
    id: UserEntityId
  ): TE.TaskEither<ApplicationException, O.Option<UserEntity>> {
    return this.userRepository.getById(id);
  }
}

export const USER_SERVICE_PROVIDER: ClassProvider = {
  provide: UserService,
  useClass: UserServiceImpl,
};
