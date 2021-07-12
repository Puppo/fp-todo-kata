import { ApiResponseSchemaHost } from '@nestjs/swagger';

import * as t from 'io-ts';
import { convert } from './converter';

interface ApiDefinitionOptions {
  definition: t.Mixed;
}
type SchemaObject = ApiResponseSchemaHost['schema'];

type SchemaOption<T> = Omit<T, 'definition'> & SchemaObject;

export const codecToSchemaOptions = <T extends ApiDefinitionOptions>(
  options: T
): SchemaOption<T> => {
  const schema = convertCodecToSchemaObject(options.definition);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  delete options.definition;

  return Object.assign({ schema }, options);
};

function convertCodecToSchemaObject(definition: t.Mixed): SchemaObject {
  return convert(definition) as SchemaObject;
}

export type SchemaOptionsWithCodec<T> = Omit<T, 'schema'> & {
  definition: t.Mixed;
};
