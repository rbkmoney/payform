import { logPrefix } from 'checkout/log-messages';
import {
    CardFormInfo,
    FormInfo,
    PaymentMethod,
    PaymentMethodName,
    PaymentMethodsFormInfo,
    TerminalFormInfo,
    WalletFormInfo
} from 'checkout/state';

const resolveDefaultMethod = (defaultMethod: PaymentMethod): FormInfo => {
    switch (defaultMethod.name) {
        case PaymentMethodName.BankCard:
            return new CardFormInfo();
        case PaymentMethodName.PaymentTerminal:
            return new TerminalFormInfo();
        case PaymentMethodName.DigitalWallet:
            return new WalletFormInfo();
        default:
            console.error(`${logPrefix} Unsupported initial form for method ${defaultMethod}`);
            return new CardFormInfo();
    }
};

export const toInitialForm = (isMultiMethods: boolean, defaultMethod: PaymentMethod): FormInfo[] =>
    [
        isMultiMethods
            ? new PaymentMethodsFormInfo()
            : resolveDefaultMethod(defaultMethod)
    ];
