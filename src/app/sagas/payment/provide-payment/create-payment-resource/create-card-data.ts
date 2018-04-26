import { call, CallEffect } from 'redux-saga/effects';
import { CardFormValues } from 'checkout/state';
import {
    PaymentResource,
    PaymentToolType,
    createPaymentResource,
} from 'checkout/backend';
import { replaceSpaces } from './replace-spaces';

export function* createCardData(endpoint: string, formValues: CardFormValues, token: string): Iterator<CallEffect | PaymentResource> {
    const cardNumber = replaceSpaces(formValues.cardNumber);
    const expDate = replaceSpaces(formValues.expireDate);
    const paymentTool = {
        paymentToolType: PaymentToolType.CardData,
        cardNumber,
        expDate,
        cvv: formValues.secureCode,
        cardHolder: formValues.cardHolder
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
