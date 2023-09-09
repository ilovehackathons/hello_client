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