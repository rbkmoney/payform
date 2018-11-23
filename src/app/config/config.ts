import { AppConfig } from '../backend/app-config';
import { InitConfig } from './init-config';
import { Locale } from 'checkout/locale';
import Theme from 'checkout/themes/theme';

export class Config {
    origin: string;
    inFrame: boolean;
    initConfig: InitConfig;
    appConfig?: AppConfig;
    locale?: Locale;
}
