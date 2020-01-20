import { call, CallEffect } from 'redux-saga/effects';
import { MobileCommerceFormValues } from 'checkout/state';
import { PaymentResource, PaymentToolType, createPaymentResource } from 'checkout/backend';
import { replaceSpaces } from './replace-spaces';
import { getPhoneCountryCode } from 'checkout/utils';

export function* createMobileCommerce(
    endpoint: string,
    formValues: MobileCommerceFormValues,
    token: string
): Iterator<CallEffect | PaymentResource> {
    const code = getPhoneCountryCode(formValues.phone);
    const paymentTool = {
        paymentToolType: PaymentToolType.MobileCommerceData,
        mobilePhone: {
            cc: code,
            ctn: replaceSpaces(formValues.phone.substring(('+' + code).length))
        }
    };
    return yield call(createPaymentResource, endpoint, token, paymentTool);
}
