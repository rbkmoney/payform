import { AbstractAction, TypeKeys } from 'checkout/actions';
import { InitConfig } from 'checkout/config';

export interface SetCheckedInitConfig extends AbstractAction<InitConfig> {
    type: TypeKeys.SET_CHECKED_INIT_CONFIG;
    payload: InitConfig;
}
