import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  mapTaskEToResponse,
  mapTaskEWithOToResponse,
  ApiOkResponseWithCodec,
  ApiBodyWithCodec,
  ApiParamWithCodec,
  ValidationWithCodecPipe,
  ApiResponseWithCodec,
} from '@puppo/shared/infrastructure';
import { TodoService, mapTodoEntityToDto } from '@puppo/todo/domain';
import {
  CreateTodoDto,
  createTodoDtoCodec,
  TodoDto,
  todoDtoCodec,
  TodoId,
  todoIdCodec,
} from '@puppo/todo/dto';
import { pipe, flow } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { genericErrorDtoCodec } from '@puppo/shared/kernel';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBodyWithCodec({
    definition: createTodoDtoCodec,
    description: 'The data of the todo',
  })
  @ApiOkResponseWithCodec({
    description: 'The info of the todo insert',
    definition: todoDtoCodec,
  })
  @ApiResponseWithCodec({
    status: 500,
    description: 'Internal Server Error',
    definition: genericErrorDtoCodec,
  })
  @Post()
  async insertTodo(
    @Body(new ValidationWithCodecPipe(createTodoDtoCodec)) todo: CreateTodoDto
  ): Promise<TodoDto> {
    return pipe(
      this.todoService.createTodo(todo),
      TE.map(mapTodoEntityToDto),
      mapTaskEToResponse
    );
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
  @ApiResponseWithCodec({
    status: 500,
    description: 'Internal Server Error',
    definition: genericErrorDtoCodec,
  })
  @Get('/:id')
  async getById(
    @Param('id', new ValidationWithCodecPipe(todoIdCodec)) id: TodoId
  ): Promise<TodoDto> {
    return pipe(
      this.todoService.getById(id),
      TE.map(flow(O.map(mapTodoEntityToDto))),
      mapTaskEWithOToResponse
    );
  }
}
