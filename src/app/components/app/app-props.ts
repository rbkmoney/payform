import { InitConfig } from 'checkout/config';
import { InitializeAppState } from 'checkout/state';
import { themesNames } from 'checkout/themes';

export interface AppProps {
    initConfig: InitConfig;
    initializeApp: InitializeAppState;
    initApp: (config: InitConfig) => any;
    theme: keyof typeof themesNames;
    fixedTheme: string;
}
