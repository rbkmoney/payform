import { AbstractAction, TypeKeys } from 'checkout/actions';
import { InitConfig } from 'checkout/config';
import { ModelState } from 'checkout/state';
import { checkInitConfigCapability as check } from './config-checker';

export interface SetCheckedInitConfig extends AbstractAction<InitConfig> {
    type: TypeKeys.SET_CHECKED_INIT_CONFIG;
    payload: InitConfig;
}

export const checkInitConfigCapability = (initConfig: InitConfig, model: ModelState): SetCheckedInitConfig => ({
    type: TypeKeys.SET_CHECKED_INIT_CONFIG,
    payload: check(initConfig, model)
});
