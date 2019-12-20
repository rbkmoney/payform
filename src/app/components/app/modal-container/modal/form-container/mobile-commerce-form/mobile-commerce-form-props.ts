import { MobileCommerceFormInfo, MobileCommerceFormValues } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { FieldsConfig } from '../fields-config';
import { PaymentRequestedPayload } from 'checkout/actions';

export interface MobileCommerceFormProps {
    mobileCommerceFormInfo: MobileCommerceFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    formValues: MobileCommerceFormValues;
    setViewInfoError: (hasError: boolean) => any;
    pay: (payload: PaymentRequestedPayload) => any;
}
