enum AllowedCardNetwork {
    Mastercard = 'MASTERCARD',
    Visa = 'VISA',
    Mir = 'MIR',
    Maestro = 'MAESTRO',
    Visaelectron = 'VISAELECTRON'
}

export const getYaPayPaymentData = (
    merchantID: string,
    gatewayMerchantId: string,
    order?: YaPay.Order
): YaPay.PaymentData => ({
    env: YaPay.PaymentEnv.Production,
    version: 2,
    countryCode: YaPay.CountryCode.Ru,
    currencyCode: YaPay.CurrencyCode.Rub,
    merchant: {
        id: merchantID,
        name: 'RBKmoney'
    },
    order,
    paymentMethods: [
        {
            type: YaPay.PaymentMethodType.Card,
            gateway: 'rbkmoney',
            gatewayMerchantId,
            allowedAuthMethods: [YaPay.AllowedAuthMethod.PanOnly],
            allowedCardNetworks: [
                AllowedCardNetwork.Visa,
                AllowedCardNetwork.Mastercard,
                AllowedCardNetwork.Mir,
                AllowedCardNetwork.Maestro,
                AllowedCardNetwork.Visaelectron
            ]
        }
    ]
});
