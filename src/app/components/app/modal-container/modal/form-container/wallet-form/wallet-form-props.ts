import { ConfigState, ModelState, WalletFormInfo, WalletFormValues } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { FieldsConfig } from '../fields-config';

export interface WalletFormProps {
    config: ConfigState;
    model: ModelState;
    walletFormInfo: WalletFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    formValues: WalletFormValues;
    setViewInfoHeight: (height: number) => any;
    setViewInfoError: (hasError: boolean) => any;
    prepareToPay: () => any;
    pay: (c: ConfigState, m: ModelState, v: WalletFormValues) => any;
}
