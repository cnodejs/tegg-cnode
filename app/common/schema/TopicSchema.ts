import { JTDDataType } from 'ajv/dist/jtd';

const TopicSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 5,
      maxLength: 100,
    },
    content: {
      type: 'string',
    },
    tab: {
      type: 'string',
    },
  },
  errorMessage: {
    properties: {
    },
  },
  required: [
    'title',
    'content',
    'tab',
  ],
  additionalProperties: false,
} as const;

export type TopicSchemaType = JTDDataType<typeof TopicSchema>;

export default TopicSchema;
