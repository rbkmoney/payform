import { Amount } from 'checkout/utils';

const toPaymentRequest = (label: string, currencyCode: string, amount: number): ApplePayPaymentRequest => ({
    countryCode: 'RU',
    currencyCode,
    total: {
        label,
        amount: (amount / 100) + ''
    },
    supportedNetworks: ['masterCard', 'visa'],
    merchantCapabilities: ['supports3DS']
});

export const createSession = (product: string, amount: Amount): ApplePaySession =>
    new ApplePaySession(2, toPaymentRequest(product, amount.currencyCode, amount.value));
