import { ApiParamOptions, ApiParam } from '@nestjs/swagger';

import {
  CodecSchemaOptions,
  codecToSchemaOptions,
} from '../../helpers/io-ts-schema';

type ApiParamOptionsWithCodec = CodecSchemaOptions<ApiParamOptions>;

export const ApiParamWithCodec = (
  options: ApiParamOptionsWithCodec
): MethodDecorator => ApiParam(codecToSchemaOptions(options));
