import { ApiBodyOptions, ApiBody } from '@nestjs/swagger';

import {
  CodecSchemaOptions,
  codecToSchemaOptions,
} from '../../helpers/io-ts-schema';

type ApiBodyOptionsWithCodec = CodecSchemaOptions<ApiBodyOptions>;

export const ApiBodyWithCodec = (
  options: ApiBodyOptionsWithCodec
): MethodDecorator => ApiBody(codecToSchemaOptions(options));
