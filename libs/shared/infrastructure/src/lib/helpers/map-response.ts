import { ApplicationException } from '@puppo/shared/kernel';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { InternalServerErrorException } from '@nestjs/common';

export const mapTaskEToResponse = async <T>(
  task: TE.TaskEither<ApplicationException, T>
): Promise<T> | never => {
  return pipe(
    await task(),
    E.fold(
      (error) => {
        console.error(error);
        throw new InternalServerErrorException(error);
      },
      (res) => res
    )
  );
};
