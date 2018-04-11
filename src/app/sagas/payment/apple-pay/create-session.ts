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

export const createSession = (product: string, currencyCode: string, amount: number): ApplePaySession =>
    new ApplePaySession(2, toPaymentRequest(product, currencyCode, amount));
