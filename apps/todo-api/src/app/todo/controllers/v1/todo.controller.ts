import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  mapTaskEToResponse,
  mapTaskEWithOptionToResponse,
  ApiOkResponseWithCodec,
  ApiBodyWithCodec,
  ApiParamWithCodec,
} from '@puppo/shared/infrastructure';
import {
  TodoService,
  TODO_SERVICE,
  mapTodoEntityToDto,
} from '@puppo/todos/domain';
import {
  CreateTodoDto,
  createTodoDtoCodec,
  TodoDto,
  todoDtoCodec,
  TodoId,
  todoIdCodec,
} from '@puppo/todos/dto';
import { pipe, flow } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    @Inject(TODO_SERVICE) private readonly todoService: TodoService
  ) {}

  @ApiBodyWithCodec({
    definition: createTodoDtoCodec,
    description: 'The data of the todo',
  })
  @ApiOkResponseWithCodec({
    description: 'The info of the todo insert',
    definition: todoDtoCodec,
  })
  @Post()
  async insertTodo(@Body() todo: CreateTodoDto): Promise<TodoDto> {
    const saveTodo = pipe(
      this.todoService.createTodo(todo),
      TE.map(mapTodoEntityToDto),
      mapTaskEToResponse
    );
    return await saveTodo;
  }

  @ApiParamWithCodec({
    name: 'id',
    definition: todoIdCodec,
    description: 'The id of the todo',
  })
  @ApiOkResponseWithCodec({
    description: 'The todo',
    definition: todoDtoCodec,
  })
  @Get('/:id')
  async getById(@Param('id') id: TodoId): Promise<TodoDto> {
    const todo = pipe(
      this.todoService.getById(id),
      TE.map(flow(O.map(mapTodoEntityToDto))),
      mapTaskEWithOptionToResponse
    );
    return await todo;
  }
}
