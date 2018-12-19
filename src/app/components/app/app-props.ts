import { InitConfig } from 'checkout/config';
import { InitializeAppState } from 'checkout/state';
import { ThemeName } from 'checkout/themes';

export interface AppProps {
    initConfig: InitConfig;
    initializeApp: InitializeAppState;
    initApp: (config: InitConfig) => any;
    theme: ThemeName;
    fixedTheme: string;
}
