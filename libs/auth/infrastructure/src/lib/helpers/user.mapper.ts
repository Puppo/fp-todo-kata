import { UserEntity } from '@puppo/auth/domain';
import { UserDocument } from '../schemas/user.schema';

export const schemaToEntity = (entity: UserDocument): UserEntity =>
  Object.freeze({
    id: entity._id,
    username: entity.username,
    salt: entity.salt,
    hashPassword: entity.hashPassword,
    firstName: entity.firstName,
    lastName: entity.lastName,
    createdAt: entity.createdAt,
  });
