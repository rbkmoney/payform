import {PaymentMethodsFormInfo} from 'checkout/state';

export const toPaymentMethods = () => {
    return new PaymentMethodsFormInfo(true);
};
