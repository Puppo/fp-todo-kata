import * as t from 'io-ts';
import * as types from 'io-ts-types';

import { Types } from 'mongoose';

export interface IObjectId extends String {
  readonly objectId: unique symbol;
}

const objectIdBrand = t.brand(
  t.string,
  (value: string): value is t.Branded<string, IObjectId> =>
    Types.ObjectId.isValid(value),
  'objectId'
);

export const objectId = types.withMessage(
  objectIdBrand,
  () => `Object id is invalid`
);

export type ObjectId = t.TypeOf<typeof objectId>;
