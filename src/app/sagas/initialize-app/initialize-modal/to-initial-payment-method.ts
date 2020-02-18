import { logPrefix } from 'checkout/log-messages';
import {
    CardFormInfo,
    FormInfo,
    FormName,
    PaymentMethodsFormInfo,
    EurosetFormInfo,
    WalletFormInfo,
    TokenProviderFormInfo
} from 'checkout/state';
import { PaymentMethodName } from 'checkout/config';
import { BankCardTokenProvider } from 'checkout/backend';

const toInitialFormInfo = (isMultiMethods: boolean, initialPaymentMethod: PaymentMethodName): FormInfo => {
    const previous = isMultiMethods ? FormName.paymentMethods : null;
    switch (initialPaymentMethod) {
        case PaymentMethodName.bankCard:
            return new CardFormInfo(previous);
        case PaymentMethodName.terminalEuroset:
            return new EurosetFormInfo(previous);
        case PaymentMethodName.walletQiwi:
            return new WalletFormInfo(previous);
        case PaymentMethodName.applePay:
            return new TokenProviderFormInfo(BankCardTokenProvider.applepay, previous);
        case PaymentMethodName.googlePay:
            return new TokenProviderFormInfo(BankCardTokenProvider.googlepay, previous);
        case PaymentMethodName.samsungPay:
            return new TokenProviderFormInfo(BankCardTokenProvider.samsungpay, previous);
        default:
            console.error(`${logPrefix} Unsupported initial payment method ${initialPaymentMethod}`);
            return new CardFormInfo();
    }
};

export const toInitialPaymentMethod = (
    isMultiMethods: boolean,
    initialPaymentMethod: PaymentMethodName
): FormInfo[] => {
    const initialFormInfo = toInitialFormInfo(isMultiMethods, initialPaymentMethod);
    const initialPaymentMethods = new PaymentMethodsFormInfo();
    initialPaymentMethods.active = false;
    return isMultiMethods ? [initialPaymentMethods, initialFormInfo] : [initialFormInfo];
};
