import { InitConfig } from 'checkout/config';
import { LogicError } from 'checkout/backend';

export interface AppProps {
    initConfig: InitConfig;
    error: LogicError;
    modalReady: boolean;
    initApp: (config: InitConfig) => any;
}
