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

import {
	BaseModule, BlockAfterExecuteContext, BlockExecuteContext, BlockVerifyContext,
	GenesisBlockExecuteContext, InsertAssetContext, ModuleInitArgs,
	ModuleMetadata, TransactionExecuteContext, TransactionVerifyContext,
	VerificationResult, codec, utils
} from 'lisk-sdk';
import { validator } from '@liskhq/lisk-validator';
import { /* createHelloSchema, CreateHelloParams, */ configSchema } from './schema';
import { ModuleConfigJSON } from './types';

import { HelloEndpoint } from './endpoint';
import { HelloMethod } from './method';


export class HelloModule extends BaseModule {
	public endpoint = new HelloEndpoint(this.stores, this.offchainStores);
	public method = new HelloMethod(this.stores, this.events);
	public commands = [];

	// public constructor() {
	// 	super();
	// 	// registeration of stores and events
	// }

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
		// Get the module config defined in the config.json of the node
		const { moduleConfig } = args;
		// Overwrite the default module config with values from config.json, if set
		const config = utils.objects.mergeDeep({}, defaultConfig, moduleConfig) as ModuleConfigJSON;
		// Validate the config with the config schema
		validator.validate<ModuleConfigJSON>(configSchema, config);
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