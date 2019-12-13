import { MobileFormInfo, MobileFormValues } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { FieldsConfig } from '../fields-config';
import { PaymentRequestedPayload } from 'checkout/actions';

export interface MobileFormProps {
    mobileFormInfo: MobileFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    formValues: MobileFormValues;
    setViewInfoError: (hasError: boolean) => any;
    pay: (payload: PaymentRequestedPayload) => any;
}
