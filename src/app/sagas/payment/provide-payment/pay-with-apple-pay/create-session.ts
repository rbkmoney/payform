import { Amount } from 'checkout/utils';
import { PaymentSystem } from 'checkout/backend';

const toPaymentRequest = (label: string, currencyCode: string, amount: number, supportedNetworks: string[]): ApplePayPaymentRequest => ({
    countryCode: 'RU',
    currencyCode,
    total: {
        label,
        amount: (amount / 100) + ''
    },
    supportedNetworks,
    merchantCapabilities: ['supports3DS']
});

const toSupportedNetworks = (paymentSystems: PaymentSystem[]): string[] =>
    paymentSystems
        .filter((system) => system === PaymentSystem.visa || system === PaymentSystem.mastercard)
        .map((system) => {
            switch (system) {
                case PaymentSystem.visa:
                    return 'visa';
                case PaymentSystem.mastercard:
                    return 'masterCard';
            }
        });

export const createSession = (product: string, amount: Amount, paymentSystems: PaymentSystem[]): ApplePaySession => {
    try {
        const supportedNetworks = toSupportedNetworks(paymentSystems);
        const paymentRequest = toPaymentRequest(product, amount.currencyCode, amount.value, supportedNetworks);
        return new ApplePaySession(2, paymentRequest);
    } catch (e) {
        throw {
            code: 'error.apple.pay.session.create',
            message: e.message
        };
    }
};
