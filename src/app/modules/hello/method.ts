import { BaseMethod, ImmutableMethodContext } from 'lisk-sdk';
import { MessageStore, MessageStoreData } from './stores/message';

export class HelloMethod extends BaseMethod {

  public async getHello(
    methodContext: ImmutableMethodContext,
    address: Buffer,
  ): Promise<MessageStoreData> {
    // 1. Get message store
    const messageSubStore = this.stores.get(MessageStore);
    // 2. Get the Hello message for the address from the message store
    const helloMessage = await messageSubStore.get(methodContext, address);
    // 3. Return the Hello message
    return helloMessage;
  }
}
