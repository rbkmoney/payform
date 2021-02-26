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
            allowedAuthMethods: [YaPay.AllowedAuthMethod.PanOnly, YaPay.AllowedAuthMethod.CloudToken],
            allowedCardNetworks: [
                YaPay.AllowedCardNetwork.Visa,
                YaPay.AllowedCardNetwork.Mastercard,
                YaPay.AllowedCardNetwork.Mir,
                YaPay.AllowedCardNetwork.Uzcard
            ]
        }
    ]
});
