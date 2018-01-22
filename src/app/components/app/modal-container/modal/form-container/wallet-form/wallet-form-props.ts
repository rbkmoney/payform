import { WalletFormInfo } from 'checkout/state/modal/form-info/wallet-form-info';
import { Locale } from 'checkout/locale';

export interface WalletFormProps {
    walletFormInfo: WalletFormInfo;
    locale: Locale;
}