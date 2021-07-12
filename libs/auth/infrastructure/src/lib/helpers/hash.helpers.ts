import {
  ApplicationException,
  ApplicationExtendedException,
} from '@puppo/shared/kernel';
import * as bcrypt from 'bcryptjs';
import * as TE from 'fp-ts/TaskEither';

export function generateSalt(): TE.TaskEither<ApplicationException, string> {
  return TE.tryCatch(
    () => bcrypt.genSalt(),
    (error) =>
      new ApplicationExtendedException('Problem on generate salt', error)
  );
}

export function hashPassword(
  password: string,
  salt: string
): TE.TaskEither<ApplicationException, string> {
  return TE.tryCatch(
    () => bcrypt.hash(password, salt),
    (error) =>
      new ApplicationExtendedException('Problem on has password', error)
  );
}
