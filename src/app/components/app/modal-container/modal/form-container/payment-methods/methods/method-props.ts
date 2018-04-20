import { Locale } from 'checkout/locale';
import { FormInfo } from 'checkout/state';
import { PaymentRequestedPayload } from 'checkout/actions';

export interface MethodProps {
    locale: Locale;
    setFormInfo: (formInfo: FormInfo) => any;
    pay: (payload: PaymentRequestedPayload) => any;
    paymentValuesPrefilled: boolean;
}
