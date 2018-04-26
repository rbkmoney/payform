import { WalletFormInfo, WalletFormValues } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { FieldsConfig } from '../fields-config';
import { PaymentRequestedPayload } from 'checkout/actions';

export interface WalletFormProps {
    walletFormInfo: WalletFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    formValues: WalletFormValues;
    setViewInfoHeight: (height: number) => any;
    setViewInfoError: (hasError: boolean) => any;
    prepareToPay: () => any;
    pay: (payload: PaymentRequestedPayload) => any;
}
