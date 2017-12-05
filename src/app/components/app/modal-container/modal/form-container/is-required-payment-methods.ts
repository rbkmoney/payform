import { ModelState } from 'checkout/state';
import { InitConfig } from 'checkout/config';

export const isRequiredPaymentMethods = (initConfig: InitConfig, model: ModelState) => {
    return initConfig.terminals && model.paymentMethods.length > 1;
};
