import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  mapTaskEToResponse,
  mapTaskEWithOptionToResponse,
} from '@puppo/shared/infrastructure';
import {
  TodoService,
  TODO_SERVICE,
  mapTodoEntityToDto,
} from '@puppo/todos/domain';
import { CreateTodoDto, TodoDto, TodoId } from '@puppo/todos/dto';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';

@Controller('todos')
export class TodoController {
  constructor(
    @Inject(TODO_SERVICE) private readonly todoService: TodoService
  ) {}

  @Post()
  async insertTodo(@Body() todo: CreateTodoDto): Promise<TodoDto> {
    const saveTodo = pipe(
      this.todoService.createTodo(todo),
      TE.map(mapTodoEntityToDto),
      mapTaskEToResponse
    );
    return await saveTodo;
  }

  @Get('/:id')
  async getById(@Param('id') id: TodoId): Promise<TodoDto> {
    const todo = pipe(
      this.todoService.getById(id),
      mapTaskEWithOptionToResponse
    );
    return await todo;
  }
}
