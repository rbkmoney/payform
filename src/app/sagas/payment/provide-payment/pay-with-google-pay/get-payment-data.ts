import { call, CallEffect } from 'redux-saga/effects';
import { logPrefix } from 'checkout/log-messages';
import { AmountInfoState } from 'checkout/state';

const getPaymentDataRequest = (merchantId: string, currencyCode: string, totalPriceMinor: number): PaymentDataRequest => (
    {
        // merchantId,
        paymentMethodTokenizationParameters: {
            tokenizationType: 'PAYMENT_GATEWAY',
            parameters: {
                gateway: 'rbkmoney',
                gatewayMerchantId: 'rbkmoney'
            }
        },
        allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
        cardRequirements: {
            allowedCardNetworks: ['MASTERCARD', 'VISA']
        },
        transactionInfo: {
            currencyCode,
            totalPriceStatus: 'FINAL',
            totalPrice: (totalPriceMinor / 100) + ''
        },
        emailRequired: true
    } as any
);

const loadPaymentData = (client: google.payments.api.PaymentsClient, request: PaymentDataRequest): Promise<PaymentData> =>
    client.loadPaymentData(request);

const handleLoadPaymentDataError = (e: PaymentsError) => {
    if (e && e.statusCode) {
        switch (e.statusCode) {
            case 'CANCELED':
                throw {code: 'error.google.pay.cancel'};
            case 'DEVELOPER_ERROR':
                throw {message: e.statusMessage};
            default:
                console.error(`${logPrefix} Unhandled PaymentsClient statusCode`, e);
                throw {code: 'error.google.pay.unknown'};
        }
    }
    console.error(`${logPrefix} Unknown PaymentsClient error`, e);
    throw {code: 'error.google.pay.unknown'};
};

export function* getPaymentData(merchantId: string, amountInfo: AmountInfoState): Iterator<CallEffect | PaymentData> {
    try {
        const paymentClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
        const request = getPaymentDataRequest(merchantId, amountInfo.currencyCode, amountInfo.minorValue);
        return yield call(loadPaymentData, paymentClient, request);
    } catch (e) {
        yield call(handleLoadPaymentDataError, e);
    }
}
