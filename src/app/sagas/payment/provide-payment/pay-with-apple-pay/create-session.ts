import { PaymentSystem } from 'checkout/backend';
import { AmountInfoState } from 'checkout/state';

const toPaymentRequest = (label: string, amount: AmountInfoState, supportedNetworks: string[]): ApplePayPaymentRequest => ({
    countryCode: 'RU',
    currencyCode: amount.currencyCode,
    total: {
        label,
        amount: (amount.minorValue / 100) + ''
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

export const createSession = (product: string, amount: AmountInfoState, paymentSystems: PaymentSystem[]): ApplePaySession => {
    try {
        const supportedNetworks = toSupportedNetworks(paymentSystems);
        const paymentRequest = toPaymentRequest(product, amount, supportedNetworks);
        return new ApplePaySession(2, paymentRequest);
    } catch (e) {
        throw {
            code: 'error.apple.pay.session.create',
            message: e.message
        };
    }
};
