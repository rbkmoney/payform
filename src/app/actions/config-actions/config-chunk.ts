import { AppConfig } from 'checkout/backend';
import { Locale } from 'checkout/locale';

export interface ConfigChunk {
    appConfig: AppConfig;
    locale: Locale;
}
