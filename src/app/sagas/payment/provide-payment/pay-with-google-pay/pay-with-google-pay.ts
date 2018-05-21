import { call } from 'redux-saga/effects';
import { ModelState, TokenProviderFormValues } from 'checkout/state';
import { Config } from 'checkout/config';
import { Amount } from 'checkout/utils';
import { createCardData } from '../../../create-payment-resource';
import { makePayment } from '../make-payment';

const createPaymentResource = (endpoint: string) =>
    createCardData.bind(null, endpoint, {
        cardNumber: '4242424242424242',
        expireDate: '12/20',
        secureCode: '123',
        cardHolder: 'LEXA SVOTIN'
    });

const getPaymentDataRequest = (merchantId: string, currencyCode: string, totalPriceMinor: number) => {
    return {
        merchantId,
        paymentMethodTokenizationParameters: {
            tokenizationType: 'PAYMENT_GATEWAY',
            parameters: {
                gateway: 'example',
                gatewayMerchantId: 'abc123'
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
        }
    };
};

const loadPaymentData = (request: any) => {
    const paymentClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
    return paymentClient.loadPaymentData(request);
};

export function* payWithGooglePay(c: Config, m: ModelState, v: TokenProviderFormValues, amount: Amount): any {
    const {appConfig: {googlePayMerchantID, capiEndpoint}} = c;
    const request = getPaymentDataRequest(googlePayMerchantID, amount.currencyCode, amount.value);
    const paymentData = yield call(loadPaymentData, request);
    console.info('PaymentData', paymentData);
    const fn = createPaymentResource(capiEndpoint);
    return yield call(makePayment, c, m, v.email, amount, fn);
}
