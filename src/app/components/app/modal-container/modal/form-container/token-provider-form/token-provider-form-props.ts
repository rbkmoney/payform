import { Locale } from 'checkout/locale';
import {
    TokenProviderFormInfo,
    TokenProviderFormValues
} from 'checkout/state';
import { FieldsConfig } from '../fields-config';
import { PaymentRequestedPayload } from 'checkout/actions';

export interface TokenProviderFormProps {
    tokenProviderFormInfo: TokenProviderFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    formValues: TokenProviderFormValues;
    setViewInfoError: (hasError: boolean) => any;
    setViewInfoHeight: (height: number) => any;
    prepareToPay: () => any;
    pay: (payload: PaymentRequestedPayload) => any;
}
