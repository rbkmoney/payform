import { call, CallEffect } from 'redux-saga/effects';
import { Config } from 'checkout/config';
import { ModelState, TokenProviderFormValues } from 'checkout/state';
import { Amount } from 'checkout/utils';
import { ProvidePaymentEffects } from '../provide-payment';
import { PaymentSystem, PaymentMethod, PaymentResource } from 'checkout/backend';

const toPaymentDetails = (label: string, currency: string, amount: number): PaymentDetails => ({
    total: {
        label,
        amount: {
            currency,
            value: (amount / 100) + ''
        }
    }
});

const toSupportedNetworks = (paymentSystems: PaymentSystem[]): string[] =>
    paymentSystems
        .filter((system) => system === PaymentSystem.visa || system === PaymentSystem.mastercard)
        .map((system) => {
            switch (system) {
                case PaymentSystem.visa:
                    return 'visa';
                case PaymentSystem.mastercard:
                    return 'mastercard';
            }
        });

const createPaymentRequest = (product: string, amount: Amount, paymentSystems: PaymentSystem[]): PaymentRequest => {
    const googlePaymentDataRequest = {
        // A merchant ID is available after approval by Google.
        // 'merchantId':'01234567890123456789',
        environment: 'TEST',
        apiVersion: 1,
        allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
        paymentMethodTokenizationParameters: {
            tokenizationType: 'PAYMENT_GATEWAY',
            parameters: {}
        },
        cardRequirements: {
            allowedCardNetworks: ['MASTERCARD', 'VISA']
        }
    };
    const supportedPaymentMethods = [
        {
            supportedMethods: 'https://google.com/pay',
            data: googlePaymentDataRequest
        },
        {
            supportedMethods: 'basic-card',
            data: {
                supportedNetworks: toSupportedNetworks(paymentSystems)
            }
        }
    ];
    const paymentDetails = toPaymentDetails(product, amount.currencyCode, amount.value);
    return new PaymentRequest(supportedPaymentMethods, paymentDetails);
};

const show = (paymentRequest: PaymentRequest): Promise<PaymentResponse> =>
    paymentRequest.show()
        .catch((ex) => {
            console.error(ex);
            throw {
                code: 'error.payment.request.cancel'
            };
        });

const findPaymentSystems = (paymentMethods: PaymentMethod[]): PaymentSystem[] => { // TODO fix it
    return [PaymentSystem.mastercard, PaymentSystem.visa];
};

function* resolveBasicCard(details: any): Iterator<CallEffect | PaymentResource> {
    const example = {
        cardNumber: '4242424242424242',
        cardSecurityCode: '123',
        cardholderName: 'Test',
        expiryMonth: '01',
        expiryYear: '2022'
    };
    return null;
}

function* createPaymentResource(paymentResponse: PaymentResponse): Iterator<CallEffect> {
    switch (paymentResponse.methodName) {
        case 'basic-card':
            return yield call(resolveBasicCard, paymentResponse.details);
        default:
            throw {message: 'unsupported payment response method'};
    }
}

export function* payWithGooglePayPr(c: Config, m: ModelState, v: TokenProviderFormValues, amount: Amount): Iterator<ProvidePaymentEffects> {
    const {initConfig: {description, name}, appConfig} = c;
    const label = description || name || 'RBKmoney';
    const paymentSystems = findPaymentSystems(m.paymentMethods);
    const paymentRequest = createPaymentRequest(label, amount, paymentSystems);
    const paymentResponse = yield call(show, paymentRequest);
    const paymentResource = yield call(createPaymentResource, paymentResponse);
}
