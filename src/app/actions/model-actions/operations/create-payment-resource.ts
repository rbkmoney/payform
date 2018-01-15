import {
    PaymentToolType,
    createPaymentResource as capiRequest,
    PaymentResource
} from 'checkout/backend';
import { CardFormValues } from 'checkout/state';
import { PaymentSubject } from './payment-subject';

const replaceSpaces = (str: string): string => str.replace(/\s+/g, '');

export const createPaymentResource = (s: PaymentSubject, endpoint: string, v: CardFormValues): Promise<PaymentResource> => {
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
