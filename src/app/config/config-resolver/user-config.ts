import { InitConfig } from '../init-config';

export type UserConfig = Partial<Record<keyof InitConfig, string>>;
