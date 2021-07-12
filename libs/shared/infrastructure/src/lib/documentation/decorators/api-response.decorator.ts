import {
  ApiResponseOptions,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import {
  CodecSchemaOptions,
  codecToSchemaOptions,
} from '../../helpers/io-ts-schema';

type ApiResponseOptionsWithCodec = CodecSchemaOptions<ApiResponseOptions>;

export const ApiResponseWithCodec = (
  options: ApiResponseOptionsWithCodec
): MethodDecorator & ClassDecorator =>
  ApiResponse(codecToSchemaOptions(options));

export const ApiOkResponseWithCodec = (
  options: ApiResponseOptionsWithCodec
): MethodDecorator & ClassDecorator =>
  ApiOkResponse(codecToSchemaOptions(options));
