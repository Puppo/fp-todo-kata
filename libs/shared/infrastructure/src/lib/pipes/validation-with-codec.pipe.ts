import {
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import { formatValidationErrors } from 'io-ts-reporters';

type ErrorFields = 'field' | 'query' | 'param';
const ErrorField: Readonly<Record<ArgumentMetadata['type'], ErrorFields>> =
  Object.freeze({
    body: 'field',
    custom: 'field',
    query: 'query',
    param: 'param',
  } as const);

export class ValidationWithCodecPipe<A> implements PipeTransform {
  constructor(private readonly schema: t.Decoder<unknown, A>) {}

  transform(value: unknown, metadata: ArgumentMetadata): A | never {
    return pipe(
      this.schema.decode(value),
      E.fold(
        (validations) => {
          const typeOfField = ErrorField[metadata.type];
          const error = formatValidationErrors(validations).join(',');

          // return 404 if Pipe is from a HTTP param
          if (metadata.type === 'param') {
            throw new NotFoundException({
              [typeOfField]: metadata.data,
              error,
            });
          }

          // return 400 if Pipe is from body, query or custom
          throw new BadRequestException({
            [typeOfField]: metadata.data,
            error,
          });
        },
        (res) => res
      )
    );
  }
}
