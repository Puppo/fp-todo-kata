import * as t from 'io-ts';

export const genericErrorDtoCodec = t.type({
  statusCode: t.number,
  message: t.string,
});

export type GenericErrorDto = t.TypeOf<typeof genericErrorDtoCodec>;
