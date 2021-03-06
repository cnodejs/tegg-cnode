import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

import UserSchema, { UserSchemaType } from './schema/UserSchema';
import ReplySchema, { ReplySchemaType } from './schema/ReplySchema';
import TopicSchema, { TopicSchemaType } from './schema/TopicSchema';

const ajv = new Ajv({
  $data: true,
  allErrors: true,
});

addErrors(ajv);
addFormats(ajv);

export const userValidate = ajv.compile<UserSchemaType>(UserSchema);
export const replyValidate = ajv.compile<ReplySchemaType>(ReplySchema);
export const topicValidate = ajv.compile<TopicSchemaType>(TopicSchema);
