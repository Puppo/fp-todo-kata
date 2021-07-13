import {
  ApplicationException,
  UnauthorizedApplicationException,
} from '@puppo/shared/kernel';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const mapTaskEToResponse = async <T>(
  taskE: TE.TaskEither<ApplicationException, T>
): Promise<T> | never => {
  return pipe(
    await taskE(),
    E.fold(
      (error) => {
        if (error instanceof UnauthorizedApplicationException) {
          throw new UnauthorizedException();
        }
        console.error(error);
        throw new InternalServerErrorException();
      },
      (res) => res
    )
  );
};

export const mapTaskEWithOToResponse = async <T>(
  taskE: TE.TaskEither<ApplicationException, O.Option<T>>
): Promise<T> | never => {
  return mapOptionToResponse(await mapTaskEToResponse(taskE));
};

const mapOptionToResponse = <T>(value: O.Option<T>): T | never => {
  return pipe(
    value,
    O.fold(
      () => {
        throw new NotFoundException();
      },
      (res) => res
    )
  );
};
