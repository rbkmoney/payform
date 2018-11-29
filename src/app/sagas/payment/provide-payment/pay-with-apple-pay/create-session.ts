import { PaymentSystem } from 'checkout/backend';
import { AmountInfoState } from 'checkout/state';
import { toDisplayAmount } from 'checkout/utils';

const toPaymentRequest = (
    label: string,
    amount: string,
    currencyCode: string,
    supportedNetworks: string[]
): ApplePayPaymentRequest => ({
    countryCode: 'RU',
    currencyCode,
    total: {
        label,
        amount
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

export const createSession = (
    product: string,
    amount: AmountInfoState,
    paymentSystems: PaymentSystem[],
    formAmount: string
): ApplePaySession => {
    try {
        const supportedNetworks = toSupportedNetworks(paymentSystems);
        const requestAmount = toDisplayAmount(amount, formAmount);
        const paymentRequest = toPaymentRequest(product, requestAmount, amount.currencyCode, supportedNetworks);
        return new ApplePaySession(2, paymentRequest);
    } catch (e) {
        throw {
            code: 'error.apple.pay.session.create',
            message: e.message
        };
    }
};
