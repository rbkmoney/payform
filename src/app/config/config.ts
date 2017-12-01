import { AppConfig } from '../backend/app-config';
import { InitConfig } from './init-config';

export class Config {
    origin: string;
    initConfig: InitConfig;
    appConfig?: AppConfig;
}
