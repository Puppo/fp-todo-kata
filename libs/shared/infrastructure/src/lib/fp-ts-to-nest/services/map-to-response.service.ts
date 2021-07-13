import {
  Injectable,
  Logger,
  Scope,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApplicationException,
  UnauthorizedApplicationException,
} from '@puppo/shared/kernel';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class MapToResponseService {
  constructor(private readonly logger: Logger) {}

  setContext(ctx: string): void {
    this.logger.setContext(ctx);
  }

  mapTaskEToResponse = async <T>(
    taskE: TE.TaskEither<ApplicationException, T>
  ): Promise<T> | never => {
    return pipe(
      await taskE(),
      E.fold(
        (error) => {
          if (error instanceof UnauthorizedApplicationException) {
            throw new UnauthorizedException();
          }
          this.logger.error(error);
          throw new InternalServerErrorException();
        },
        (res) => res
      )
    );
  };

  mapTaskEWithOToResponse = async <T>(
    taskE: TE.TaskEither<ApplicationException, O.Option<T>>
  ): Promise<T> | never => {
    return this.mapOptionToResponse(await this.mapTaskEToResponse(taskE));
  };

  mapOptionToResponse<T>(value: O.Option<T>): T | never {
    return pipe(
      value,
      O.fold(
        () => {
          throw new NotFoundException();
        },
        (res) => res
      )
    );
  }
}
