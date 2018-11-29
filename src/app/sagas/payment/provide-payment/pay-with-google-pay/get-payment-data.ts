import { call, CallEffect } from 'redux-saga/effects';
import { logPrefix } from 'checkout/log-messages';
import { AmountInfoState } from 'checkout/state';
import { toDisplayAmount } from 'checkout/utils';

const getPaymentDataRequest = (
    merchantId: string,
    googlePayGatewayMerchantID: string,
    amountInfo: AmountInfoState,
    formAmount: string
): PaymentDataRequest => ({
    merchantId,
    merchantInfo: {
        merchantName: 'RBKmoney',
        merchantOrigin: 'checkout.rbk.money'
    },
    paymentMethodTokenizationParameters: {
        tokenizationType: 'PAYMENT_GATEWAY',
        parameters: {
            gateway: 'rbkmoney',
            gatewayMerchantId: googlePayGatewayMerchantID
        }
    },
    allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
    cardRequirements: {
        allowedCardNetworks: ['MASTERCARD', 'VISA']
    },
    transactionInfo: {
        currencyCode: amountInfo.currencyCode,
        totalPriceStatus: 'FINAL',
        totalPrice: toDisplayAmount(amountInfo, formAmount)
    }
});

const loadPaymentData = (
    client: google.payments.api.PaymentsClient,
    request: PaymentDataRequest
): Promise<PaymentData> => client.loadPaymentData(request);

const handleLoadPaymentDataError = (e: PaymentsError) => {
    if (e && e.statusCode) {
        switch (e.statusCode) {
            case 'CANCELED':
                throw { code: 'error.google.pay.cancel' };
            case 'DEVELOPER_ERROR':
                throw { message: e.statusMessage };
            default:
                console.error(`${logPrefix} Unhandled PaymentsClient statusCode`, e);
                throw { code: 'error.google.pay.unknown' };
        }
    }
    console.error(`${logPrefix} Unknown PaymentsClient error`, e);
    throw { code: 'error.google.pay.unknown' };
};

export function* getPaymentData(
    merchantId: string,
    googlePayGatewayMerchantID: string,
    amountInfo: AmountInfoState,
    formAmount: string
): Iterator<CallEffect | PaymentData> {
    try {
        const paymentClient = new google.payments.api.PaymentsClient({ environment: 'PRODUCTION' });
        const request = getPaymentDataRequest(merchantId, googlePayGatewayMerchantID, amountInfo, formAmount);
        return yield call(loadPaymentData, paymentClient, request);
    } catch (e) {
        yield call(handleLoadPaymentDataError, e);
    }
}
