import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiBodyWithCodec,
  ApiOkResponseWithCodec,
  ApiResponseWithCodec,
  ValidationWithCodecPipe,
} from '@puppo/shared/infrastructure';
import {
  AuthCredentialsDto,
  authCredentialsDtoCodec,
  AuthTokenDto,
  SignUpUserDto,
  signUpUserDtoCodec,
  UserDto,
  userDtoCodec,
} from '@puppo/auth/dto';
import { UserService, mapTodoEntityToDto } from '@puppo/auth/domain';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { genericErrorDtoCodec } from '@puppo/shared/kernel';
import { MapToResponseService } from '@puppo/shared/infrastructure';

@ApiTags('auth')
@Controller('auth')
export class AuthControllerV1 {
  constructor(
    private readonly mapToResponseService: MapToResponseService,
    private readonly userService: UserService
  ) {
    this.mapToResponseService.setContext(this.constructor.name);
  }

  @ApiBodyWithCodec({
    definition: signUpUserDtoCodec,
    description: 'The new user info',
  })
  @ApiOkResponseWithCodec({
    definition: userDtoCodec,
    description: 'The new user',
  })
  @ApiResponseWithCodec({
    status: 500,
    description: 'Internal Server Error',
    definition: genericErrorDtoCodec,
  })
  @Post('sign-up')
  async signUp(
    @Body(new ValidationWithCodecPipe(signUpUserDtoCodec)) user: SignUpUserDto
  ): Promise<UserDto> {
    return pipe(
      this.userService.signUp(user),
      TE.map(mapTodoEntityToDto),
      this.mapToResponseService.mapTaskEToResponse
    );
  }

  @ApiBodyWithCodec({
    definition: signUpUserDtoCodec,
    description: 'The new user info',
  })
  @ApiOkResponseWithCodec({
    definition: userDtoCodec,
    description: 'The new user',
  })
  @ApiResponseWithCodec({
    status: 401,
    description: 'Unauthorize error',
    definition: genericErrorDtoCodec,
  })
  @ApiResponseWithCodec({
    status: 500,
    description: 'Internal Server Error',
    definition: genericErrorDtoCodec,
  })
  @Post('sign-in')
  async signIn(
    @Body(new ValidationWithCodecPipe(authCredentialsDtoCodec))
    credentials: AuthCredentialsDto
  ): Promise<AuthTokenDto> {
    return pipe(
      this.userService.signIn(credentials),
      TE.chain((user) => this.userService.generateAuthToken(user)),
      TE.map((token) => ({ token })),
      this.mapToResponseService.mapTaskEToResponse
    );
  }
}
