import { UserEntityId } from './user.entity';

export type AuthToken = string;

export type JwtPayload = {
  id: UserEntityId;
  firstName: string;
  lastName: string;
  createdAt: Date;
};
