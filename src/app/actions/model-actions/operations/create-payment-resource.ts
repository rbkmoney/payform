import {
    PaymentToolType,
    createPaymentResource as capiRequest,
    PaymentResource,
    DigitalWalletType
} from 'checkout/backend';
import { CardFormValues, WalletFormValues } from 'checkout/state';

const replaceSpaces = (str: string): string => str.replace(/\s+/g, '');

export const createPaymentResourceTerminalEuroset = (endpoint: string, accessToken: string): Promise<PaymentResource> => {
    const paymentTool = {
        paymentToolType: PaymentToolType.PaymentTerminalData,
        provider: 'euroset'
    };
    return capiRequest(endpoint, accessToken, paymentTool);
};

export const createPaymentResourceDigitalWalletQiwi = (endpoint: string, accessToken: string, v: WalletFormValues): Promise<PaymentResource> => {
    const paymentTool = {
        paymentToolType: PaymentToolType.DigitalWalletData,
        digitalWalletType: DigitalWalletType.DigitalWalletQIWI,
        phoneNumber: replaceSpaces(v.phone)
    };
    return capiRequest(endpoint, accessToken, paymentTool);
};

export const createPaymentResourceCardData = (endpoint: string, accessToken: string, v: CardFormValues): Promise<PaymentResource> => {
    const cardNumber = replaceSpaces(v.cardNumber);
    const expDate = replaceSpaces(v.expireDate);
    const paymentTool = {
        paymentToolType: PaymentToolType.CardData,
        cardNumber,
        expDate,
        cvv: v.secureCode,
        cardHolder: v.cardHolder
    };
    return capiRequest(endpoint, accessToken, paymentTool);
};
