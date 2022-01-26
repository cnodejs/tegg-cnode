import { JTDDataType } from 'ajv/dist/jtd';

const ReplySchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      minLength: 5,
    },
  },
  errorMessage: {
    properties: {
    },
  },
  required: [
    'content',
  ],
  additionalProperties: false,
} as const;

export type ReplySchemaType = JTDDataType<typeof ReplySchema>;

export default ReplySchema;
