/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { HelloModule } from "./modules/hello/module";

export const registerModules = (_app: Application): void => {

    _app.registerModule(new HelloModule());
};
