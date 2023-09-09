import { BaseEvent } from 'lisk-sdk';

export interface NewHelloEventData {
  senderAddress: Buffer;
  message: string;
}

export const newHelloEventSchema = {
  $id: '/hello/events/new_hello',
  type: 'object',
  required: ['senderAddress', 'message'],
  properties: {
    senderAddress: {
      dataType: 'bytes',
      fieldNumber: 1,
    },
    message: {
      dataType: 'string',
      fieldNumber: 2,
    },
  },
};

export class NewHelloEvent extends BaseEvent<NewHelloEventData> {
  public schema = newHelloEventSchema;
}
