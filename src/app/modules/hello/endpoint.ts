import { BaseEndpoint, ModuleEndpointContext, cryptography } from 'lisk-sdk';
import { MessageStore, MessageStoreData } from './stores/message';

import { counterKey, CounterStore, CounterStoreData } from './stores/counter';

export class HelloEndpoint extends BaseEndpoint {
  public async getHello(ctx: ModuleEndpointContext): Promise<MessageStoreData> {
    // 1. Get message store
    const messageSubStore = this.stores.get(MessageStore);
    // 2. Get the address from the endpoint params
    const { address } = ctx.params;
    // 3. Validate address
    if (typeof address !== 'string') {
      throw new Error('Parameter address must be a string.');
    }
    cryptography.address.validateLisk32Address(address);
    // 4. Get the Hello message for the address from the message store
    const helloMessage = await messageSubStore.get(
      ctx,
      cryptography.address.getAddressFromLisk32Address(address),
    );
    // 5. Return the Hello message
    return helloMessage;
  }

  public async getHelloCounter(ctx: ModuleEndpointContext): Promise<CounterStoreData> {
    const counterSubStore = this.stores.get(CounterStore);

    const helloCounter = await counterSubStore.get(
      ctx,
      counterKey,
    );

    return helloCounter;
  }
}
