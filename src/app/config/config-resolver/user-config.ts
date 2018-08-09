import { InitConfig } from '../init-config';

export interface UserConfig extends Partial<Record<keyof InitConfig, string>> {
    [C: string]: string;
}
