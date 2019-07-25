import { InitConfig } from './init-config';

export type OpenConfig = Partial<Pick<InitConfig, 'metadata' | 'name' | 'description' | 'amount'>>;
