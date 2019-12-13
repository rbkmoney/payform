import { call, CallEffect } from 'redux-saga/effects';
import { MobileFormValues } from 'checkout/state';
import { PaymentResource, PaymentToolType, createPaymentResource } from 'checkout/backend';
import { replaceSpaces } from './replace-spaces';

export function* createPhoneAccount(
    endpoint: string,
    formValues: MobileFormValues,
    token: string
): Iterator<CallEffect | PaymentResource> {
    const paymentTool = {
        paymentToolType: PaymentToolType.MobileCommerceData,
        mobilePhone: {
            // TODO parse number or get from another fields
            cc: '7',
            ctn: replaceSpaces(formValues.phone)
        }
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
