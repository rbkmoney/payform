import { WalletFormInfo, WalletFormFields } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { FieldsConfig } from '../fields-config';

export interface WalletFormProps {
    walletFormInfo: WalletFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    formValues: WalletFormFields;
    setViewInfoHeight: (height: number) => any;
}