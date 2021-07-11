import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TodoEntityId } from '@puppo/todos/domain';

export type TodoDocument = Todo & mongoose.Document<TodoEntityId>;

@Schema()
export class Todo {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  description?: string;

  @Prop({
    type: Date,
    UTC: true,
  })
  dueDate?: Date;

  @Prop({
    timestamp: true,
    UTC: true,
  })
  createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
