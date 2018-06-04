import { logPrefix } from 'checkout/log-messages';
import {
    CardFormInfo,
    FormInfo,
    FormName,
    PaymentMethodsFormInfo,
    TerminalFormInfo,
    WalletFormInfo
} from 'checkout/state';
import { PaymentMethodName } from 'checkout/config';

const toInitialFormInfo = (isMultiMethods: boolean, initialPaymentMethod: PaymentMethodName): FormInfo => {
    const previous = isMultiMethods ? FormName.paymentMethods : null;
    switch (initialPaymentMethod) {
        case PaymentMethodName.bankCard:
            return new CardFormInfo(previous);
        case PaymentMethodName.terminalEuroset:
            return new TerminalFormInfo(previous);
        case PaymentMethodName.walletQiwi:
            return new WalletFormInfo(previous);
        default:
            console.error(`${logPrefix} Unsupported initial payment method ${initialPaymentMethod}`);
            return new CardFormInfo();
    }
};

export const toInitialPaymentMethod = (isMultiMethods: boolean, initialPaymentMethod: PaymentMethodName): FormInfo[] => {
    const initialFormInfo = toInitialFormInfo(isMultiMethods, initialPaymentMethod);
    const initialPaymentMethods = new PaymentMethodsFormInfo();
    initialPaymentMethods.active = false;
    return isMultiMethods
        ? [initialPaymentMethods, initialFormInfo]
        : [initialFormInfo];
};
