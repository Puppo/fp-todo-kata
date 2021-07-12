import { ClassProvider, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity, UserEntityId, UserRepository } from '@puppo/auth/domain';
import {
  ApplicationException,
  ApplicationExtendedException,
} from '@puppo/shared/kernel';
import { pipe, flow } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as userMapper from '../helpers/user.mapper';

@Injectable()
class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  createUser(
    user: UserEntity
  ): TE.TaskEither<ApplicationException, UserEntity> {
    const newUser = new this.userModel(user);
    return pipe(
      TE.tryCatch(
        () => newUser.save(),
        (err) =>
          new ApplicationExtendedException(
            'Problem on save new user to mongodb collection',
            err
          )
      ),
      TE.map(userMapper.schemaToEntity)
    );
  }

  getByUsername(
    username: string
  ): TE.TaskEither<ApplicationException, O.Option<UserEntity>> {
    return pipe(
      TE.tryCatch(
        () =>
          this.userModel
            .findOne({
              username,
            })
            .exec(),
        (err) =>
          new ApplicationExtendedException(
            `Problem on retrieve user by username from mongodb collection`,
            err
          )
      ),
      this.mapSchemaToEntity
    );
  }

  getById(
    id: UserEntityId
  ): TE.TaskEither<ApplicationException, O.Option<UserEntity>> {
    return pipe(
      TE.tryCatch(
        () => this.userModel.findById(id).exec(),
        (err) =>
          new ApplicationExtendedException(
            `Problem on retrieve user by id ${id} from mongodb collection`,
            err
          )
      ),
      this.mapSchemaToEntity
    );
  }

  private mapSchemaToEntity(
    query: TE.TaskEither<ApplicationException, UserDocument | undefined>
  ): TE.TaskEither<ApplicationException, O.Option<UserEntity>> {
    return pipe(
      query,
      TE.map(flow(O.fromNullable, O.map(userMapper.schemaToEntity)))
    );
  }
}

export const USER_REPOSITORY_PROVIDER: ClassProvider = {
  provide: UserRepository,
  useClass: UserRepositoryImpl,
};
