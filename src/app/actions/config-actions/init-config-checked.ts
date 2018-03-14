import { AbstractAction, TypeKeys } from 'checkout/actions';
import { InitConfig } from 'checkout/config';

export interface InitConfigChecked extends AbstractAction<InitConfig> {
    type: TypeKeys.INIT_CONFIG_CHECKED;
    payload: InitConfig;
}
