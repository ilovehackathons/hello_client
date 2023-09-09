/* eslint-disable class-methods-use-this */

import {
	BaseCommand,
	CommandVerifyContext,
	CommandExecuteContext,
	VerificationResult,
	VerifyStatus,
} from 'lisk-sdk';

import { createHelloSchema } from '../schema';
import { ModuleConfig } from '../types';

import { MessageStore } from '../stores/message';
import { counterKey, CounterStore, CounterStoreData } from '../stores/counter';
import { NewHelloEvent } from '../events/new_hello';

interface Params {
	message: string;
}

export class CreateHelloCommand extends BaseCommand {
	// public schema = {
	// 	$id: 'CreateHelloCommand',
	// 	type: 'object',
	// 	properties: {},
	// };

	// eslint-disable-next-line @typescript-eslint/require-await
	public async init(config: ModuleConfig): Promise<void> {
		// Set _blacklist to the value of the blacklist defined in the module config
		this._blacklist = config.blacklist;
		// Set the max message length to the value defined in the module config
		this.schema.properties.message.maxLength = config.maxMessageLength;
		// Set the min message length to the value defined in the module config
		this.schema.properties.message.minLength = config.minMessageLength;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async verify(context: CommandVerifyContext<Params>): Promise<VerificationResult> {
		let validation: VerificationResult;
		const wordList = context.params.message.split(" ");
		const found = this._blacklist.filter(value => wordList.includes(value));
		if (found.length > 0) {
			context.logger.info("==== FOUND: Message contains a blacklisted word ====");
			throw new Error(
				`Illegal word in hello message: ${found.toString()}`
			);
		} else {
			context.logger.info("==== NOT FOUND: Message contains no blacklisted words ====");
			validation = {
				status: VerifyStatus.OK
			};
		}
		return validation;
	}
	// public async verify(_context: CommandVerifyContext<Params>): Promise<VerificationResult> {
	// 	return { status: VerifyStatus.OK };
	// }

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async execute(context: CommandExecuteContext<Params>): Promise<void> {
		// 1. Get account data of the sender of the Hello transaction.
		const { senderAddress } = context.transaction;
		// 2. Get message and counter stores.
		const messageSubstore = this.stores.get(MessageStore);
		const counterSubstore = this.stores.get(CounterStore);

		// 3. Save the Hello message to the message store, using the senderAddress as key, and the message as value.
		await messageSubstore.set(context, senderAddress, {
			message: context.params.message,
		});

		// 3. Get the Hello counter from the counter store.
		let helloCounter: CounterStoreData;
		try {
			helloCounter = await counterSubstore.get(context, counterKey);
		} catch (error) {
			helloCounter = {
				counter: 0,
			}
		}
		// 5. Increment the Hello counter +1.
		helloCounter.counter += 1;

		// 6. Save the Hello counter to the counter store.
		await counterSubstore.set(context, counterKey, helloCounter);

		// 7. Emit a "New Hello" event
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const newHelloEvent = this.events.get(NewHelloEvent);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		newHelloEvent.add(context, {
			senderAddress: context.transaction.senderAddress,
			message: context.params.message
		}, [context.transaction.senderAddress]);
	}
	// public async execute(_context: CommandExecuteContext<Params>): Promise<void> {
	// }

	private _blacklist!: string[];
	public schema = createHelloSchema;
}
