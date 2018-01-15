import { ConfigState, ModelState } from 'checkout/state';
import { InitConfig } from 'checkout/config';
import { LogicError } from 'checkout/backend';

export interface AppProps {
    config: ConfigState;
    model: ModelState;
    error: LogicError;
    modalReady: boolean;
    loadConfig: (locale: string) => any;
    initModel: (config: ConfigState) => any;
    initModal: (config: InitConfig, model: ModelState) => any;
}
