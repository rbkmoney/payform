import { WalletFormInfo } from 'checkout/state/modal/form-info/wallet-form-info';
import { Locale } from 'checkout/locale';
import { FieldsConfig } from '../fields-config';
import { WalletFormFields } from 'checkout/state/forms/wallet-form';

export interface WalletFormProps {
    walletFormInfo: WalletFormInfo;
    locale: Locale;
    fieldsConfig: FieldsConfig;
    formValues: WalletFormFields;
    setViewInfoHeight: (height: number) => any;
}