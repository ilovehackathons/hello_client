export const configSchema = {
  $id: '/hello/config',
  type: 'object',
  properties: {
    maxMessageLength: {
      type: 'integer',
      format: 'uint32',
    },
    minMessageLength: {
      type: 'integer',
      format: 'uint32',
    },
    blacklist: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 1,
        maxLength: 40,
      },
    },
  },
  required: [
    'maxMessageLength',
    'minMessageLength',
    'blacklist'
  ],
};

export const createHelloSchema = {
  $id: 'hello/createHello-params',
  title: 'CreateHelloCommand transaction parameter for the Hello module',
  type: 'object',
  required: ['message'],
  properties: {
    message: {
      dataType: 'string',
      fieldNumber: 1,
      minLength: 3,
      maxLength: 256,
    },
  },
};
