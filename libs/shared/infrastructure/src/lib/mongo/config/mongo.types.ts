import { registerAs } from '@nestjs/config';
import * as E from 'fp-ts/Either';
import * as t from 'io-ts';
import reporter from 'io-ts-reporters';

const mongoConnectionCodec = t.readonly(
  t.type({
    connection: t.string,
    name: t.string,
    user: t.string,
    password: t.string,
  })
);

export type MongoConnection = t.TypeOf<typeof mongoConnectionCodec>;

export const mongoConnectionConfigLoader = (): MongoConnection | never => {
  const config = {
    connection: process.env.MONGO_DB_CONNECTION,
    name: process.env.MONGO_DB_CONNECTION_NAME,
    user: process.env.MONGO_DB_USER,
    password: process.env.MONGO_DB_PASSWORD,
  };

  const result = mongoConnectionCodec.decode(config);

  if (E.isLeft(result))
    throw new Error(`Mongo connection invalid ${reporter.report(result)}`);
  return result.right;
};

export const mongoConfigLoader = registerAs(
  'MONGO_CONFIG',
  mongoConnectionConfigLoader
);
export const MONGO_CONFIG_KEY = mongoConfigLoader.KEY;
