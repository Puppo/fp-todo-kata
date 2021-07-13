import { registerAs } from '@nestjs/config';
import * as E from 'fp-ts/Either';
import * as t from 'io-ts';
import * as types from 'io-ts-types';
import reporter from 'io-ts-reporters';

const authConfigCodec = t.readonly(
  t.type({
    secret: t.string,
    expiresIn: t.union([t.string, types.IntFromString]),
  })
);

export type AuthConfig = t.TypeOf<typeof authConfigCodec>;

const authConfigLoad = (): AuthConfig | never => {
  const config = {
    secret: process.env.AUTH_PRIVATE_KEY,
    expiresIn: process.env.AUTH_EXPIRES_IN || '24h',
  };

  const result = authConfigCodec.decode(config);

  if (E.isLeft(result))
    throw new Error(`Auth config invalid ${reporter.report(result)}`);
  return result.right;
};

export const authConfigLoader = registerAs('AUTH_CONFIG', authConfigLoad);
export const AUTH_CONFIG_KEY = authConfigLoader.KEY;
