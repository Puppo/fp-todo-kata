import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserEntityId } from '@puppo/auth/domain';

export type UserDocument = User & mongoose.Document<UserEntityId>;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  salt: string;

  @Prop({
    required: true,
  })
  hashPassword: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    timestamp: true,
    UTC: true,
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
