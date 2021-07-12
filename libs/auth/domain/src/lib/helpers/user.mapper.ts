import { UserDto, UserIdDto } from '@puppo/auth/dto';
import { UserEntity } from '../entities/user.entity';

export const mapTodoEntityToDto = (entity: UserEntity): UserDto => ({
  id: entity.id as UserIdDto,
  firstName: entity.firstName,
  lastName: entity.lastName,
  createdAt: entity.createdAt,
});
