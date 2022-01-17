import { JTDDataType } from 'ajv/dist/jtd';

const UserSchema = {
  type: 'object',
  properties: {
    loginname: {
      type: 'string',
      minLength: 5,
      pattern: '^[a-zA-Z0-9\-_]+$',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    pass: {
      type: 'string',
    },
    rePass: {
      type: 'string',
      const: {
        $data: '1/pass',
      },
    },
  },
  errorMessage: {
    properties: {
      rePass: 'shold be equal to password',
    },
  },
  required: [
    'loginname',
    'email',
    'pass',
    'rePass',
  ],
  additionalProperties: true,
} as const;

export type UserSchemaType = JTDDataType<typeof UserSchema>;

export default UserSchema;
