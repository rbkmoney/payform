import { logPrefix } from 'checkout/log-messages';
import {
    CardFormInfo,
    FormInfo,
    PaymentMethod,
    PaymentMethodName,
    PaymentMethodsFormInfo,
    EurosetFormInfo,
    WalletFormInfo,
    TokenProviderFormInfo
} from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend/model';

const resolveDefaultMethod = (defaultMethod: PaymentMethod): FormInfo => {
    switch (defaultMethod.name) {
        case PaymentMethodName.BankCard:
            return new CardFormInfo();
        case PaymentMethodName.Euroset:
            return new EurosetFormInfo();
        case PaymentMethodName.DigitalWallet:
            return new WalletFormInfo();
        case PaymentMethodName.ApplePay:
            return new TokenProviderFormInfo(BankCardTokenProvider.applepay);
        case PaymentMethodName.GooglePay:
            return new TokenProviderFormInfo(BankCardTokenProvider.googlepay);
        case PaymentMethodName.SamsungPay:
            return new TokenProviderFormInfo(BankCardTokenProvider.samsungpay);
        default:
            console.error(`${logPrefix} Unsupported initial form for method ${defaultMethod}`);
            return new CardFormInfo();
    }
};

export const toInitialForm = (isMultiMethods: boolean, defaultMethod: PaymentMethod): FormInfo[] => [
    isMultiMethods ? new PaymentMethodsFormInfo() : resolveDefaultMethod(defaultMethod)
];
