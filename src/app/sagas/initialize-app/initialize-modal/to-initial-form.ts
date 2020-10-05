import { logPrefix } from 'checkout/log-messages';
import {
    CardFormInfo,
    FormInfo,
    PaymentMethod,
    PaymentMethodName,
    PaymentMethodsFormInfo,
    MobileCommerceFormInfo,
    EurosetFormInfo,
    WalletFormInfo,
    TokenProviderFormInfo,
    QPSFormInfo
} from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend/model';
import { assertUnreachable } from 'checkout/utils';

const resolveDefaultMethod = (defaultMethod: PaymentMethod): FormInfo => {
    switch (defaultMethod.name) {
        case PaymentMethodName.BankCard:
            return new CardFormInfo();
        case PaymentMethodName.Euroset:
            return new EurosetFormInfo();
        case PaymentMethodName.QPS:
            return new QPSFormInfo();
        case PaymentMethodName.DigitalWallet:
            return new WalletFormInfo();
        case PaymentMethodName.ApplePay:
            return new TokenProviderFormInfo(BankCardTokenProvider.applepay);
        case PaymentMethodName.GooglePay:
            return new TokenProviderFormInfo(BankCardTokenProvider.googlepay);
        case PaymentMethodName.SamsungPay:
            return new TokenProviderFormInfo(BankCardTokenProvider.samsungpay);
        case PaymentMethodName.MobileCommerce:
            return new MobileCommerceFormInfo();
        default:
            assertUnreachable(defaultMethod.name);
            console.error(`${logPrefix} Unsupported initial form for method ${defaultMethod}`);
            return new CardFormInfo();
    }
};

export const toInitialForm = (isMultiMethods: boolean, defaultMethod: PaymentMethod): FormInfo[] => [
    isMultiMethods ? new PaymentMethodsFormInfo() : resolveDefaultMethod(defaultMethod)
];
