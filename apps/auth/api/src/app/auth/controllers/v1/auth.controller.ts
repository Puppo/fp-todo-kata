import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiBodyWithCodec,
  ApiOkResponseWithCodec,
  ApiResponseWithCodec,
  mapTaskEToResponse,
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
import * as O from 'fp-ts/Option';
import { pipe, flow } from 'fp-ts/function';
import { errorDtoCodec } from '@puppo/shared/kernel';

@ApiTags('auth')
@Controller('auth')
export class AuthControllerV1 {
  constructor(private readonly userService: UserService) {}

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
    definition: errorDtoCodec,
  })
  @Post('sign-up')
  async signUp(
    @Body(new ValidationWithCodecPipe(signUpUserDtoCodec)) user: SignUpUserDto
  ): Promise<UserDto> {
    return pipe(
      this.userService.signUp(user),
      TE.map(mapTodoEntityToDto),
      mapTaskEToResponse
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
    status: 500,
    description: 'Internal Server Error',
    definition: errorDtoCodec,
  })
  @Post('sign-in')
  async signIn(
    @Body(new ValidationWithCodecPipe(authCredentialsDtoCodec))
    credentials: AuthCredentialsDto
  ): Promise<AuthTokenDto> {
    return pipe(
      this.userService.signIn(credentials),
      TE.chain(
        flow(
          O.fold(
            () => {
              throw new UnauthorizedException();
            },
            (user) => this.userService.generateAuthToken(user)
          ),
          TE.map((token) => ({ token }))
        )
      ),
      mapTaskEToResponse
    );
  }
}
