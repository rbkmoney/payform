import { call, CallEffect } from 'redux-saga/effects';
import { WalletFormValues } from 'checkout/state';
import { PaymentResource, PaymentToolType, createPaymentResource, DigitalWalletType } from 'checkout/backend';
import { replaceSpaces } from './replace-spaces';

export function* createDigitalWalletQiwi(
    endpoint: string,
    formValues: WalletFormValues,
    token: string
): Iterator<CallEffect | PaymentResource> {
    const paymentTool = {
        paymentToolType: PaymentToolType.DigitalWalletData,
        digitalWalletType: DigitalWalletType.DigitalWalletQIWI,
        phoneNumber: replaceSpaces(formValues.phone)
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
