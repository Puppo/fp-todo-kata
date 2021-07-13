import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ObjectId } from '../io-ts-types/object-id.types';

export type UserFromDecorator = {
  id: ObjectId;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserFromDecorator => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
