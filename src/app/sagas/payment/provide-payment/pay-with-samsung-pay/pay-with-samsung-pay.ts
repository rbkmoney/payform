import { Config } from 'checkout/config';
import { AmountInfoState, ModelState, TokenProviderFormValues } from 'checkout/state';
import { ProvidePaymentEffects } from '../provide-payment';

export const payWithSamsungPay = (c: Config, m: ModelState, a: AmountInfoState, v: TokenProviderFormValues): Iterator<ProvidePaymentEffects> => {
    return null;
};
