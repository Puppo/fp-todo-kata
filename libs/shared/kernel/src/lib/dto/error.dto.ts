import * as t from 'io-ts';

export const errorDtoCodec = t.type({
  statusCode: t.number,
  message: t.string,
  error: t.string,
});

export type ErrorDto = t.TypeOf<typeof errorDtoCodec>;
