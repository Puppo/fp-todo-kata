import { ApiQueryOptions, ApiQuery } from '@nestjs/swagger';

import {
  CodecSchemaOptions,
  codecToSchemaOptions,
} from '../../helpers/io-ts-schema';

type ApiQueryOptionsWithCodec = CodecSchemaOptions<ApiQueryOptions>;

export const ApiQueryWithCodec = (
  options: ApiQueryOptionsWithCodec
): MethodDecorator => ApiQuery(codecToSchemaOptions(options));
