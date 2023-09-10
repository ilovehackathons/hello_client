/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { HelloInfoPlugin } from "./plugins/hello_info/hello_info_plugin";

export const registerPlugins = (_app: Application): void => {

    _app.registerPlugin(new HelloInfoPlugin());
};
