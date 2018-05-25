import { call, CallEffect } from 'redux-saga/effects';
import { isPaymentRequestAvailable } from '../../../../../environment';
import { AmountInfoState, AmountInfoStatus } from 'checkout/state';
import { logPrefix } from 'checkout/log-messages';

const canMakePayment = (paymentRequest: any) => paymentRequest.canMakePayment();

const toAmountValue = (amountInfo: AmountInfoState): string => {
    switch (amountInfo.status) {
        case AmountInfoStatus.final:
            return (amountInfo.minorValue / 100) + '';
        case AmountInfoStatus.notKnown:
            return '10';
    }
};

const toPaymentDetails = (amountInfo: AmountInfoState): PaymentDetails => ({
    total: {
        label: 'Test Purchase',
        amount: {
            currency: amountInfo.currencyCode,
            value: toAmountValue(amountInfo)
        }
    }
});

export function* isReadyToMakePayment(amountInfo: AmountInfoState, methodData: PaymentMethodData[]): Iterator<CallEffect | boolean> {
    const available = isPaymentRequestAvailable();
    if (!available) {
        return false;
    }
    const paymentDetails = toPaymentDetails(amountInfo);
    try {
        const paymentRequest = new PaymentRequest(methodData, paymentDetails);
        return yield call(canMakePayment, paymentRequest);
    } catch (e) {
        console.warn(`${logPrefix} browser saved card availability`, e);
        return false;
    }
}
