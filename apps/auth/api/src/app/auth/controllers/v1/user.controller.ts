import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { mapTodoEntityToDto, UserService } from '@puppo/auth/domain';
import {
  UserDto,
  userDtoCodec,
  UserIdDto,
  userIdDtoCodec,
} from '@puppo/auth/dto';
import {
  ApiOkResponseWithCodec,
  ApiParamWithCodec,
  ApiResponseWithCodec,
  MapToResponseService,
  ValidationWithCodecPipe,
} from '@puppo/shared/infrastructure';
import { genericErrorDtoCodec } from '@puppo/shared/kernel';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

@ApiTags('users')
@Controller('users')
export class UserControllerV1 {
  constructor(
    private readonly mapToResponseService: MapToResponseService,
    private readonly userService: UserService
  ) {
    this.mapToResponseService.setContext(this.constructor.name);
  }

  @ApiParamWithCodec({
    name: 'id',
    definition: userIdDtoCodec,
    description: 'User id',
  })
  @ApiOkResponseWithCodec({
    definition: userDtoCodec,
    description: 'The user resource',
  })
  @ApiResponseWithCodec({
    status: 401,
    definition: genericErrorDtoCodec,
    description: 'Unauthorize',
  })
  @ApiResponseWithCodec({
    status: 404,
    definition: genericErrorDtoCodec,
    description: 'User not found',
  })
  @ApiResponseWithCodec({
    definition: genericErrorDtoCodec,
    description: 'Internal Server Error',
  })
  @Get('/:id')
  async getUser(
    @Param('id', new ValidationWithCodecPipe(userIdDtoCodec)) id: UserIdDto
  ): Promise<UserDto> {
    return pipe(
      this.userService.getUserById(id),
      TE.map(O.map(mapTodoEntityToDto)),
      this.mapToResponseService.mapTaskEWithOToResponse
    );
  }
}
