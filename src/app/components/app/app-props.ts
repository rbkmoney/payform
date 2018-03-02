import { InitConfig } from 'checkout/config';
import { InitializeAppState } from 'checkout/state';

export interface AppProps {
    initConfig: InitConfig;
    initializeApp: InitializeAppState;
    initApp: (config: InitConfig) => any;
}
