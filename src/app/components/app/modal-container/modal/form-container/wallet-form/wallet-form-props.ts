import { WalletFormInfo, WalletFormValues } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { FieldsConfig } from '../fields-config';

export interface WalletFormProps {
    walletFormInfo: WalletFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    formValues: WalletFormValues;
    setViewInfoHeight: (height: number) => any;
    setViewInfoError: (hasError: boolean) => any;
}