import {
    PaymentToolType,
    createPaymentResource as capiRequest,
    PaymentResource,
    DigitalWalletType
} from 'checkout/backend';
import { CardFormValues, WalletFormValues, TerminalFormValues } from 'checkout/state';
import { PaymentSubject } from './payment-subject';

const replaceSpaces = (str: string): string => str.replace(/\s+/g, '');

export const createPaymentResourceTerminal = (s: PaymentSubject, endpoint: string, v: TerminalFormValues): Promise<PaymentResource> => {
    const paymentTool = {
        paymentToolType: PaymentToolType.PaymentTerminalData,
        provider: 'euroset'
    };
    return capiRequest(endpoint, s.accessToken, paymentTool);
};

export const createPaymentResourceDigitalWalletQiwi = (s: PaymentSubject, endpoint: string, v: WalletFormValues): Promise<PaymentResource> => {
    const paymentTool = {
        paymentToolType: PaymentToolType.DigitalWalletData,
        digitalWalletType: DigitalWalletType.DigitalWalletQIWI,
        phoneNumber: replaceSpaces(v.phone)
    };
    return capiRequest(endpoint, s.accessToken, paymentTool);
};

export const createPaymentResourceCardData = (s: PaymentSubject, endpoint: string, v: CardFormValues): Promise<PaymentResource> => {
    const cardNumber = replaceSpaces(v.cardNumber);
    const expDate = replaceSpaces(v.expireDate);
    const paymentTool = {
        paymentToolType: PaymentToolType.CardData,
        cardNumber,
        expDate,
        cvv: v.secureCode,
        cardHolder: v.cardHolder
    };
    return capiRequest(endpoint, s.accessToken, paymentTool);
};
