import { call, CallEffect } from 'redux-saga/effects';
import {
    isPaymentRequestAvailable,
    isGooglePaymentClientAvailable
} from '../../../../environment';

export function isReadyToGooglePay(): Promise<boolean> {
    if (!isGooglePaymentClientAvailable()) {
        return Promise.resolve(false);
    }
    const paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
    const allowedPaymentMethods = ['CARD', 'TOKENIZED_CARD'];
    return paymentsClient.isReadyToPay({allowedPaymentMethods}).then((res) => res.result);
}

const canMakePayment = (paymentRequest: any) => paymentRequest.canMakePayment();

function* googlePayAvailable(): Iterator<CallEffect | boolean> {
    const available = isPaymentRequestAvailable();
    if (!available) {
        return false;
    }
    const methodData = [
        {
            supportedMethods: 'https://google.com/pay',
            data: {
                apiVersion: 1,
                environment: 'TEST',
                // merchantId: '01234567890123456789',
                paymentMethodTokenizationParameters: {
                    tokenizationType: 'DIRECT',
                    parameters: {
                        publicKey: 'yourPublicKey'
                    }
                },
                allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
                cardRequirements: {
                    allowedCardNetworks: ['MASTERCARD', 'VISA']
                }
            }
        }
    ];
    const paymentRequest = new PaymentRequest(methodData, {
        total: {
            label: 'Test Purchase',
            amount: {
                currency: 'RUB',
                value: '10'
            }
        }
    });
    return yield call(canMakePayment, paymentRequest);
}
