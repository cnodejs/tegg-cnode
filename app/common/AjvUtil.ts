import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

import UserSchema, { UserSchemaType } from './schema/UserSchema';

const ajv = new Ajv({
  $data: true,
  allErrors: true,
});

addErrors(ajv);
addFormats(ajv);

export const userValidate = ajv.compile<UserSchemaType>(UserSchema);
