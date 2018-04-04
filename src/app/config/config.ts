import { AppConfig } from '../backend/app-config';
import { InitConfig } from './init-config';
import { Locale } from 'checkout/locale';

export class Config {
    origin: string;
    inFrame: boolean;
    initConfig: InitConfig;
    appConfig?: AppConfig;
    locale?: Locale;
}
