import { Body, Controller, Inject, Post } from '@nestjs/common';
import { mapTaskEToResponse } from '@puppo/shared/infrastructure';
import {
  TodoService,
  TODO_SERVICE,
  mapTodoEntityToDto,
} from '@puppo/todos/domain';
import { CreateTodoDto, TodoDto } from '@puppo/todos/dto';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';

@Controller('todos')
export class TodoController {
  constructor(
    @Inject(TODO_SERVICE) private readonly todoService: TodoService
  ) {}

  @Post()
  async insertTodo(@Body() todo: CreateTodoDto): Promise<TodoDto> {
    const saveTodo = pipe(
      this.todoService.createTodo(todo),
      TE.map(mapTodoEntityToDto)
    );
    return await mapTaskEToResponse(saveTodo);
  }
}
