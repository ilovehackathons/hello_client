/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/member-ordering */

// import {
// 	BaseModule,
// 	ModuleMetadata,
// 	// ModuleInitArgs,
// 	// InsertAssetContext,
// 	// BlockVerifyContext,
// 	// TransactionVerifyContext,
// 	// VerificationResult,
// 	// TransactionExecuteContext,
// 	// GenesisBlockExecuteContext,
// 	// BlockExecuteContext,
// 	// BlockAfterExecuteContext,
// 	// VerifyStatus,
// } from 'lisk-sdk';

import { validator } from '@liskhq/lisk-validator';
import {
	BaseModule, ModuleInitArgs,
	ModuleMetadata, TransactionVerifyContext, VerificationResult, utils
} from 'lisk-sdk';
import { /* createHelloSchema, CreateHelloParams, */ configSchema } from './schema';
import { ModuleConfigJSON } from './types';

import { HelloEndpoint } from './endpoint';
import { HelloMethod } from './method';

import { CreateHelloCommand } from "./commands/create_hello_command";
import { CounterStore } from './stores/counter';
import { MessageStore } from './stores/message';

export class HelloModule extends BaseModule {
	public endpoint = new HelloEndpoint(this.stores, this.offchainStores);
	public method = new HelloMethod(this.stores, this.events);
	public commands = [new CreateHelloCommand(this.stores, this.events)];

	public constructor() {
		super();
		// registration of stores and events
		this.stores.register(CounterStore, new CounterStore(this.name, 0));
		this.stores.register(MessageStore, new MessageStore(this.name, 1));
	}

	public metadata(): ModuleMetadata {
		return {
			...this.baseMetadata(),
			endpoints: [],
			assets: [],
		};
	}

	// Lifecycle hooks
	// public async init(_args: ModuleInitArgs): Promise<void> {
	// 	// initialize this module when starting a node
	// }
	// eslint-disable-next-line @typescript-eslint/require-await
	public async init(args: ModuleInitArgs): Promise<void> {
		// Get the module config defined in the config.json file
		const { moduleConfig } = args;
		// Overwrite the default module config with values from config.json, if set
		const config = utils.objects.mergeDeep({}, defaultConfig, moduleConfig) as ModuleConfigJSON;
		// Validate the provided config with the config schema
		validator.validate<ModuleConfigJSON>(configSchema, config);
		// Call the command init() method with config as parameter
		this.commands[0].init(config).catch(err => {
			// eslint-disable-next-line no-console
			console.log("Error: ", err);
		});
	}

	// public async insertAssets(_context: InsertAssetContext) {
	// 	// initialize block generation, add asset
	// }

	// public async verifyAssets(_context: BlockVerifyContext): Promise<void> {
	// 	// verify block
	// }

	// Lifecycle hooks
	// public async verifyTransaction(_context: TransactionVerifyContext): Promise<VerificationResult> {
	// verify transaction will be called multiple times in the transaction pool
	// return { status: VerifyStatus.OK };
	// }
	// eslint-disable-next-line @typescript-eslint/require-await
	public async verifyTransaction(context: TransactionVerifyContext): Promise<VerificationResult> {
		// Verify transaction will be called multiple times in the transaction pool
		context.logger.info('TX VERIFICATION');
		const result = {
			status: 1,
		};
		return result;
	}

	// public async beforeCommandExecute(_context: TransactionExecuteContext): Promise<void> {
	// }

	// public async afterCommandExecute(_context: TransactionExecuteContext): Promise<void> {

	// }
	// public async initGenesisState(_context: GenesisBlockExecuteContext): Promise<void> {

	// }

	// public async finalizeGenesisState(_context: GenesisBlockExecuteContext): Promise<void> {

	// }

	// public async beforeTransactionsExecute(_context: BlockExecuteContext): Promise<void> {

	// }

	// public async afterTransactionsExecute(_context: BlockAfterExecuteContext): Promise<void> {

	// }
}

export const defaultConfig = {
	maxMessageLength: 256,
	minMessageLength: 3,
	blacklist: ["illegalWord1"]
};