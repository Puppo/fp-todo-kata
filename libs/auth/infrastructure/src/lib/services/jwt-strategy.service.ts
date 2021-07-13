import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, UserEntity, UserService } from '@puppo/auth/domain';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { AuthConfig, AUTH_CONFIG_KEY } from '../config/auth.config';
import { MapToResponseService } from '@puppo/shared/infrastructure';
import { UnauthorizedApplicationException } from '@puppo/shared/kernel';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_CONFIG_KEY) authConfig: AuthConfig,
    private readonly mapToResponseService: MapToResponseService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> | never {
    return pipe(
      this.userService.getUserById(payload.id),
      TE.chain(
        O.fold(
          () => TE.left(new UnauthorizedApplicationException('User not found')),
          (user) => TE.right(user)
        )
      ),
      this.mapToResponseService.mapTaskEToResponse
    );
  }
}
