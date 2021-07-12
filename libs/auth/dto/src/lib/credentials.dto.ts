import * as t from 'io-ts';

export const authCredentialsDtoCodec = t.type({
  username: t.string,
  password: t.string,
});

export type AuthCredentialsDto = t.TypeOf<typeof authCredentialsDtoCodec>;

const authTokenDtoCodec = t.type({
  token: t.string,
});

export type AuthTokenDto = t.TypeOf<typeof authTokenDtoCodec>;
